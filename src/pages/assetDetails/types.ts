export interface TAssetData {
  asset: {
    id: string;
    title: string;
    logo: string;
    issueBy: string;
    image: string;
    name: string;
    description: string;
    catagory: string;
    return: string;
    region: string;
    minimum: string;
  };
  info: {
    totalIssuance: number;
    totalAmountRaised: number;
    contractInfomation: string;
    minimumInvestmentAmount: number;
    minimumInvestmentQuantity: number;
    issueUnitPrice: number;
  };
  details: string;
  documents: string[];
  images: string[];
  videos: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  keyInformation: {
    network: string;
    precision: string;
    capitalStructure: string;
    classification: string;
    productType: string;
    creationTime: string;
    releaseTime: string;
    compleationTime: string;
  };
  issuanceTerms: {
    investmentPeriod: string;
    dividenYeild: string;
    grossmargin: string;
    equityMultiple: string;
    profit: string;
    leverage: string;
    investmentStructure: string;
    distributionFrequency: string;
  };
  companyMembers: {
    picture: string;
    firstName: string;
    midName: string;
    lastName: string;
    position: string;
    history: string;
  }[];
}
