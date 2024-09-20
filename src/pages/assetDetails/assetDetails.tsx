import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mockAssetData } from "./__mock__/mockAsset";
import { TAssetData } from "./types";
import LandingHeader from "@/layout/landing/landingHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { cn } from "@/util/util";
import { Button } from "@/components/ui/Button";
import { PeopleCard } from "@/components/peopleCard";
import { RowInfo } from "@/components/rowLableInfo";

export function AssetDetails() {
  const assetId = useParams().id;
  console.log(assetId);
  const [assetData, setAssetData] = useState<TAssetData | undefined>(undefined);
  const [tab, setTab] = useState(0);

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
  const darkText = "text-black";

  return (
    <LandingHeader>
      <div className="flex flex-row space-x-6 px-[350px] pt-10">
        <div className="w-8 h-8 border-2 border-gray-800 rounded-md mx-2"></div>
        <p className="font-bold text-xl text-gray-800">Investment Details</p>
      </div>
      <div className="w-[1200px] flex mx-auto space-x-6">
        <div className="w-2/3 py-10 space-y-10">
          <Card className="bg-white rounded-xl">
            <CardHeader className="flex flex-row">
              <div className="h-28 w-full px-6 border-b border-gray-300">
                <div className="flex flex-row">
                  <img
                    src="https://picsum.photos/200"
                    alt=""
                    className="w-16 h-16"
                  />
                  <div className="flex-grow flex-col px-4 space-y-2">
                    <h1 className="text-xl font-bold text-black">
                      Digital Asset
                    </h1>
                    <p className={cn("line-clamp-2", normalText)}>
                      tempor excepteur dolor occaecat et in ex do adipisicing
                      enim incididunt dolore aliqua aliqua eiusmod reprehenderit
                      ad veniam adipisicing irure irure consectetur excepteur
                      commo
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
                  <p className={darkText}>1</p>
                </div>

                <div className="space-y-4">
                  <h1 className={normalText}>Total Amount Raised</h1>
                  <p className={darkText}>1</p>
                </div>

                <div className="space-y-4">
                  <h1 className={normalText}>Contract Information</h1>
                  <p className={darkText}>1</p>
                </div>

                <div className="space-y-4">
                  <h1 className={normalText}>Minimum Investment Amount</h1>
                  <p className={darkText}>1</p>
                </div>

                <div className="space-y-4">
                  <h1 className={normalText}>Minimum Investment Quantity</h1>
                  <p className={darkText}>1</p>
                </div>

                <div className="space-y-4">
                  <h1 className={normalText}>Issue Unit Price</h1>
                  <p className={darkText}>1</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-xl">
            <CardHeader className="flex flex-row">
              <div className="h-20 w-full px-6 border-b border-gray-300"></div>
            </CardHeader>
            <CardContent>
              {/* <div className="w-full h-[700px] px-6 py-6"></div> */}
              <div className="box-body">
                <div className="border-b-2 border-gray-200 dark:border-white/10">
                  <nav className="-mb-0.5 flex space-x-6 rtl:space-x-reverse">
                    <Link
                      className={`py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 dark:text-white/70 hover:text-primary ${
                        tab === 1
                          ? "hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary active"
                          : ""
                      }`}
                      // className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500  dark:text-white/70 hover:text-primary active"
                      to="#"
                      id="underline-item-1"
                      data-hs-tab="#underline-1"
                      aria-controls="underline-1"
                      onClick={() => setTab(1)}
                    >
                      Tab 1
                    </Link>
                    <Link
                      className={`py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 dark:text-white/70 hover:text-primary ${
                        tab === 2
                          ? "hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary active"
                          : ""
                      }`}
                      // className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500  dark:text-white/70 hover:text-primary"
                      to="#"
                      id="underline-item-2"
                      data-hs-tab="#underline-2"
                      aria-controls="underline-2"
                      onClick={() => setTab(2)}
                    >
                      Tab 2
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
                        How hotel deals can help you live a better life. How
                        celebrity cruises aren't as bad as you think. How
                        cultural solutions can help you predict the future. How
                        to cheat at dog friendly hotels and get away with it. 17
                        problems with summer activities. How to cheat at travel
                        agents and get away with it. How not knowing family trip
                        ideas makes you a rookie. What everyone is saying about
                        daily deals. How twitter can teach you about carnival
                        cruises. How to start using cultural solutions.
                      </p>
                    </div>
                  )}
                  {tab === 2 && (
                    <div
                      id="underline-2"
                      role="tabpanel"
                      aria-labelledby="underline-item-2"
                    >
                      <p className="text-gray-500 dark:text-white/70 p-5 border rounded-sm dark:border-white/10 border-gray-200">
                        How travel coupons make you a better lover. Why cultural
                        solutions are the new black. Why mom was right about
                        travel insurances. How family trip ideas can help you
                        predict the future. How carnival cruises make you a
                        better lover. Why you'll never succeed at daily deals.
                        11 ways cheapest flights can find you the love of your
                        life. The complete beginner's guide to mission trips. If
                        you read one article about cultural notes read this one.
                        Why you shouldn't eat vacation package in bed.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/3 mt-10">
          <h1 className="w-full text-center py-4 font-bold text-2xl">
            Invest Safty With Us
          </h1>
          <div className="bg-white border-t border-l border-r border-gray-200 rounded-[28px] space-y-10">
            <div className="w-full p-6 flex flex-col space-y-4">
              <h1 className={cn("text-center", normalText)}>
                Create your investment portfolio on a regulated platform and
                start trading digital securities.
              </h1>
              <Button className="w-full">Create Account</Button>
              <Button className="w-full" variant={"outline"}>
                Log In
              </Button>
            </div>
            <div className="bg-white rounded-[30px] border-t-2 border-gray-200 shadow-md p-6 space-y-20">
              <div className="space-y-4 pt-10">
                <h1 className="w-full text-left text-lg text-black">
                  Key Information
                </h1>
                <RowInfo title="Asset Name" value="Bitcoin" />
              </div>
              <div className="space-y-4">
                <h1 className="w-full text-left text-lg text-black">
                  Issuance Terms
                </h1>
                <RowInfo title="Asset Name" value="Bitcoin" />
              </div>
              <div className="space-y-4 pb-20">
                <h1 className="w-full text-left text-lg text-black">
                  Company Members
                </h1>
                <PeopleCard
                  firstName="John"
                  lastName="Doe"
                  position="CEO"
                  history="fda"
                  picture=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingHeader>
  );
}
