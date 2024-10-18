import { Card, CardContent } from "@/components/ui/Card";
import NavBar from "@/components/navbar";
import DataTable, { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import { TBankInfo } from "./types";
import { bankMock, transactionMock } from "./__mock__/portMock";
import { formatNumberToCommasFraction, sleep } from "@/lib/utils";
import { Transaction } from "../orderTrade/constant/type";
import axios from "@/api/axios";
import { getCookies } from "@/lib/cookies";
import { Loading } from "@/components/loading";
import { toast } from "react-toastify";

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
          {/* <Button
            className="bg-slate-700 hover:bg-red-400 hover:border-none hover:text-white w-full h-full"
            onClick={() => {
              handleCancleTransaction(row);
            }}
            disabled={
              row?.investment?.status === "1" || row?.investment?.status === "2"
            }
          >
            cancle
          </Button> */}
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
    toast(<Loading />, { autoClose: false, closeOnClick: false });
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
      // TODO: remove mock
      setBankInfo(bankMock);
    }
    setIsLoading(false);
    toast.dismiss();
  };

  const fetchTransactionList = async () => {
    toast(<Loading message="Loading Transactions..." />, {
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
      // TODO: remove mock
      setInvestTransactions(transactionMock);
    }
  };

  const handleCancleTransaction = async (data: Transaction) => {
    console.log(data);
    toast(<Loading />, { autoClose: false, closeOnClick: false });
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
    }
    toast.dismiss();
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
    fetchTransactionList();
    fetchBankBalance();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <NavBar
      isFullWidth
      children={
        <div className="p-2 space-y-20">
          <Card className="p-4">
            <CardContent className="grid grid-cols-3 gap-y-10 gap-x-4">
              <div className="col-span-3">
                <h1 className={textTitle}>Account</h1>
                <h1 className={textContent}>{bankInfo?.bankAccount}</h1>
              </div>
              {/* <div className="col-span-1">
                <h1 className={textTitle}>Name</h1>
                <h1
                  className={textContent}
                >{`${bankInfo?.firstName} ${bankInfo?.lastName}`}</h1>
              </div> */}
              <div className="">
                <h1
                  className={textTitle}
                >{`Total Credits Balance (${bankInfo?.currency})`}</h1>
                <h1 className={textContent}>
                  {formatNumberToCommasFraction(bankInfo?.totoalCredits)}
                </h1>
              </div>
              <div className="">
                <h1 className={textTitle}>{`Used (${bankInfo?.currency})`}</h1>
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

          <div className="w-full bg-white">
            <DataTable
              className="border-t border-r border-l border-gray-200"
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
  );
}
