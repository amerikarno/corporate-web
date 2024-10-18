// export type Asset = {
//   id: string;
//   title: string;
//   logo: string;
//   issueBy: string;
//   image: string;
//   name: string;
//   description: string;
//   catagory: string;
//   return: string;
//   region: string;
//   minimum: string;
// };

// export type InvestmentInfo = {
//   id: string;
//   totalIssuance: string;
//   totalAmountRaised: string;
//   contractInfomation: string;
//   minimumInvestmentAmount: string;
//   minimumInvestmentQuantity: string;
//   issueUnitPrice: string;
// };

// export type KeyInformation = {
//   id: string;
//   network: string;
//   precision: string;
//   capitalStructure: string;
//   classification: string;
//   productType: string;
//   creationTime: string;
//   releaseTime: string;
//   compleationTime: string;
// };

// export type IssuanceTerms = {
//   id: string;
//   investmentPeriod: string;
//   dividendYield: string;
//   grossmargin: string;
//   equityMultiple: string;
//   profit: string;
//   leverage: string;
//   investmentStructure: string;
//   distributionFrequency: string;
// };

// export type Investment = {
//   id: string;
//   createAt: string;
//   assetUid: string;
//   userId: string;
//   currrency: string;
//   amount: string;
//   unit: string;
//   prices: string;
// };

// export type AccountBalance = {
//   id: string;
//   userId: string;
//   currency: string;
//   balance: string;
//   used: string;
//   available: string;
// };

// export type TPortfolio = {
//   investmentInfo: {
//     asset: Asset;
//     info: InvestmentInfo;
//     keyInformation: KeyInformation;
//     issuanceTerms: IssuanceTerms;
//     investment: Investment;
//     icoStatus: string;
//   }[];
//   accountBalance: AccountBalance;
// };

export type TUserProfile = {
  accountId: string;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
};

export type TBankInfo = {
  id?: string;
  customerCode: string;
  bankAccount: string;
  totoalCredits: string;
  avaliable: string;
  use: string;
  currency: string;
};

export type TPortfolio = {
  icoCode?: string;
  asset?: Asset;
  info?: Info;
  details?: Detail[];
  documents?: string | null;
  images?: string | null;
  videos?: string | null;
  faq?: FAQ[];
  keyInformation?: KeyInformation | null;
  issuanceTerms?: IssuanceTerms | null;
  companyMembers?: CompanyMember[];
  investment?: Investment;
};

export type Asset = {
  id?: string;
  createBy?: string;
  CreatedAt?: string | null;
  DeletedAt?: string | null;
  icoCode?: number;
  title?: string;
  logo?: string;
  issueBy?: string;
  image?: string;
  name?: string;
  description?: string;
  category?: string;
  return?: string;
  region?: string;
  minimum?: string;
};

export type CompanyMember = {
  id?: string;
  createBy?: string;
  CreatedAt?: string | null;
  DeletedAt?: string | null;
  icoCode?: number;
  picture?: string;
  firstName?: string;
  midName?: string;
  lastName?: string;
  position?: string;
  history?: string;
};

export type Detail = {
  id?: string;
  createBy?: string;
  CreatedAt?: string | null;
  DeletedAt?: string | null;
  icoCode?: number;
  header?: string;
  content?: string;
};

export type FAQ = {
  id?: string;
  createBy?: string;
  CreatedAt?: string | null;
  DeletedAt?: string | null;
  icoCode?: number;
  question?: string;
  answer?: string;
};

export type Info = {
  CreatedAt?: string | null;
  DeletedAt?: string | null;
  icoCode?: string;
  totalIssuance?: string;
  totalAmountRaised?: string;
  contractInfomation?: string;
  minimumInvestmentAmount?: string;
  minimumInvestmentQuantity?: string;
  issueUnitPrice?: string;
};

export type Investment = {
  CreatedAt?: string | null;
  DeletedAt?: string | null;
  customerCode?: number;
  icoCode?: number;
  amount?: number;
  value?: number;
  dueDate: string | null;
  status?: string;
};

export type IssuanceTerms = {
  CreatedAt?: string | null;
  DeletedAt?: string | null;
  icoCode?: string;
  investmentPeriod?: string;
  dividendYield?: string;
  grossMargin?: string;
  equityMultiple?: string;
  profit?: string;
  leverage?: string;
  investmentStructure?: string;
  distributionFrequency?: string;
};

export type KeyInformation = {
  CreatedAt?: string | null;
  DeletedAt?: string | null;
  icoCode?: string;
  network?: string;
  precision?: string;
  capitalStructure?: string;
  classiFication?: string;
  productType?: string;
  creationTime?: string | null;
  releaseTime?: string | null;
  compleationTime?: string | null;
};
