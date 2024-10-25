import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
// import { TOrderTrade } from "./constant/type";
import { orderTradeSchema, TOrderTrade } from "./constant/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { MdCurrencyExchange } from "react-icons/md";
import { IoReceiptOutline } from "react-icons/io5";
import NavBar from "@/components/navbar";
import {
  consolelog,
  formatNumberToCommasFraction,
  getAllIcoData,
  getAppName,
  getUser,
} from "@/lib/utils";
import axios from "@/api/axios";
import { getCookies } from "@/lib/cookies";
// import { TUser } from "../authentication/login/types";
import { TAssetData } from "../landing/types";
import { useSelector } from "react-redux";
import getImages from "@/common/imagesData";
import { useNavigate } from "react-router-dom";
// import { bankMock } from "../portfolio/__mock__/portMock";
import { TBankInfo } from "../portfolio/types";
import { Loading } from "@/components/loading";
import { toast } from "react-toastify";
import { bankMock } from "../portfolio/__mock__/portMock";
import TokenCheck from "@/components/tokenCheck/tokenCheck";
import ReloginTokenExpired from "@/components/reloginTokenExpired/reloginTokenExpired";

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

  const normalText = "text-gray-400";
  const darkText = "text-gray-800";
  const navigate = useNavigate();

  const icoAll = useSelector((state: any) => state.icoAll);
  const user = getUser();

  const [bankInfo, setBankInfo] = useState<TBankInfo | undefined>(undefined);
  // const [user, setUser] = useState<TUser | undefined>();
  const [assetData, setAssetData] = useState<TAssetData | undefined>(undefined);
  const [unitPrice, setUnitPrice] = useState<number>(1);
  const [tokenUnit, setTokenUnit] = useState<string>("");
  const payCurrency: TCurrency[] = [
    // factor coming from 1 xxx = xx THB. // 1 USD = 35 THB
    { name: "", factor: 1 },
    { name: "THB", factor: 1 },
    { name: "USD", factor: 35 },
    { name: "EUR", factor: 30 },
    { name: "JPY", factor: 0.23 },
  ];
  const [selectedCurrency, setSelectedCurrency] = useState<TCurrency>(
    payCurrency[1]
  );
  const [errorMin, setErrorMin] = useState<string | undefined>(undefined);

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

  const handleMoreDetail = () => {
    const store = localStorage.getItem("asset")?.split("-");
    if (store) {
      navigate(`/asset/${store[0]}/${store[1]}`);
    }
  };

  const fetchAssetData = async () => {
    const loadingToast = toast(<Loading message="Loading Asset Info..." />, {
      autoClose: false,
      closeOnClick: false,
    });
    const store = localStorage.getItem("asset")?.split("-");
    let allIcoData;
    Object.keys(icoAll).length === 0
      ? (allIcoData = await getAllIcoData())
      : (allIcoData = icoAll);

    if (store && allIcoData) {
      const index = parseInt(store[1] || "0");
      let data: TAssetData[] = [];
      switch (store[0]) {
        case "Active":
          data = allIcoData.active ? allIcoData.active : [];
          break;

        case (store[0] = "Upcoming"):
          data = allIcoData.upcoming ? allIcoData.upcoming : [];
          break;

        case (store[0] = "Ended"):
          data = allIcoData.ended ? allIcoData.ended : [];
          break;

        default:
          break;
      }

      if (data.length !== 0) {
        setAssetData(data[index]);
        const unitPrice = data[index].info?.issueUnitPrice?.split(" ")[0];
        const numUnitPrice = parseFloat(unitPrice || "0");
        if (!isNaN(numUnitPrice)) {
          setUnitPrice(numUnitPrice);

          const unit =
            data[index].info?.minimumInvestmentQuantity?.split(" ")[1];
          setTokenUnit(unit || "");
        }
      }
    }
    toast.dismiss(loadingToast);
  };

  const fetchUserBankInfo = async () => {
    const loadingToast = toast(<Loading message="Loading Balance..." />, {
      autoClose: false,
      closeOnClick: false,
    });
    try {
      const res = await axios.post(
        "/api/v1/customer/info/balance",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookies()}`,
          },
        }
      );
      if (res.status === 200) {
        setBankInfo(res.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Network Error while fetching balance");
      // TODO: remove mock
      setBankInfo(bankMock);
    }
    toast.dismiss(loadingToast);
  };

  useEffect(() => {
    if (!assetData) {
      // const user = getUser();
      // setUser(user ? user : undefined);
      // consolelog("user", user);
      fetchAssetData();
      fetchUserBankInfo();
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

  const isMatchedMinAmount = (qtn?: string): boolean => {
    try {
      const numValue = parseFloat(qtn || "0");
      if (!isNaN(numValue)) {
        const minQtn = assetData?.info?.minimumInvestmentQuantity || "0";
        const min = minQtn.split(" ");
        const numMin = parseFloat(min[0]);
        consolelog(numMin, numValue);
        if (numValue < numMin) {
          setErrorMin(
            `required minimum quantity ${assetData?.info?.minimumInvestmentQuantity}`
          );
          return false;
        } else {
          setErrorMin(undefined);
          return true;
        }
      } else {
        toast.error("Invalid amount");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const onsubmit = async (data: TOrderTrade) => {
    let body: TOrderTrade = {
      ...data,
      customerCode: user?.customerCode,
      icoCode: assetData?.icoCode,
    };
    consolelog("data", body);

    const isMin = isMatchedMinAmount(body.amount);
    if (isMin) {
      const loadingToast = toast(<Loading />, {
        autoClose: false,
        closeOnClick: false,
      });
      try {
        const res = await axios.post(
          "/api/v1/customer/product/investment",
          body,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookies()}`,
            },
          }
        );
        if (res.status === 200) {
          consolelog(res.data);
          reset();
          await fetchUserBankInfo();
        } else {
          consolelog(res.data);
          toast.error("Failed to placing order");
        }
      } catch (error) {
        console.log(error);
        toast.error("Network Error while placing order");
      }
      toast.dismiss(loadingToast);
    }
  };

  if (!user) {
    return <ReloginTokenExpired />;
  }

  return (
    <>
      <TokenCheck />
      <NavBar
        padding="px-4"
        children={
          <div className="w-full flex justify-center">
            <div className="w-full max-w-[1240px] md:px-4 flex flex-col justify-center space-y-4 py-10">
              <Card className="p-4 w-full bg-white">
                <div className="flex flex-col justify-evenly">
                  <div className="w-full px-2 space-y-2 p-2 md:space-y-4">
                    <div className="flex flex-row items-center space-x-4">
                      <img
                        src={getImages("logo")}
                        alt=""
                        className="h-[17px] md:h-[34px]"
                      />
                      <h1 className={`font-bold text-xl text-gray-800`}>
                        {getAppName()}
                      </h1>
                    </div>
                    <div className="flex flex-row justify-between">
                      <h2 className={`break-words ${normalText}`}>
                        {assetData?.asset?.issueBy}
                      </h2>
                    </div>
                    <div className="border-b border-gray-200"></div>
                  </div>

                  <div className="w-full p-2 md:p-4">
                    <div className="flex flex-row bg-gray-100 rounded-2xl space-x-4 border border-gray-100">
                      {/* <div className="w-1/3 h-full"> */}
                      <img
                        src={assetData?.asset?.image}
                        alt=""
                        className="rounded-2xl max-h-[100px] max-w-[100px] object-cover"
                      />
                      {/* </div> */}
                      <div className="w-2/3 pt-2 space-y-2]">
                        <div className={`${darkText} break-words`}>
                          {assetData?.asset?.name}
                        </div>
                        <div className={`${normalText} break-words`}>
                          {assetData?.asset?.description}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full p-4 space-y-4">
                    <div className="flex justify-between">
                      <p className={normalText}>Product Category</p>
                      <p className={darkText}>{assetData?.asset?.category}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className={normalText}>Expect Return</p>
                      <p className={darkText}>{assetData?.asset?.return}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className={normalText}>Region</p>
                      <p className={darkText}>{assetData?.asset?.region}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className={normalText}>Minimum Subscription Limit</p>
                      <p className={`text-right ${darkText}`}>
                        {assetData?.asset?.minimum}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className={normalText}> </p>
                      <u
                        className="text-blue-500 hover:cursor-pointer hover:font-semibold"
                        onClick={() => handleMoreDetail()}
                      >
                        More Details
                      </u>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex flex-row justify-between">
                    <div className={normalText}>Account Information</div>
                    <div className={darkText}>{bankInfo?.bankAccount}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="flex flex-row w-full justify-between">
                      <p
                        className={normalText}
                      >{`Credit Balance (${bankInfo?.currency})`}</p>
                      <p className={darkText}>
                        {formatNumberToCommasFraction(bankInfo?.totoalCredits)}
                      </p>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                      <p
                        className={normalText}
                      >{`Avaliable (${bankInfo?.currency})`}</p>
                      <p className={darkText}>
                        {formatNumberToCommasFraction(bankInfo?.avaliable)}
                      </p>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                      <p className={normalText}> </p>
                      <u
                        className={`text-blue-500 hover:cursor-pointer hover:font-semibold`}
                        onClick={() => navigate("/portfolio")}
                      >
                        Portfolio
                      </u>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
                <div className="w-full flex justify-center">
                  <Card className="bg-white w-full md:space-y-4 p-6">
                    <div className="flex flex-row justify-between">
                      <span className="flex justify-start items-center font-bold md:text-xl py-2 gap-2">
                        Orders / Invest
                        <span>
                          <IoReceiptOutline />
                        </span>
                      </span>
                      <u
                        className="text-blue-500 hover:cursor-pointer hover:font-semibold"
                        onClick={() => navigate("/")}
                      >
                        Change Assets
                      </u>
                    </div>
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
                            label={`Token (${tokenUnit})`}
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
                            <p className="text-red-500 text-sm p-2">
                              {errors.value.message}
                            </p>
                          )}
                          {errorMin && (
                            <p className="text-red-500 text-sm p-2">
                              {errorMin}
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

              {/* <Card className="p-4 w-full bg-white">
              <DataTable
                title="Orders / Reserves Lists"
                columns={columnsOrderTrade}
                data={investTransactions || []}
                clearSelectedRows
              />
            </Card> */}
            </div>
          </div>
        }
      />
    </>
  );
}
