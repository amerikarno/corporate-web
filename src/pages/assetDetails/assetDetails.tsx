import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { mockAssetData } from "./__mock__/mockAsset";
import NavBar from "@/components/navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PeopleCard } from "@/components/peopleCard";
import { RowInfo } from "@/components/rowLableInfo";
import { ArrowLeft } from "lucide-react";
import { ContentDetails } from "@/components/contentDetails";
import { FaqAccordion } from "@/components/Faq";
import { TAssetData } from "../landing/types";

export function AssetDetails() {
  const navigate = useNavigate();
  const assetId = useParams().id;
  const assetType = useParams().type;
  const [assetData, setAssetData] = useState<TAssetData | undefined>(undefined);
  const [tab, setTab] = useState(1);
  const [faq, setFaq] = useState(0);

  const fetchAssetData = async () => {
    const index = parseInt(assetId || "0");
    const store = localStorage.getItem("asset")?.split("-");
    if (store) {
      let data: TAssetData[] = [];
      switch (store[0]) {
        case "Active":
          data = mockAssetData.active ? mockAssetData.active : [];
          break;

        case "Upcoming":
          data = mockAssetData.upcoming ? mockAssetData.upcoming : [];
          break;

        case "Ended":
          data = mockAssetData.ended ? mockAssetData.ended : [];
          break;

        default:
          break;
      }

      setAssetData(data[index]);
    }
  };

  useEffect(() => {
    if (!assetData) {
      fetchAssetData();
    }
  }, [assetData]);

  if (!assetData) {
    return <div>Loading...</div>;
  }

  const normalText = "text-gray-400";
  const darkText = "text-gray-900 font-bold";

  return (
    <>
      <div className="ml-1">
        <NavBar
          children={
            <div className=" w-full lg:max-w-[1240px] flex flex-col lg:flex-row space-y-4 lg:mx-auto pb-10">
              <div className="w-full lg:w-2/3 xl:w-2/3 space-y-4 px-2">
                <div className="w-full flex flex-row pt-6">
                  <div
                    className="w-8 h-8 border-2 border-gray-800 rounded-md flex items-center justify-center hover:cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    <ArrowLeft color="black" className="w-4" />
                  </div>
                  <p className={`font-bold text-xl pl-2 ${darkText}`}>
                    Investment Details
                  </p>
                </div>
                <Card className="bg-white rounded-[30px]">
                  <CardHeader className="flex flex-row">
                    <div className="w-full px-6 border-b border-gray-300">
                      <div className="flex flex-row py-4 justify-between">
                        <div className="flex-grow">
                          <div className="w-full flex flex-row">
                            <img
                              src={assetData?.asset?.logo}
                              alt=""
                              className="w-16 h-16"
                            />
                            <div className="w-full flex-col px-4 space-y-2">
                              <h1 className={`text-xl font-bold ${darkText}`}>
                                {assetData?.asset?.name}
                              </h1>
                              <div
                                className={`hidden sm:block sm:line-clamp-2 ${normalText}`}
                              >
                                {assetData?.asset?.description}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w1/4">
                          <Button
                            onClick={() => {
                              localStorage.setItem(
                                "asset",
                                `${assetType}-${assetId}`
                              );
                              navigate("/order-trade");
                            }}
                          >
                            Invest
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <h1 className={normalText}>Total Issuance</h1>
                        <p className={darkText}>
                          {assetData?.info?.totalIssuance}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h1 className={normalText}>Total Amount Raised</h1>
                        <p className={darkText}>
                          {assetData?.info?.totalAmountRaised}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h1 className={normalText}>Contract Information</h1>
                        <p className={`break-words ${darkText}`}>
                          {assetData?.info?.contractInfomation}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h1 className={normalText}>
                          Minimum Investment Amount
                        </h1>
                        <p className={darkText}>
                          {assetData?.info?.minimumInvestmentAmount}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h1 className={normalText}>
                          Minimum Investment Quantity
                        </h1>
                        <p className={darkText}>
                          {assetData?.info?.minimumInvestmentQuantity}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h1 className={normalText}>Issue Unit Price</h1>
                        <p className={darkText}>
                          {assetData?.info?.issueUnitPrice}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white rounded-[30px]">
                  <CardContent>
                    <div className="box-body">
                      <div className="border-b-2 border-gray-200">
                        <nav className="-mb-0.5 flex space-x-6 rtl:space-x-reverse">
                          <Link
                            className={`py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-primary ${
                              tab === 1
                                ? "hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary active"
                                : ""
                            }`}
                            to="#"
                            id="underline-item-1"
                            data-hs-tab="#underline-1"
                            aria-controls="underline-1"
                            onClick={() => setTab(1)}
                          >
                            Details
                          </Link>
                          <Link
                            className={`py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-primary ${
                              tab === 2
                                ? "hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary active"
                                : ""
                            }`}
                            to="#"
                            id="underline-item-2"
                            data-hs-tab="#underline-2"
                            aria-controls="underline-2"
                            onClick={() => setTab(2)}
                          >
                            FAQ
                          </Link>
                        </nav>
                      </div>

                      <div className="mt-3">
                        {tab === 1 && (
                          <div
                            id="underline-1"
                            role="tabpanel"
                            aria-labelledby="underline-item-1"
                          >
                            <div className="hs-accordion-group">
                              {assetData?.details?.map((item, index) => (
                                <div className="py-6" key={index}>
                                  <ContentDetails
                                    key={index}
                                    header={item.header}
                                    content={item.content}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {tab === 2 && (
                          <div
                            id="underline-2"
                            role="tabpanel"
                            aria-labelledby="underline-item-2"
                          >
                            <div
                              className="hs-accordion-group"
                              data-hs-accordion-always-open
                            >
                              {assetData?.faq?.map((item, index) => (
                                <div className="py-2" key={index}>
                                  <FaqAccordion
                                    key={index}
                                    question={item.question}
                                    asnwer={item.answer}
                                    onSet={(i) => setFaq(i)}
                                    questionIndex={index}
                                    selectedFaq={faq}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="min-w-[400px] lg:w-1/3 xl:w-1/3 lg:pt-14 px-2">
                <Card className="bg-white rounded-[30px] px-4 space-y-20">
                  <div className="space-y-4 pt-10">
                    <h1 className={`w-full text-left text-lg ${darkText}`}>
                      Key Information
                    </h1>
                    <RowInfo
                      title="Network"
                      value={assetData?.keyInformation?.network}
                    />
                    <RowInfo
                      title="Precision"
                      value={assetData?.keyInformation?.precision}
                    />
                    <RowInfo
                      title="Capital Structure"
                      value={assetData?.keyInformation?.capitalStructure}
                    />
                    <RowInfo
                      title="Classification"
                      value={assetData?.keyInformation?.classiFication}
                    />
                    <RowInfo
                      title="Product Type"
                      value={assetData?.keyInformation?.productType}
                    />
                    <RowInfo
                      title="Creation Time"
                      value={assetData?.keyInformation?.creationTime}
                    />
                    <RowInfo
                      title="Release Time"
                      value={assetData?.keyInformation?.releaseTime}
                    />
                    <RowInfo
                      title="Completion Time"
                      value={assetData?.keyInformation?.compleationTime}
                    />
                  </div>

                  <div className="space-y-4">
                    <h1 className={`w-full text-left text-lg ${darkText}`}>
                      Issuance Terms
                    </h1>
                    <RowInfo
                      title="Investment Preriod"
                      value={assetData?.issuanceTerms?.investmentPeriod}
                    />
                    <RowInfo
                      title="Dividend Yeild"
                      value={assetData?.issuanceTerms?.dividendYield}
                    />
                    <RowInfo
                      title="Gross Margin"
                      value={assetData?.issuanceTerms?.grossMargin}
                    />
                    <RowInfo
                      title="Equity Multiple"
                      value={assetData?.issuanceTerms?.equityMultiple}
                    />
                    <RowInfo
                      title="Profit"
                      value={assetData?.issuanceTerms?.profit}
                    />
                    <RowInfo
                      title="Leverage"
                      value={assetData?.issuanceTerms?.leverage}
                    />
                    <RowInfo
                      title="Investment Structure"
                      value={assetData?.issuanceTerms?.investmentStructure}
                    />
                    <RowInfo
                      title="DIstribution Frequency"
                      value={assetData?.issuanceTerms?.distributionFrequency}
                    />
                  </div>

                  <div className="space-y-4 pb-5">
                    <h1 className={`w-full text-left text-lg ${darkText}`}>
                      Company Members
                    </h1>
                    {assetData?.companyMembers?.map((member, index) => (
                      <PeopleCard
                        key={index}
                        firstName={member.firstName}
                        lastName={member.lastName}
                        middleName={member.midName}
                        position={member.position}
                        history={member.history}
                        picture={member.picture}
                      />
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}
