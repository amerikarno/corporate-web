type TDetail = {
  header: string;
  content: string;
};

type TFaq = {
  question: string;
  answer: string;
};

type TMember = {
  picture: string;
  firstName: string;
  midName: string;
  lastName: string;
  position: string;
  history: string;
};

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
    totalIssuance: string;
    totalAmountRaised: string;
    contractInfomation: string;
    minimumInvestmentAmount: string;
    minimumInvestmentQuantity: string;
    issueUnitPrice: string;
  };
  details: TDetail[];
  documents: string[];
  images: string[];
  videos: string[];
  faq: TFaq[];
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
    dividendYield: string;
    grossmargin: string;
    equityMultiple: string;
    profit: string;
    leverage: string;
    investmentStructure: string;
    distributionFrequency: string;
  };
  companyMembers: TMember[];
}
