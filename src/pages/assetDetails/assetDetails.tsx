import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { mockAssetData } from "./__mock__/mockAsset";
import { TAssetData } from "./types";
import LandingHeader from "@/layout/landing/landingHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { cn } from "@/util/util";
import { Button } from "@/components/ui/Button";
import { PeopleCard } from "@/components/peopleCard";
import { RowInfo } from "@/components/rowLableInfo";
import { ArrowLeft } from "lucide-react";
import { ContentDetails } from "@/components/contentDetails";
import { FaqAccordion } from "@/components/Faq";

export function AssetDetails() {
  const navigate = useNavigate();
  const assetId = useParams().id;
  console.log(assetId);
  const [assetData, setAssetData] = useState<TAssetData | undefined>(undefined);
  const [tab, setTab] = useState(1);
  const [faq, setFaq] = useState(0);

  const fetchAssetData = async () => {
    setAssetData(mockAssetData);
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
    <LandingHeader>
      <div className="w-full flex md:justify-center animate-fade">
        <div className="flex flex-row md:space-x-6 md:w-3/4 pt-10">
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
      </div>
      <div className="w-full flex justify-center animate-fade">
        <div className="mx-10 md:w-3/4">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="md:w-2/3 py-10 space-y-10">
              <Card className="bg-white rounded-[30px]">
                <CardHeader className="flex flex-row">
                  <div className="h-28 w-full px-6 border-b border-gray-300">
                    <div className="flex flex-row">
                      <img
                        src={assetData.asset.logo}
                        alt=""
                        className="w-16 h-16"
                      />
                      <div className="flex-grow flex-col px-4 space-y-2">
                        <h1 className={`text-xl font-bold ${darkText}`}>
                          {assetData.asset.name}
                        </h1>
                        <p className={cn("line-clamp-2", normalText)}>
                          {assetData.asset.description}
                        </p>
                      </div>
                      <Button className="w-64">Invest</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="w-full p-6 grid grid-cols-3 gap-10">
                    <div className="space-y-4">
                      <h1 className={normalText}>Total Issuance</h1>
                      <p className={darkText}>{assetData.info.totalIssuance}</p>
                    </div>

                    <div className="space-y-4">
                      <h1 className={normalText}>Total Amount Raised</h1>
                      <p className={darkText}>
                        {assetData.info.totalAmountRaised}
                      </p>
                    </div>

                    <div className="space-y-4 line-clamp-1">
                      <h1 className={normalText}>Contract Information</h1>
                      <p className={darkText}>
                        {assetData.info.contractInfomation}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h1 className={normalText}>Minimum Investment Amount</h1>
                      <p className={darkText}>
                        {assetData.info.minimumInvestmentAmount}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h1 className={normalText}>
                        Minimum Investment Quantity
                      </h1>
                      <p className={darkText}>
                        {assetData.info.minimumInvestmentQuantity}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h1 className={normalText}>Issue Unit Price</h1>
                      <p className={darkText}>
                        {assetData.info.issueUnitPrice}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-[30px]">
                <CardContent>
                  <div className="box-body">
                    <div className="border-b-2 border-gray-200 dark:border-white/10">
                      <nav className="-mb-0.5 flex space-x-6 rtl:space-x-reverse">
                        <Link
                          className={`py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 dark:text-white/70 hover:text-primary ${
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
                          className={`py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 dark:text-white/70 hover:text-primary ${
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
                          <p className="text-gray-500 dark:text-white/70 p-5 border rounded-sm dark:border-white/10 border-gray-200">
                            {assetData.details.map((item, index) => (
                              <div className="py-6">
                                <ContentDetails
                                  key={index}
                                  header={item.header}
                                  content={item.content}
                                />
                              </div>
                            ))}
                          </p>
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
                            {assetData.faq.map((item, index) => (
                              <div className="py-2">
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
                            {/* <div
                          className={`hs-accordion ${
                            faq === 1 ? "active" : ""
                          }`}
                          id="hs-basic-always-open-heading-one"
                        >
                          <button
                            className="hs-accordion-toggle hs-accordion-active:text-primary hs-accordion-active:pb-3 py-0  inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
                            aria-controls="hs-basic-always-open-collapse-one"
                            type="button"
                            onClick={() => setFaq(1)}
                          >
                            <svg
                              className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.62421 7.86L13.6242 7.85999"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                              />
                              <path
                                d="M8.12421 13.36V2.35999"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                              />
                            </svg>
                            <svg
                              className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.62421 7.86L13.6242 7.85999"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                              />
                            </svg>
                            Accordion #1
                          </button>
                          <div
                            id="hs-basic-always-open-collapse-one"
                            className={`hs-accordion-content ${
                              faq === 1 ? "block" : "hidden"
                            } w-full overflow-hidden transition-[height] duration-300`}
                            aria-labelledby="hs-basic-always-open-heading-one"
                          >
                            <p className="text-gray-800 dark:text-gray-200">
                              <em>This is the third item's accordion body.</em>{" "}
                              It is hidden by default, until the collapse plugin
                              adds the appropriate classes that we use to style
                              each element. These classes control the overall
                              appearance, as well as the showing and hiding via
                              CSS transitions.
                            </p>
                          </div>
                        </div>

                        <div
                          className={`hs-accordion ${
                            faq === 2 ? "active" : ""
                          }`}
                          // id="hs-basic-always-open-heading-two"
                        >
                          <button
                            className="hs-accordion-toggle hs-accordion-active:text-primary hs-accordion-active:pb-3 pb-0 pt-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
                            aria-controls="hs-basic-always-open-collapse-two"
                            type="button"
                            onClick={() => setFaq(2)}
                          >
                            <svg
                              className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.62421 7.86L13.6242 7.85999"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                              />
                              <path
                                d="M8.12421 13.36V2.35999"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                              />
                            </svg>
                            <svg
                              className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.62421 7.86L13.6242 7.85999"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                              />
                            </svg>
                            Accordion #2
                          </button>
                          <div
                            // id="hs-basic-always-open-collapse-two"
                            className={`hs-accordion-content ${
                              faq === 2 ? "block" : "hidden"
                            } w-full overflow-hidden transition-[height] duration-300`}
                            aria-labelledby="hs-basic-always-open-heading-two"
                          >
                            <p className="text-gray-800 dark:text-gray-200">
                              <em>This is the second item's accordion body.</em>{" "}
                              It is hidden by default, until the collapse plugin
                              adds the appropriate classes that we use to style
                              each element. These classes control the overall
                              appearance, as well as the showing and hiding via
                              CSS transitions.
                            </p>
                          </div>
                        </div>

                        <div
                          className={`hs-accordion ${
                            faq === 3 ? "active" : ""
                          }`}
                          // id="hs-basic-always-open-heading-three"
                        >
                          <button
                            className="hs-accordion-toggle hs-accordion-active:text-primary hs-accordion-active:pb-3 pb-0 pt-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
                            aria-controls="hs-basic-always-open-collapse-three"
                            type="button"
                            onClick={() => setFaq(3)}
                          >
                            <svg
                              className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.62421 7.86L13.6242 7.85999"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                              />
                              <path
                                d="M8.12421 13.36V2.35999"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                              />
                            </svg>
                            <svg
                              className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.62421 7.86L13.6242 7.85999"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                              />
                            </svg>
                            Accordion #3
                          </button>
                          <div
                            // id="hs-basic-always-open-collapse-three"
                            className={`hs-accordion-content ${
                              faq === 3 ? "block" : "hidden"
                            } w-full overflow-hidden transition-[height] duration-300`}
                            aria-labelledby="hs-basic-always-open-heading-three"
                          >
                            <p className="text-gray-800 dark:text-gray-200">
                              <em>This is the first item's accordion body.</em>{" "}
                              It is hidden by default, until the collapse plugin
                              adds the appropriate classes that we use to style
                              each element. These classes control the overall
                              appearance, as well as the showing and hiding via
                              CSS transitions.
                            </p>
                          </div>
                        </div> */}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="md:w-1/3 py-10 mx-10">
              <Card className="bg-white rounded-[30px] px-4 space-y-20">
                <div className="space-y-4 pt-5">
                  <h1 className={`w-full text-left text-lg ${darkText}`}>
                    Key Information
                  </h1>
                  <RowInfo
                    title="Network"
                    value={assetData.keyInformation.network}
                  />
                  <RowInfo
                    title="Precision"
                    value={assetData.keyInformation.precision}
                  />
                  <RowInfo
                    title="Capital Structure"
                    value={assetData.keyInformation.capitalStructure}
                  />
                  <RowInfo
                    title="Classification"
                    value={assetData.keyInformation.classification}
                  />
                  <RowInfo
                    title="Product Type"
                    value={assetData.keyInformation.productType}
                  />
                  <RowInfo
                    title="Creation Time"
                    value={assetData.keyInformation.creationTime}
                  />
                  <RowInfo
                    title="Release Time"
                    value={assetData.keyInformation.releaseTime}
                  />
                  <RowInfo
                    title="Completion Time"
                    value={assetData.keyInformation.compleationTime}
                  />
                </div>

                <div className="space-y-4">
                  <h1 className={`w-full text-left text-lg ${darkText}`}>
                    Issuance Terms
                  </h1>
                  <RowInfo
                    title="Investment Preriod"
                    value={assetData.issuanceTerms.investmentPeriod}
                  />
                  <RowInfo
                    title="Dividend Yeild"
                    value={assetData.issuanceTerms.dividendYield}
                  />
                  <RowInfo
                    title="Gross Margin"
                    value={assetData.issuanceTerms.grossmargin}
                  />
                  <RowInfo
                    title="Equity Multiple"
                    value={assetData.issuanceTerms.equityMultiple}
                  />
                  <RowInfo
                    title="Profit"
                    value={assetData.issuanceTerms.profit}
                  />
                  <RowInfo
                    title="Leverage"
                    value={assetData.issuanceTerms.leverage}
                  />
                  <RowInfo
                    title="Investment Structure"
                    value={assetData.issuanceTerms.investmentStructure}
                  />
                  <RowInfo
                    title="DIstribution Frequency"
                    value={assetData.issuanceTerms.distributionFrequency}
                  />
                </div>
                <div className="space-y-4 pb-5">
                  <h1 className={`w-full text-left text-lg ${darkText}`}>
                    Company Members
                  </h1>
                  {assetData.companyMembers.map((member, index) => (
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
        </div>
      </div>
    </LandingHeader>
  );
}
