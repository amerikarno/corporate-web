export type TFetchdata = {
  createBy?: string;
  CreatedAt?: string;
  DeletedAt?: null;
  id?: number;
  thTitle?: string;
  thName?: string;
  thSurname?: string;
  engTitle?: string;
  engName?: string;
  engSurname?: string;
  email?: string;
  mobile?: string;
  agreement?: boolean;
  birthDate?: string;
  marriageStatus?: string;
  citizenId?: string;
  laserCode?: string;
  education?: string;
  sourceOfIncome?: string;
  currentOccupation?: string;
  officeName?: string;
  typeOfBusiness?: string;
  positionName?: string;
  salaryRange?: string;
  shortTermInvestment?: boolean;
  taxesInvestment?: boolean;
  address?: Address[];
  bank?: Bank[];
  SuiteTestResult?: SuiteTestResult;
  ndid?: boolean;
  thaid?: boolean;
};

export type SuiteTestResult = {
  createBy?: string;
  deletedBy?: string;
  id?: string;
  suiteTestResult?: SuiteTestResultClass;
  isFatca?: boolean;
  fatcaInfo?: null;
  isKnowLedgeDone?: boolean;
  knowLedgeTestResult?: number;
};

export type SuiteTestResultClass = {
  cid?: string;
  investorTypeRisk?: string;
  level?: number;
  totalScore?: number;
  suitTestResult?: SuitTestResult;
};

export type SuitTestResult = {
  answer?: Answer;
};

export type Answer = {};

export type Address = {
  CreatedAt?: string;
  DeletedAt?: null;
  id?: number;
  homeNumber?: string;
  subDistrictName?: string;
  districtName?: string;
  provinceName?: string;
  zipCode?: string;
  countryName?: string;
  types?: number;
};

export type Bank = {
  CreatedAt?: string;
  DeletedAt?: null;
  id?: number;
  bankName?: string;
  bankBranchName?: string;
  bankAccountNumber?: string;
  types?: number;
};

export const mockFetchData: TFetchdata[] = [
  {
    createBy: "9b84c76d-fe84-4113-ba30-17014a02b6b5",
    CreatedAt: "2024-10-16T01:57:14Z",
    DeletedAt: null,
    id: 90000001,
    thTitle: "นาย",
    thName: "เกตเต้อ-ชื่อ",
    thSurname: "เกตเต้อ-นามสกุล",
    engTitle: "Mr.",
    engName: "getter-name",
    engSurname: "getter-surname",
    email: "test1@example.com",
    mobile: "0884744411",
    agreement: true,
    birthDate: "2009-01-15T00:00:00Z",
    marriageStatus: "โสด",
    citizenId: "1103703348990",
    laserCode: "12123",
    education: "2",
    sourceOfIncome: "3",
    currentOccupation: "14",
    officeName: "1",
    typeOfBusiness: "14",
    positionName: "1",
    salaryRange: "5",
    shortTermInvestment: true,
    taxesInvestment: true,
    address: [
      {
        CreatedAt: "2024-09-10T03:53:27Z",
        DeletedAt: null,
        id: 90000001,
        homeNumber: "70/178 ramintra65 yak 2-4",
        subDistrictName: "บ้านพานถม",
        districtName: "เขตลาดกระบัง",
        provinceName: "ระยอง",
        zipCode: "10100",
        countryName: "อารูบา",
        types: 1,
      },
      {
        CreatedAt: "2024-09-10T03:53:27Z",
        DeletedAt: null,
        id: 90000001,
        homeNumber: "70/178 ramintra65 yak 2-4",
        subDistrictName: "บ้านพานถม",
        districtName: "เขตลาดกระบัง",
        provinceName: "ระยอง",
        zipCode: "10100",
        countryName: "อารูบา",
        types: 2,
      },
      {
        CreatedAt: "2024-09-10T03:53:27Z",
        DeletedAt: null,
        id: 90000001,
        homeNumber: "70/178 ramintra65 yak 2-4",
        subDistrictName: "บ้านพานถม",
        districtName: "เขตลาดกระบัง",
        provinceName: "ระยอง",
        zipCode: "10100",
        countryName: "อารูบา",
        types: 3,
      },
    ],
    bank: [
      {
        CreatedAt: "2024-09-10T03:51:49Z",
        DeletedAt: null,
        id: 90000001,
        bankName: "ธนาคารอาร์ เอช บี จำกัด",
        bankBranchName: "1",
        bankAccountNumber: "bankaccountid1",
        types: 0,
      },
      {
        CreatedAt: "2024-09-10T03:53:12Z",
        DeletedAt: null,
        id: 90000001,
        bankName: "ธนาคารอาร์ เอช บี จำกัด",
        bankBranchName: "1",
        bankAccountNumber: "bankaccountid1",
        types: 0,
      },
      {
        CreatedAt: "2024-09-10T03:53:27Z",
        DeletedAt: null,
        id: 90000001,
        bankName: "ธนาคารอาร์ เอช บี จำกัด",
        bankBranchName: "1",
        bankAccountNumber: "bankaccountid1",
        types: 0,
      },
      {
        CreatedAt: "2024-09-10T03:51:04Z",
        DeletedAt: null,
        id: 90000001,
        bankName: "ธนาคารอาร์ เอช บี จำกัด",
        bankBranchName: "1",
        bankAccountNumber: "bankaccountid1",
        types: 0,
      },
      {
        CreatedAt: "2024-09-10T01:58:12Z",
        DeletedAt: null,
        id: 90000001,
        bankName: "ธนาคารอาร์ เอช บี จำกัด",
        bankBranchName: "1",
        bankAccountNumber: "bankaccountid1",
        types: 0,
      },
    ],
    SuiteTestResult: {
      createBy: "",
      deletedBy: "",
      id: "90000001",
      suiteTestResult: {
        cid: "",
        investorTypeRisk: "",
        level: 0,
        totalScore: 0,
        suitTestResult: {
          answer: {},
        },
      },
      isFatca: false,
      fatcaInfo: null,
      isKnowLedgeDone: false,
      knowLedgeTestResult: 0,
    },
    ndid: false,
    thaid: false,
  },
];
