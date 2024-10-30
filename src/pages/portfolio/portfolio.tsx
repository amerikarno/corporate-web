import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import NavBar from "@/components/navbar";
import DataTable, { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import { TBankInfo, TPortfolio } from "./types";
import {
  formatNumberToCommasFraction,
  getUser,
  prepareDataForColumnChart,
  prepareDataForPieChart,
  sleep,
} from "@/lib/utils";
import { Transaction } from "../orderTrade/constant/type";
import axios from "@/api/axios";
import { getCookies } from "@/lib/cookies";
import { Loading } from "@/components/loading";
import { toast } from "react-toastify";
import PieChart from "@/components/chart/pieChart";
import ColumnChart from "@/components/chart/columnChart";
import { bankMock, portMock, transactionMock } from "./__mock__/portMock";
import ReloginTokenExpired from "@/components/reloginTokenExpired/reloginTokenExpired";
import TokenCheck from "@/components/tokenCheck/tokenCheck";

const customStyles = {
  headCells: {
    style: {
      borderRight: "1px solid #e0e0e0",
      "&:last-of-type": {
        borderRight: "none",
      },
    },
  },
  rows: {
    style: {
      borderBottom: "1px solid #e0e0e0",
      "&:last-of-type": {
        borderBottom: "none",
      },
    },
  },
  cells: {
    style: {
      borderRight: "1px solid #e0e0e0",
      "&:last-of-type": {
        borderRight: "none",
      },
    },
  },
};

export default function Portfolio() {
  const [bankInfo, setBankInfo] = useState<TBankInfo | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [investTransactions, setInvestTransactions] = useState<Transaction[]>(
    []
  );
  // const port: TPortfolio[] = portMock;
  const [port, setPort] = useState<TPortfolio[]>([]);
  const dataPieInitial = prepareDataForPieChart(port);
  const dataColumnInitial = prepareDataForColumnChart(port);
  const [dataPieChart, setDataPieChart] = useState(dataPieInitial);
  const [dataColumnChart, setDataColumnChart] = useState(dataColumnInitial);

  const textTitle = "text-base text-gray-500 font-semibold";
  const textContent = "text-xl font-semibold";
  const headerStyle = "w-full text-center";
  const bodyStyle = "w-full text-center";
  const numberStyle = "w-full text-right";
  const columnsOrderTrade: TableColumn<Transaction>[] = [
    {
      name: <div className={headerStyle}>Date</div>,
      cell: (row: Transaction) => (
        <div className={bodyStyle}>{formatDate(row.investment?.CreatedAt)}</div>
      ),
    },
    {
      name: <div className={headerStyle}>Customer Code</div>,
      cell: (row: Transaction) => (
        <div className={bodyStyle}>
          {row?.investment?.customerCode?.toString()}
        </div>
      ),
    },
    {
      name: <div className={headerStyle}>ICO</div>,
      cell: (row: Transaction) => (
        <div className={bodyStyle}>{row?.asset?.name?.toString()}</div>
      ),
    },
    {
      name: <div className={headerStyle}>Amount (Unit)</div>,
      cell: (row: Transaction) => (
        <div className={numberStyle}>
          {formatNumberToCommasFraction(row?.investment?.amount?.toString())}
        </div>
      ),
    },
    {
      name: <div className={headerStyle}>Value (THB)</div>,
      cell: (row: Transaction) => (
        <div className={numberStyle}>
          {formatNumberToCommasFraction(row?.investment?.value?.toString())}
        </div>
      ),
    },
    {
      name: <div className={headerStyle}>Status</div>,
      cell: (row: Transaction) => (
        <div className={bodyStyle}>{row?.investment?.status}</div>
      ),
    },
    {
      cell: (row: Transaction) => (
        <div className="flex w-full h-full justify-center items-center py-2 px-4">
          <p
            onClick={() => handleCancleTransaction(row)}
            className="text-red-500 text-md hover:underline hover:cursor-pointer hover:font-bold"
          >
            cancel
          </p>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  const fetchBankBalance = async () => {
    const loadingToast = toast(<Loading />, {
      autoClose: false,
      closeOnClick: false,
    });
    try {
      const res = await axios.get("/api/v1/customer/info/balance", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookies()}`,
        },
      });
      if (res.status === 200) {
        setBankInfo(res.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Network Error while fetching balance");
      // TODO: remove mock
      setBankInfo(bankMock);
    }
    setIsLoading(false);
    toast.dismiss(loadingToast);
  };

  const fetchTransactionList = async () => {
    const loadingToast = toast(<Loading message="Loading Transactions..." />, {
      autoClose: false,
      closeOnClick: false,
    });
    try {
      const res = await axios.post(
        "/api/v1/customer/product/transaction",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookies()}`,
          },
        }
      );
      if (res.status === 200) {
        setInvestTransactions(res.data);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Network Error while fetching Transactions");
      // TODO: remove mock
      setInvestTransactions(transactionMock);
    }
    toast.dismiss(loadingToast);
  };

  const fetchPortfolioData = async () => {
    const loadingToast = toast(
      <Loading message="Loading Portfolio Data..." />,
      {
        autoClose: false,
        closeOnClick: false,
      }
    );
    try {
      const res = await axios.post(
        "/api/v1/customer/product/asset",
        {},
        { headers: { Authorization: `Bearer ${getCookies()}` } }
      );
      if (res.status === 200) {
        setPort(res.data);
        setDataPieChart(prepareDataForPieChart(res.data));
        setDataColumnChart(prepareDataForColumnChart(res.data));
      }
    } catch (error) {
      console.log(error);
      toast.error("Network Error while fetching Portfolio");
      // TODO: remove mock
      setPort(portMock);
      setDataPieChart(prepareDataForPieChart(portMock));
      setDataColumnChart(prepareDataForColumnChart(portMock));
    }
    toast.dismiss(loadingToast);
  };

  const handleCancleTransaction = async (data: Transaction) => {
    console.log(data);
    const loadingToast = toast(<Loading />, {
      autoClose: false,
      closeOnClick: false,
    });
    try {
      await axios.post(
        "/api/v1/customer/product/transaction/delete",
        {
          id: data.investment?.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookies()}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("Network Error while Cancle Transaction");
    }
    toast.dismiss(loadingToast);
    await sleep();
    await fetchTransactionList();
    await fetchBankBalance();
  };

  const formatDate = (date: string | null | undefined) => {
    if (!date || date === "null") {
      return "";
    }
    const dt = date.split("T");
    const d = dt[0];
    const t = dt[1].split("+")[0];
    return `${d} ${t}`;
  };

  useEffect(() => {
    fetchBankBalance();
    fetchPortfolioData();
    fetchTransactionList();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const user = getUser();
  if (!user) {
    return <ReloginTokenExpired />;
  }

  return (
    <>
      <TokenCheck />
      <NavBar
        isFullWidth
        children={
          <div className="px-2 pt-10 space-y-10">
            <Card className="p-4">
              <CardContent className="grid grid-cols-3 gap-y-10 gap-x-4">
                <div className="col-span-3">
                  <h1 className={textTitle}>Account</h1>
                  <h1 className={textContent}>{bankInfo?.bankAccount}</h1>
                </div>
                <div className="">
                  <h1
                    className={textTitle}
                  >{`Total Credits Balance (${bankInfo?.currency})`}</h1>
                  <h1 className={textContent}>
                    {formatNumberToCommasFraction(bankInfo?.totoalCredits)}
                  </h1>
                </div>
                <div className="">
                  <h1
                    className={textTitle}
                  >{`Used (${bankInfo?.currency})`}</h1>
                  <h1 className={textContent}>
                    {formatNumberToCommasFraction(bankInfo?.use)}
                  </h1>
                </div>
                <div className="">
                  <h1
                    className={textTitle}
                  >{`Available (${bankInfo?.currency})`}</h1>
                  <h1 className={textContent}>
                    {formatNumberToCommasFraction(bankInfo?.avaliable)}
                  </h1>
                </div>
              </CardContent>
            </Card>

            <Card className="p-4 space-y-6">
              <CardHeader className="text-2xl text-gray-800">
                Portfolio
              </CardHeader>
              <CardContent>
                <PieChart
                  series={dataPieChart.series}
                  colors={dataPieChart.colors}
                  labels={dataPieChart.labels}
                  width={300}
                  height={240}
                />
                <ColumnChart
                  categories={dataColumnChart?.categories}
                  height={160}
                  series={dataColumnChart?.series}
                />
              </CardContent>
            </Card>

            <div className="w-full bg-white pb-10">
              {/* <h1 className="text-2xl font-bold">Transaction</h1> */}
              <DataTable
                className={`border-t border-r border-l ${
                  investTransactions?.length === 0 ? "border-b" : ""
                } border-gray-200`}
                title="Reserved Transaction"
                columns={columnsOrderTrade}
                data={investTransactions || []}
                clearSelectedRows
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15]}
                paginationComponentOptions={{
                  rowsPerPageText: "Rows per page:",
                  rangeSeparatorText: "from",
                  noRowsPerPage: false,
                }}
                customStyles={customStyles}
              />
            </div>
          </div>
        }
      />
    </>
  );
}
