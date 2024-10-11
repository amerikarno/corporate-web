import { Card, CardContent } from "@/components/ui/Card";
import NavBar from "@/components/navbar";
import DataTable, { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import { TBankInfo } from "./types";
import { bankMock } from "./__mock__/portMock";
import { formatNumberToCommasFraction } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Transaction } from "../orderTrade/constant/type";
import axios from "@/api/axios";
import { getCookies } from "@/lib/cookies";

export default function Portfolio() {
  const [bankInfo, setBankInfo] = useState<TBankInfo | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [investTransactions, setInvestTransactions] = useState<Transaction[]>(
    []
  );
  const textTitle = "text-base text-gray-500 font-semibold";
  const textContent = "text-xl font-semibold";

  const getUserBankInfo = async () => {
    try {
      const res = await axios.post(
        "",
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
  };

  useEffect(() => {
    fetchTransactionList();
    getUserBankInfo();
  }, []);

  const fetchTransactionList = async () => {
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
    }
  };

  const handleCancleTransaction = async (data: Transaction) => {
    try {
      const res = await axios.post(
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
      if (res.status === 200) {
        await fetchTransactionList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columnsOrderTrade: TableColumn<Transaction>[] = [
    // {
    //   name: "",
    //   cell: (_, rowIndex) => <span>{rowIndex + 1}</span>,
    //   width: "75px",
    // },
    {
      name: "Customer Code",
      selector: (row: Transaction) =>
        row?.investment?.customerCode?.toString() || "",
    },
    {
      name: "ICO",
      selector: (row: Transaction) => row?.asset?.name?.toString() || "",
    },
    {
      name: "Amount",
      selector: (row: Transaction) => row?.investment?.amount?.toString() || "",
    },
    {
      name: "value",
      selector: (row: Transaction) => row?.investment?.value?.toString() || "",
    },
    {
      name: "Status",
      selector: (row: Transaction) => row?.investment?.status || "",
    },
    {
      cell: (row: Transaction) => (
        <div className="flex w-full h-full justify-center items-center py-2 px-4">
          <Button
            className="bg-slate-700 hover:bg-red-400 hover:border-none hover:text-white w-full h-full"
            onClick={() => {
              handleCancleTransaction(row);
            }}
            disabled={
              row?.investment?.status === "1" || row?.investment?.status === "2"
            }
          >
            cancle
          </Button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

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
              <div className="col-span-2">
                <h1 className={textTitle}>Account ID</h1>
                <h1 className={textContent}>{bankInfo?.id}</h1>
              </div>
              <div className="col-span-1">
                <h1 className={textTitle}>Name</h1>
                <h1
                  className={textContent}
                >{`${bankInfo?.firstName} ${bankInfo?.lastName}`}</h1>
              </div>
              <div className="">
                <h1 className={textTitle}>Total Balance (THB)</h1>
                <h1 className={textContent}>
                  {formatNumberToCommasFraction(bankInfo?.balance)}
                </h1>
              </div>
              <div className="">
                <h1 className={textTitle}>Used (THB)</h1>
                <h1 className={textContent}>
                  {formatNumberToCommasFraction(bankInfo?.used)}
                </h1>
              </div>
              <div className="">
                <h1 className={textTitle}>Available (THB)</h1>
                <h1 className={textContent}>
                  {formatNumberToCommasFraction(bankInfo?.available)}
                </h1>
              </div>
            </CardContent>
          </Card>

          <Card className="p-4 w-full bg-white">
            <DataTable
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
            />
          </Card>
        </div>
      }
    />
  );
}
