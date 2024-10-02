import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { TOrderTrade } from "./constant/type";
import { orderTradeSchema } from "./constant/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { MdCurrencyExchange } from "react-icons/md";
import { IoReceiptOutline } from "react-icons/io5";
import NavBar from "@/components/navbar";

export default function OrderTrade() {
  const [buySell, setBuySell] = useState<string>("buy");
  // const [selectedCorporateCode, setSelectedCorporateCode] = useState<
  //   number | null
  // >(null);
  const [selectedTradingPair, setSelectedTradingPair] =
    useState<string>("THB/USDT");
  // const [mockedCorporateCodes, _] = useState<{ corporateCode: number }[]>([]);
  // setFetchedCorporateCodes([]);
  const [choosedEditData, setChoosedEditData] = useState<TOrderTrade>();
  // const clearChoosedEditData = () => {
  //   setChoosedEditData(undefined);
  // };
  const [sellCurrency, setSellCurrency] = useState<string>("");
  const tradingPair = [{ name: "THB/USDT" }, { name: "THB/USDC" }];
  const buyCurrency = [{ name: "THB" }, { name: "USD" }];

  const handleFloatValue = (value: number | null): number => {
    if (!value) return 0;

    let newValue = value.toString();

    if (!newValue.includes(".")) {
      newValue += ".00000";
    } else {
      const [integerPart, decimalPart] = newValue.split(".");
      newValue = integerPart + "." + (decimalPart + "00000").slice(0, 5);
    }

    return Math.round(parseFloat(newValue) * 100000);
  };

  const fetchCorporateCodes = async () => {
    // try {
    //   const token = getCookies();
    //   const res = await axios.post(
    //     "/api/v1/corporate/query/all",
    //     {},
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   if (res.status === 200) {
    //     const corporateCodes = res.data.map((item: any) => ({
    //       corporateCode: item.CorporateCode,
    //     }));
    //     setFetchedCorporateCodes(corporateCodes);
    //   } else {
    //     console.log("Failed to fetch corporate codes");
    //   }
    // } catch (error) {
    //   console.log("Error fetching corporate codes:", error);
    // }
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
    //     // console.log(res.data);
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
    //     // console.log("OrderTrade data fetched successfully.", uniqueOrderTrades);
    //   } else {
    //     console.log("Failed to fetch orderTrade");
    //   }
    // } catch (error) {
    //   console.log("Fetching order list of this role error!", error);
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
      selector: (row: TOrderTrade) => row.corporateCode || "",
    },
    {
      name: "Buy/Sell",
      selector: (row: TOrderTrade) => row.operations || "",
    },
    {
      name: "pair",
      selector: (row: TOrderTrade) => row.pair || "",
    },
    {
      name: "Crypto Amount",
      selector: (row: TOrderTrade) => row.cryptoAmount || "",
    },
    {
      name: "Crypto Price",
      selector: (row: TOrderTrade) => row.cryptoPrice || "",
    },
    {
      name: "Fiat Amount",
      selector: (row: TOrderTrade) => row.fiatAmount || "",
    },
    {
      name: "Currency",
      selector: (row: TOrderTrade) => row.currency || "",
    },
    {
      name: "Status",
      selector: (row: TOrderTrade) => getStatus(row.transactionStatus) || "",
    },
    {
      cell: (row: TOrderTrade) => (
        <Button
          onClick={() => {
            setChoosedEditData(row);
          }}
          disabled={row.transactionStatus === 1 || row.transactionStatus === 2}
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

  //   console.log("use effect", orderListDatatoInputField);
  // }, [choosedEditData]);

  const handleBuySell = (value: string) => {
    setBuySell(value);
    if (value === "sell") {
      const cur = selectedTradingPair.split("/");
      setSellCurrency(cur[1]);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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

  const handleTradingPairChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTradingPair(event.target.value);
    const cur = event.target.value.split("/");
    setSellCurrency(cur[1]);
  };

  const onSubmit = async (data: TOrderTrade) => {
    const currency = buySell === "sell" ? sellCurrency : data.currency;
    let body: TOrderTrade = {
      ...data,
      operations: buySell,
      currency: currency,
      id: choosedEditData?.id,
      cryptoAmount: handleFloatValue(Number(data.cryptoAmount)),
      fiatAmount: handleFloatValue(Number(data.fiatAmount)),
      cryptoPrice: handleFloatValue(Number(data.cryptoPrice)),
    };
    console.log(choosedEditData);
    console.log(body);

    // try {
    //   const token = getCookies();
    //   if (body.id) {
    //     const res = await axios.post("/api/v1/transaction/order/edit", body, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     if (res.status === 200) {
    //       reset();
    //       clearChoosedEditData();
    //       setSelectedCorporateCode(null);
    //       console.log("edit successful");
    //       fetchOrderList();
    //     } else {
    //       console.log("edit failed");
    //     }
    //   } else {
    //     const res = await axios.post("/api/v1/transaction/order/create", body, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     if (res.status === 200) {
    //       reset();
    //       clearChoosedEditData();
    //       setSelectedCorporateCode(null);
    //       console.log("save successful");
    //       fetchOrderList();
    //     } else {
    //       console.log("save failed");
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      <NavBar
        isFullWidth
        children={
          <div className="w-full flex justify-center">
            <div className="w-full sm:max-w-80p lg:max-w-60p md:px-4 flex flex-col justify-center space-y-4 py-10">
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex justify-center">
                  <Card className="bg-white w-full p-4 md:space-y-4 md:p-10">
                    <span className="flex justify-start items-center font-bold md:text-xl py-2 gap-2">
                      Orders / Trades
                      <span>
                        <IoReceiptOutline />
                      </span>
                    </span>
                    {/* <div className="w-full flex justify-center items-center">
                      <div className="w-2/3">
                        <datalist id="corporateCodes">
                          {mockedCorporateCodes.map((code, index) => (
                            <option key={index} value={code.corporateCode}>
                              {code.corporateCode}
                            </option>
                          ))}
                        </datalist>
                      </div>
                    </div> */}
                    <div className="flex items-center justify-center pt-4">
                      <div className="w-full md:w-1/2 pb-4">
                        <div className="relative">
                          {/* <label className="absolute bg-white text-xs rounded-full border-none -top-4">Pairs</label> */}
                          <select
                            id="pair"
                            {...register("pair")}
                            value={selectedTradingPair}
                            onChange={handleTradingPairChange}
                            disabled={isSubmitting}
                            className="h-11 cursor-pointer bg-slate-700 focus:ring-gray-200 hover:bg-slate-900 border border-slate-800 text-white text-base rounded-md block w-full py-2.5 px-4 focus:outline-none appearance-none"
                          >
                            <option value="THB/USTD" disabled>
                              THB/USDT
                            </option>
                            {tradingPair.map((pair, index) => (
                              <option key={index} value={pair.name}>
                                {pair.name}
                              </option>
                            ))}
                          </select>
                          <MdCurrencyExchange className="absolute text-xl right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-white" />
                        </div>
                        {errors.pair && (
                          <p className="text-red-500 text-sm px-2">
                            {errors.pair.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-row w-full md:w-1/2 justify-center pb-4 mx-auto">
                      <div
                        className={`flex-1 select-none cursor-default w-1/4 text-white px-4 py-2 rounded-l transition-colors duration-300 ${
                          buySell === "buy" ? "bg-slate-800" : "bg-slate-500"
                        }`}
                        onClick={() => handleBuySell("buy")}
                      >
                        Buy
                      </div>
                      <div
                        className={`flex-1 select-none cursor-default w-1/4 text-white px-4 py-2 rounded-r transition-colors duration-300 ${
                          buySell === "sell" ? "bg-slate-800" : "bg-slate-500"
                        }`}
                        onClick={() => handleBuySell("sell")}
                      >
                        Sell
                      </div>
                    </div>
                    <div className="flex gap-4 items-center ">
                      <div className="w-1/2 space-y-4">
                        <Input
                          {...register("cryptoAmount")}
                          label="Crypto Amount"
                          data-testid="Crypto Amount"
                          id="cryptoAmount"
                          disabled={isSubmitting}
                          step="0.00001"
                          type="number"
                        />
                        {errors.cryptoAmount && (
                          <p className="text-red-500 text-sm px-2">
                            {errors.cryptoAmount.message}
                          </p>
                        )}
                        <Input
                          {...register("fiatAmount")}
                          label="Fiat Amount"
                          data-testid="Fiat Amount"
                          id="fiatAmount"
                          disabled={isSubmitting}
                          step="0.00001"
                          type="number"
                        />
                        {errors.fiatAmount && (
                          <p className="text-red-500 text-sm px-2">
                            {errors.fiatAmount.message}
                          </p>
                        )}
                      </div>
                      <div className="w-1/2 space-y-4">
                        <Input
                          {...register("cryptoPrice")}
                          label="Crypto Price"
                          data-testid="Crypto Price"
                          id="cryptoPrice"
                          disabled={isSubmitting}
                          step="0.00001"
                          type="number"
                        />
                        {errors.cryptoPrice && (
                          <p className="text-red-500 text-sm px-2">
                            {errors.cryptoPrice.message}
                          </p>
                        )}
                        <select
                          {...register("currency")}
                          value={watch("currency")}
                          onChange={(e) => {
                            setValue("currency", e.target.value);
                          }}
                          data-testid="currency-combobox"
                          className="px-2.5 pb-2.5 pt-4 cursor-pointer border border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full h-full "
                        >
                          <option value="">Currency</option>
                          {/* <option value="THB">THB</option>
                    <option value="USD">USD</option> */}
                          {buySell === "buy" ? (
                            buyCurrency.map((currency, index) => (
                              <option key={index} value={currency.name}>
                                {currency.name}
                              </option>
                            ))
                          ) : (
                            <option value={sellCurrency}>{sellCurrency}</option>
                          )}
                        </select>
                        {errors.currency && (
                          <p className="text-red-500 text-sm px-2">
                            {errors.currency.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end py-6">
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </Button>
                    </div>
                  </Card>
                </div>
              </form>
              <Card className="p-4 w-full bg-white">
                <DataTable
                  title="Rejected Orders / Trades Lists"
                  columns={columnsOrderTrade}
                  data={dataMocked}
                  // data={orderTradeData.map((orderTrade, index) => ({
                  //   ...orderTrade,
                  //   key: index,
                  // }))}
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
