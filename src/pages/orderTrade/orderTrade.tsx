import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
// import { TOrderTrade } from "./constant/type";
import { orderTradeSchema, TOrderTrade } from "./constant/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { MdCurrencyExchange } from "react-icons/md";
import { IoReceiptOutline } from "react-icons/io5";
import NavBar from "@/components/navbar";
import { consoleLog, sleep } from "@/lib/utils";
import { TAssetData } from "../assetDetails/types";
import { mockAssetData } from "../assetDetails/__mock__/mockAsset";
import { ZodError } from "zod";

type TCurrency = {
  name: string;
  factor: number;
};

export default function OrderTrade() {
  const [selectedCurrency, setSelectedCurrency] = useState<TCurrency>({
    name: "THB",
    factor: 1,
  });
  // const [tokenAmount, setTokenAmount] = useState<string>("");
  // const [currencyAmount, setCurrencyAmount] = useState<string>("");
  const [assetData, setAssetData] = useState<TAssetData>();
  const [lot, setLot] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState<number>(1);
  const [tradeData, setTradeData] = useState<TOrderTrade>({
    customerCode: "",
    icoCode: "",
    amount: "",
    currency: "",
    value: "",
  });
  // const [choosedEditData, setChoosedEditData] = useState<TOrderTrade>();
  const payCurrency = [
    // factor is from xx curency = 1 thb. eg 35 usd= 1 thb
    { name: "", factor: 1 },
    { name: "THB", factor: 1 },
    { name: "USD", factor: 35 },
    { name: "EUR", factor: 30 },
    { name: "JPY", factor: 0.23 },
  ];

  const handleEditData = (data: TOrderTrade) => {};

  const handleTokenAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const inputValue = value.replace(/[^0-9.,]/g, "");
    // setTokenAmount(inputValue);
    const formattedValue = inputValue.replace(/,(?=\.)/g, "").replace(/,/g, "");
    const numValue = parseFloat(formattedValue);
    const numCurrencyAmount = (numValue * unitPrice) / selectedCurrency.factor;
    const formattedCurrencyAmount = numCurrencyAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    // setCurrencyAmount(formattedCurrencyAmount);
    setTradeData({
      ...tradeData,
      value: formattedCurrencyAmount,
      amount: inputValue,
    });
  };

  const handleCurrencyAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const inputValue = value.replace(/[^0-9.,]/g, "");
    // setCurrencyAmount(inputValue);
    const formattedValue = inputValue.replace(/,(?=\.)/g, "").replace(/,/g, "");
    const numValue = parseFloat(formattedValue);
    const numTokenAmount = (numValue * selectedCurrency.factor) / unitPrice;
    const formattedTokenAmount = numTokenAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    // setTokenAmount(formattedTokenAmount);
    setTradeData({
      ...tradeData,
      value: inputValue,
      amount: formattedTokenAmount,
    });
  };

  const fetchCorporateCodes = async () => {
    await sleep(1000);
    setAssetData(mockAssetData);
    const lot = mockAssetData.info!.minimumInvestmentQuantity.split(" ")[0];
    const numLot = parseFloat(lot);
    if (!isNaN(numLot)) {
      setLot(numLot);
    }
    const unitPrice = mockAssetData.info!.issueUnitPrice.split(" ")[0];
    const numUnitPrice = parseFloat(unitPrice);
    if (!isNaN(numUnitPrice)) {
      setUnitPrice(numUnitPrice);
    }
  };

  const fetchOrderList = async () => {
    // try {
    //   const token = getCookies();
    //   const res = await axios.get("/api/v1/transaction/order/get", {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   if (res.status === 200) {
    //     // consoleLog(res.data);
    //     // const orderTrades = res.data || [];
    //     // const uniqueOrderTrades = orderTrades.filter(
    //     //   (order: any, index: any, self: any) =>
    //     //     index === self.findIndex((t: any) => t.id === order.id)
    //     // );
    //     // const adjustedOrderTrades = uniqueOrderTrades.map(
    //     //   (order: TOrderTrade) => ({
    //     //     ...order,
    //     //     cryptoAmount: (Number(order.cryptoAmount) / 100000).toString(),
    //     //     cryptoPrice: (Number(order.cryptoPrice) / 100000).toString(),
    //     //     fiatAmount: (Number(order.fiatAmount) / 100000).toString(),
    //     //   })
    //     // );
    //     // consoleLog("OrderTrade data fetched successfully.", uniqueOrderTrades);
    //   } else {
    //     consoleLog("Failed to fetch orderTrade");
    //   }
    // } catch (error) {
    //   consoleLog("Fetching order list of this role error!", error);
    // }
  };

  const getStatus = (status?: number) => {
    if (status === -1) {
      return "Reject";
    } else if (status === 0) {
      return "Pending";
    } else if (status === 1) {
      return "Checked";
    } else if (status === 2) {
      return "Approved";
    } else {
      return "";
    }
  };

  const dataMocked: TOrderTrade[] = [];

  const columnsOrderTrade: TableColumn<TOrderTrade>[] = [
    {
      name: "Corporate Code",
      selector: (row: TOrderTrade) => row.customerCode || "",
    },
    {
      name: "Buy/Sell",
      selector: (row: TOrderTrade) => row.icoCode || "",
    },
    {
      name: "pair",
      selector: (row: TOrderTrade) => row.currency || "",
    },
    {
      name: "Crypto Amount",
      selector: (row: TOrderTrade) => row.amount || "",
    },
    {
      name: "Crypto Price",
      selector: (row: TOrderTrade) => row.value || "",
    },
    {
      name: "Status",
      selector: (row: TOrderTrade) => getStatus(row.status) || "",
    },
    {
      cell: (row: TOrderTrade) => (
        <Button
          onClick={() => {
            handleEditData(row);
          }}
          disabled={row.status === 1 || row.status === 2}
        >
          Edit
        </Button>
      ),
      ignoreRowClick: true,
    },
  ];

  // useEffect(() => {
  //   const orderListDatatoInputField = choosedEditData || {
  //     corporateCode: null,
  //     cryptoAmount: null,
  //     cryptoPrice: null,
  //     currency: "",
  //     fiatAmount: null,
  //   };
  //   reset(orderListDatatoInputField);
  //   if (choosedEditData?.operations === "buy") {
  //     setBuySell("buy");
  //   } else if (choosedEditData?.operations === "sell") {
  //     setBuySell("sell");
  //     if (choosedEditData) {
  //       const cur = choosedEditData.pair.split("/");
  //       setSellCurrency(cur[1]);
  //     }
  //   } else {
  //     setBuySell("buy");
  //   }

  //   consoleLog("use effect", orderListDatatoInputField);
  // }, [choosedEditData]);

  // const handleBuySell = (value: string) => {
  //   setBuySell(value);
  //   if (value === "sell") {
  //     const cur = selectedTradingPair.split("/");
  //     setSellCurrency(cur[1]);
  //   }
  // };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TOrderTrade>({
    resolver: zodResolver(orderTradeSchema),
  });

  useEffect(() => {
    fetchOrderList();
    fetchCorporateCodes();
  }, [reset]);

  // const handleCorporateCodeChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setSelectedCorporateCode(Number(event.target.value) || null);
  // };

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const currency = payCurrency.find(
      (item) => item.name === event.target.value
    );
    if (currency) {
      setSelectedCurrency(currency);

      const numCurrencyAmount =
        (parseFloat(tradeData.amount) * unitPrice) / currency.factor;

      // setCurrencyAmount(
      //   numCurrencyAmount.toLocaleString("en-us", {
      //     maximumFractionDigits: 2,
      //     minimumFractionDigits: 2,
      //   })
      // );
      setTradeData({
        ...tradeData,
        value: numCurrencyAmount.toLocaleString("en-us", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
      });
      // setTokenAmount(
      //   numTokenAmount.toLocaleString("en-us", {
      //     maximumFractionDigits: 2,
      //     minimumFractionDigits: 2,
      //   })
      // );
    } else {
      setSelectedCurrency({
        name: "",
        factor: 1,
      });
    }
  };

  const onSubmit = async (data: TOrderTrade) => {
    consoleLog(data);
    if (parseFloat(data.amount) < lot) {
      const error = {
        issues: [
          {
            code: "custom",
            message: `Amount must be greater than or equal to the minimum size of ${lot}.`,
            path: ["amount"],
          },
        ],
      };
      error.issues.push(...error.issues);
    }
  };

  return (
    <>
      <NavBar
        children={
          <div className="w-full flex justify-center">
            <div className="w-full max-w-[1240px] md:px-4 flex flex-col justify-center space-y-4 py-10">
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex justify-center">
                  <Card className="bg-white w-full p-4 md:space-y-4 md:p-10">
                    <span className="flex justify-start items-center font-bold md:text-xl py-2 gap-2">
                      Orders / Invest
                      <span>
                        <IoReceiptOutline />
                      </span>
                    </span>
                    <div className="flex items-center justify-center pt-4">
                      <div className="w-full md:w-1/2 space-y-6">
                        <div>
                          <div className="relative">
                            <select
                              id="currency"
                              {...register("currency")}
                              value={selectedCurrency.name}
                              onChange={handleCurrencyChange}
                              disabled={isSubmitting}
                              className="h-11 cursor-pointer bg-slate-700 focus:ring-gray-200 hover:bg-slate-900 border border-slate-800 text-white text-base rounded-md block w-full py-2.5 px-4 focus:outline-none appearance-none"
                            >
                              {payCurrency.map((pair, index) => (
                                <option key={index} value={pair.name}>
                                  {pair.name}
                                </option>
                              ))}
                            </select>
                            <MdCurrencyExchange className="absolute text-xl right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-white" />
                          </div>
                          {errors.currency && (
                            <p className="text-red-500 text-sm px-2">
                              {errors.currency.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Input
                            {...(register("amount"),
                            { onChange: handleTokenAmount })}
                            label={`Token`}
                            data-testid="tokenAmount"
                            id="tokenAmount"
                            disabled={isSubmitting}
                            value={tradeData.amount}
                            inputClassName="text-right"
                          />
                          {errors.amount && (
                            <p className="text-red-500 text-sm px-2">
                              {errors.amount.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Input
                            {...(register("value"),
                            { onChange: handleCurrencyAmount })}
                            label={`Amount (${selectedCurrency.name})`}
                            data-testid="fiatValue"
                            id="fiatValue"
                            disabled={isSubmitting}
                            value={tradeData.value}
                            inputClassName="text-right"
                          />
                          {errors.value && (
                            <p className="text-red-500 text-sm px-2">
                              {errors.value.message}
                            </p>
                          )}
                        </div>
                        <div className="w-full flex justify-center py-6">
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-slate-700 hover:bg-slate-900"
                          >
                            {isSubmitting ? "Submitting..." : "Submit"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </form>
              <Card className="p-4 w-full bg-white">
                <DataTable
                  title="Rejected Orders / Trades Lists"
                  columns={columnsOrderTrade}
                  data={dataMocked}
                  clearSelectedRows
                />
              </Card>
            </div>
          </div>
        }
      />
    </>
  );
}
