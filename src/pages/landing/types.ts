export type TAssetData = {
  icoCode?: string;
  asset?: Asset | null;
  info?: Info | null;
  details?: Detail[];
  documents?: string | null;
  images?: string | null;
  videos?: string | null;
  faq?: FAQ[];
  keyInformation?: KeyInformation | null;
  issuanceTerms?: IssuanceTerms | null;
  companyMembers?: CompanyMember[];
  investment?: Investment | null;
};

export type Asset = {
  id?: string;
  createBy?: string;
  CreatedAt?: string;
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
  CreatedAt?: string;
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
  CreatedAt?: string;
  DeletedAt?: string | null;
  icoCode?: number;
  header?: string;
  content?: string;
};

export type FAQ = {
  id?: string;
  createBy?: string;
  CreatedAt?: string;
  DeletedAt?: string | null;
  icoCode?: number;
  question?: string;
  answer?: string;
};

export type Info = {
  CreatedAt?: string;
  DeletedAt?: string | string | null;
  icoCode?: string;
  totalIssuance?: string;
  totalAmountRaised?: string;
  contractInfomation?: string;
  minimumInvestmentAmount?: string;
  minimumInvestmentQuantity?: string;
  issueUnitPrice?: string;
};

export type Investment = {
  CreatedAt?: string;
  DeletedAt?: string | null;
  customerCode?: number;
  icoCode?: number;
  amount?: number;
  value?: number;
  dueDate?: string | null;
  status?: string;
};

export type IssuanceTerms = {
  CreatedAt?: string;
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
  CreatedAt?: string;
  DeletedAt?: string | null;
  icoCode?: string;
  network?: string;
  precision?: string;
  capitalStructure?: string;
  classiFication?: string;
  productType?: string;
  creationTime?: string;
  releaseTime?: string;
  compleationTime?: string;
};

export type IcoType = {
  active?: TAssetData[] | null;
  upcoming?: TAssetData[] | null;
  ended?: TAssetData[] | null;
};
