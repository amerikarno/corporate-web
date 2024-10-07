import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
// import { TOrderTrade } from "./constant/type";
import { orderTradeSchema, TOrderTrade } from "./constant/schemas";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { MdCurrencyExchange } from "react-icons/md";
import { IoReceiptOutline } from "react-icons/io5";
import NavBar from "@/components/navbar";
import { consoleLog, getUser, sleep } from "@/lib/utils";
import { TAssetData } from "../assetDetails/types";
import { mockAssetData } from "../assetDetails/__mock__/mockAsset";
import axios from "@/api/axios";
import { getCookies } from "@/lib/cookies";
import { TUser } from "../authentication/login/types";

type TCurrency = {
  name: string;
  factor: number;
};

export default function OrderTrade() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
    trigger,
  } = useForm<TOrderTrade>({
    resolver: zodResolver(orderTradeSchema),
    mode: "onChange",
  });

  const [selectedCurrency, setSelectedCurrency] = useState<TCurrency>({
    name: "THB",
    factor: 1,
  });
  const [user, setUser] = useState<TUser | undefined>();
  const [assetData, setAssetData] = useState<TAssetData | undefined>();
  const [unitPrice, setUnitPrice] = useState<number>(1);
  const payCurrency = [
    // factor is from xx curency = 1 thb. eg 35 usd= 1 thb
    { name: "", factor: 1 },
    { name: "THB", factor: 1 },
    { name: "USD", factor: 35 },
    { name: "EUR", factor: 30 },
    { name: "JPY", factor: 0.23 },
  ];

  const handleEditData = (data: TOrderTrade) => {
    consoleLog(data);
  };

  const handleTokenAmount = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const inputValue = value.replace(/[^0-9.,]/g, "");
    setValue("amount", inputValue);
    const formattedValue = inputValue.replace(/,(?=\.)/g, "").replace(/,/g, "");
    const numValue = parseFloat(formattedValue);
    const numCurrencyAmount = (numValue * unitPrice) / selectedCurrency.factor;
    const formattedCurrencyAmount = numCurrencyAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setValue("value", formattedCurrencyAmount);
    await trigger("amount");
    await trigger("value");
  };

  const handleCurrencyAmount = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    const inputValue = value.replace(/[^0-9.,]/g, "");
    setValue("value", inputValue);
    const formattedValue = inputValue.replace(/,(?=\.)/g, "").replace(/,/g, "");
    const numValue = parseFloat(formattedValue);
    const numTokenAmount = (numValue * selectedCurrency.factor) / unitPrice;
    const formattedTokenAmount = numTokenAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setValue("amount", formattedTokenAmount);
    await trigger("amount");
    await trigger("value");
  };

  const fetchCorporateCodes = async () => {
    await sleep(1000);
    setAssetData(mockAssetData);
    const unitPrice = mockAssetData.info!.issueUnitPrice.split(" ")[0];
    const numUnitPrice = parseFloat(unitPrice);
    if (!isNaN(numUnitPrice)) {
      setUnitPrice(numUnitPrice);
    }
  };

  const fetchOrderList = async () => {};

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

  useEffect(() => {
    if (!assetData) {
      const user = getUser();
      setUser(user ? user : undefined);
      fetchCorporateCodes();
      fetchOrderList();
    }
  }, [reset]);

  const handleCurrencyChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const currency = payCurrency.find(
      (item) => item.name === event.target.value
    );
    if (currency) {
      setSelectedCurrency(currency);
      const tokenUnit = document.getElementById("amount") as HTMLInputElement;
      let token = "0";
      if (tokenUnit) {
        token = tokenUnit.value;
      }
      const numCurrencyAmount =
        (parseFloat(token) * unitPrice) / currency.factor;
      setValue(
        "value",
        numCurrencyAmount.toLocaleString("en-us", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    } else {
      setSelectedCurrency({
        name: "",
        factor: 1,
      });
    }
  };

  const onsubmit = async (data: TOrderTrade) => {
    reset();
    let body: TOrderTrade = {
      ...data,
      customerCode: user?.id,
      icoCode: assetData?.info?.id,
    };
    consoleLog("data", body);
    try {
      const res = await axios.post(
        "/api/v1/customer/product/investment",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookies(),
          },
        }
      );
      if (res.status === 200) {
        consoleLog(res.data);
      } else {
        consoleLog(res.data);
      }
    } catch (error) {
      consoleLog(error);
    }
  };

  return (
    <>
      <NavBar
        children={
          <div className="w-full flex justify-center">
            <div className="w-full max-w-[1240px] md:px-4 flex flex-col justify-center space-y-4 py-10">
              <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
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
                              name="currency"
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
                            {...register("amount", {
                              // value: tokenAmount,
                              onChange: handleTokenAmount,
                            })}
                            label={`Token`}
                            data-testid="tokenAmount"
                            disabled={isSubmitting}
                            id="amount"
                            name="amount"
                            // value={tokenAmount}
                            // onChange={handleTokenAmount}
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
                            {...register("value", {
                              // value: currencyAmount,
                              onChange: handleCurrencyAmount,
                            })}
                            label={`Amount (${selectedCurrency.name})`}
                            data-testid="fiatValue"
                            disabled={isSubmitting}
                            id="value"
                            name="value"
                            // value={currencyAmount}
                            // onChange={handleCurrencyAmount}
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
