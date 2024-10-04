import { Card, CardContent } from "@/components/ui/Card";
import NavBar from "@/components/navbar";
import DataTable, { TableColumn } from "react-data-table-component";
import { useEffect, useState } from "react";
import { TPortfolio } from "./types";
import { portMock, userMock } from "./__mock__/portMock";
import { formatNumberToCommasFraction, sleep } from "@/lib/utils";

type TDataTable = {
  id: number;
  assetName: string;
  amount: string;
  unit: string;
  dueDate: string;
  icoStatus: string;
};

type BorderCollapse = "collapse" | "separate";
type TextAlign = "center" | "left" | "right";

export default function Portfolio() {
  const [portfolioData, setPortfolioData] = useState<TPortfolio | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TDataTable[]>([]);
  //   const [selectedRow, setSelectedRow] = useState<number>(0);

  const textTitle = "text-base text-gray-500 font-semibold";
  const textContent = "text-xl font-semibold";

  const columns: TableColumn<TDataTable>[] = [
    {
      name: "",
      selector: (row) => row.id,
      width: "50px",
    },
    {
      name: <div>Asset</div>,
      cell: (row) => <div className="text-center w-full">{row.assetName}</div>,
    },
    {
      name: <div>Amount (THB)</div>,
      cell: (row) => (
        <div className="text-right w-full">
          {formatNumberToCommasFraction(row.amount)}
        </div>
      ),
    },
    {
      name: <div>Unit</div>,
      cell: (row) => (
        <div className="text-right w-full">
          {formatNumberToCommasFraction(row.unit)}
        </div>
      ),
    },
    {
      name: <div>Due Date</div>,
      cell: (row) => (
        <div className="text-center w-full">{row.dueDate.split("T")[0]}</div>
      ),
    },
    {
      name: <div>Period</div>,
      cell: (row) => <div className="text-center w-full">{row.icoStatus}</div>,
    },
  ];

  const customStyles = {
    table: {
      style: {
        borderCollapse: "collapse" as BorderCollapse,
      },
    },
    headCells: {
      style: {
        borderRight: "1px solid rgba(0,0,0,.12)",
        backgroundColor: "#f5f5f5",
        textAlign: "center" as TextAlign,
        justifyContent: "center",
      },
    },
    cells: {
      style: {
        borderRight: "1px solid rgba(0,0,0,.12)",
        bordertop: "1px solid rgba(0,0,0,.12)",
      },
    },
  };

  const setDataTable = (portfolioData: TPortfolio) => {
    let data: TDataTable[] = [];
    let id = 0;
    portfolioData.investmentInfo.forEach((port) => {
      data.push({
        id: ++id,
        assetName: port.asset.name,
        amount: port.investment.amount,
        unit: port.investment.unit,
        dueDate: port.keyInformation.compleationTime,
        icoStatus: port.icoStatus,
      });
    });
    setData(data);
  };

  //   const setAssetOverView = (index: number) => {
  //     setSelectedRow(index);
  //   };

  const getUserPortfolio = async () => {
    await sleep(1000);
    setPortfolioData(portMock);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!portfolioData) {
      getUserPortfolio();
    } else {
      setDataTable(portfolioData);
    }
  }, [portfolioData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <NavBar
      children={
        <div className="p-10 space-y-20">
          <Card className="p-4">
            <CardContent className="grid grid-cols-3 gap-y-10 gap-x-4">
              <div className="col-span-2">
                <h1 className={textTitle}>Account ID</h1>
                <h1 className={textContent}>{userMock.accountId}</h1>
              </div>
              <div className="col-span-1">
                <h1 className={textTitle}>Name</h1>
                <h1
                  className={textContent}
                >{`${userMock.firstName} ${userMock.lastName}`}</h1>
              </div>
              <div className="">
                <h1 className={textTitle}>Total Balance (THB)</h1>
                <h1 className={textContent}>
                  {formatNumberToCommasFraction(
                    portfolioData!.accountBalance.balance
                  )}
                </h1>
              </div>
              <div className="">
                <h1 className={textTitle}>Used (THB)</h1>
                <h1 className={textContent}>
                  {formatNumberToCommasFraction(
                    portfolioData!.accountBalance.used
                  )}
                </h1>
              </div>
              <div className="">
                <h1 className={textTitle}>Available (THB)</h1>
                <h1 className={textContent}>
                  {formatNumberToCommasFraction(
                    portfolioData!.accountBalance.available
                  )}
                </h1>
              </div>
            </CardContent>
          </Card>
          <DataTable
            className="border-t border-b border-l border-gray-200"
            columns={columns}
            data={data}
            responsive
            customStyles={customStyles}
            // onRowClicked={(row) => {
            //   setAssetOverView(row.id - 1);
            // }}
          />
        </div>
      }
    />
  );
}
