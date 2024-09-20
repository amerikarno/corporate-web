import getImages from "@/common/imagesData";
import { TAssetData } from "../types";

export const mockAssetData: TAssetData = {
  asset: {
    id: "1",
    title: "Digital Asset",
    logo: getImages("example"),
    issueBy: "Issue By Digital Asset",
    image: getImages("example"),
    name: "Adipiscing Elit",
    description:
      "duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa",
    catagory: "Healthcare",
    return: "18%",
    region: "Asia",
    minimum: "250.00 USD",
  },
  info: {
    totalIssuance: "1000.00 DA",
    totalAmountRaised: "50000.00 USD",
    contractInfomation: "0xC92Ff5e3A94...89e7e8a5b378b",
    minimumInvestmentAmount: "1000.00 USD",
    minimumInvestmentQuantity: "100.00 DA",
    issueUnitPrice: "100.00 USD",
  },
  details: [
    {
      header: "Lorem ipsum",
      content:
        "tempor excepteur dolor occaecat et in ex do adipisicing enim incididunt dolore aliqua aliqua eiusmod reprehenderit ad veniam adipisicing irure irure consectetur excepteur commodo aliquip commodo est tempor anim veniam consequat dolore dolore esse incididunt veniam nostrud labore velit ea ullamco adipisicing aute commodo minim irure enim eiusmod quis anim esse proident nulla exercitation ullamco minim sunt consequat irure aliquip esse veniam aliqua aute commodo eu commodo labore nisi qui reprehenderit velit nulla tempor do fugiat incididunt incididunt ex sit labore fugiat reprehenderit anim ex ex occaecat magna officia elit magna ad id enim aliquip ad aliquip nisi aute pariatur",
    },
    {
      header: "Est do adipisicing",
      content:
        "Lorem laborum dolore laborum laboris enim officia labore est ex duis sunt occaecat excepteur dolore est officia qui mollit excepteur fugiat dolore esse anim enim eiusmod nulla enim duis Lorem dolor ullamco ut mollit est dolore voluptate ex mollit aliquip nisi pariatur nisi sunt sit aute voluptate sit nostrud eu ut est dolor minim ea quis sit in sit reprehenderit tempor qui laboris sunt exercitation enim ad ipsum ad anim culpa incididunt labore duis aliqua tempor pariatur consequat cillum Lorem ut fugiat in cupidatat est aliqua do laborum eiusmod duis eu occaecat fugiat incididunt veniam velit ut id voluptate reprehenderit fugiat excepteur et pariatur labore aliqua deserunt tempor cillum nulla reprehenderit voluptate ad sunt labore sunt officia elit deserunt enim eiusmod amet adipisicing ad est do dolor velit eu nostrud nulla Lorem et labore est tempor occaecat Lorem nostrud veniam occaecat in aliquip occaecat enim velit quis reprehenderit sunt officia",
    },
  ],
  documents: ["document1.pdf", "document2.pdf"],
  images: [getImages("picsum200"), getImages("picsum120")],
  videos: ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"],
  faq: [
    {
      question: "What is the minimum investment?",
      answer: "The minimum investment is $1000.",
    },
    {
      question: "How long is the investment period?",
      answer: "The investment period is 5 years.",
    },
    {
      question: "What is the expected return?",
      answer: "The expected return is 10% annually.",
    },
  ],
  keyInformation: {
    network: "Ethereum",
    precision: "18",
    capitalStructure: "Equity",
    classification: "Class A",
    productType: "Tokenized Asset",
    creationTime: "2023-01-01T00:00:00Z",
    releaseTime: "2023-02-01T00:00:00Z",
    compleationTime: "2023-03-01T00:00:00Z",
  },
  issuanceTerms: {
    investmentPeriod: "5 years",
    dividendYield: "5%",
    grossmargin: "20%",
    equityMultiple: "2x",
    profit: "$10000",
    leverage: "1.5x",
    investmentStructure: "Direct",
    distributionFrequency: "Quarterly",
  },
  companyMembers: [
    {
      picture: getImages("picsum120"),
      firstName: "John",
      midName: "A",
      lastName: "Doe",
      position: "CEO",
      history: "John has over 20 years of experience in the industry.",
    },
    {
      picture: getImages("picsum200"),
      firstName: "Jane",
      midName: "B",
      lastName: "Smith",
      position: "CFO",
      history:
        "Jane is a financial expert with a background in investment banking.",
    },
    {
      picture: getImages("picsum150"),
      firstName: "Emily",
      midName: "C",
      lastName: "Johnson",
      position: "COO",
      history: "Emily has a strong background in operations and management.",
    },
  ],
};
