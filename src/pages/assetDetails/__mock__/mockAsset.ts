import getImages, { randomImage } from "@/common/imagesData";
import { TAssetData } from "../types";

export const mockAssetData: TAssetData = {
  asset: {
    id: "1",
    title: "Digital Asset",
    logo: getImages("png1"),
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
      header: "Company Information",
      content:
        "tempor excepteur dolor occaecat et in ex do adipisicing enim incididunt dolore aliqua aliqua eiusmod reprehenderit ad veniam adipisicing irure irure consectetur excepteur commodo aliquip commodo est tempor anim veniam consequat dolore dolore esse incididunt veniam nostrud labore velit ea ullamco adipisicing aute commodo minim irure enim eiusmod quis anim esse proident nulla exercitation ullamco minim sunt consequat irure aliquip esse veniam aliqua aute commodo eu commodo labore nisi qui reprehenderit velit nulla tempor do fugiat incididunt incididunt ex sit labore fugiat reprehenderit anim ex ex occaecat magna officia elit magna ad id enim aliquip ad aliquip nisi aute pariatur",
    },
    {
      header: "Business Model",
      content:
        "Lorem laborum dolore laborum laboris enim officia labore est ex duis sunt occaecat excepteur dolore est officia qui mollit excepteur fugiat dolore esse anim enim eiusmod nulla enim duis Lorem dolor ullamco ut mollit est dolore voluptate ex mollit aliquip nisi pariatur nisi sunt sit aute voluptate sit nostrud eu ut est dolor minim ea quis sit in sit reprehenderit tempor qui laboris sunt exercitation enim ad ipsum ad anim culpa incididunt labore duis aliqua tempor pariatur consequat cillum Lorem ut fugiat in cupidatat est aliqua do laborum eiusmod duis eu occaecat fugiat incididunt veniam velit ut id voluptate reprehenderit fugiat excepteur et pariatur labore aliqua deserunt tempor cillum nulla reprehenderit voluptate ad sunt labore sunt officia elit deserunt enim eiusmod amet adipisicing ad est do dolor velit eu nostrud nulla Lorem et labore est tempor occaecat Lorem nostrud veniam occaecat in aliquip occaecat enim velit quis reprehenderit sunt officia",
    },
    {
      header: "Use of Proceeds",
      content:
        "aliqua nulla ullamco in mollit duis magna Lorem dolor dolor in laborum mollit enim et fugiat nostrud aliquip eiusmod ullamco laboris labore mollit aute excepteur laboris ullamco minim eiusmod Lorem pariatur non commodo magna elit ullamco labore ad ullamco dolor sit quis veniam ullamco duis laborum non dolor culpa qui Lorem enim ea officia sint aliquip in occaecat incididunt cupidatat incididunt officia enim deserunt Lorem cupidatat ut laboris ea eiusmod aute sunt aliquip excepteur incididunt fugiat fugiat sunt esse id eiusmod consequat esse nostrud deserunt incididunt sint consequat culpa officia consectetur dolore aute quis aliquip elit voluptate magna eu dolor occaecat quis magna ipsum pariatur occaecat ea consectetur esse reprehenderit adipisicing ea mollit labore non reprehenderit mollit occaecat nisi minim velit consequat ad ea culpa labore ea irure nostrud fugiat eu amet laborum veniam incididunt duis duis officia nostrud dolore commodo aliquip non fugiat eiusmod culpa in id sit ut",
    },
    {
      header: "Fundraising Milestone",
      content:
        "consequat elit deserunt dolore sint veniam nulla labore minim exercitation Lorem reprehenderit ut Lorem nisi quis exercitation exercitation incididunt eu sit irure sint fugiat cupidatat id voluptate aliqua aute sint nisi dolor nulla nisi aliqua pariatur ex in velit culpa irure esse adipisicing aliquip fugiat dolore nulla commodo tempor magna occaecat duis sint excepteur cupidatat sit irure ex occaecat do laboris Lorem veniam fugiat cillum cillum reprehenderit excepteur incididunt anim do eu fugiat dolor enim ipsum quis id mollit non et velit elit cillum deserunt nulla nulla adipisicing qui nulla quis irure do laborum duis consectetur nostrud eiusmod officia nostrud",
    },
  ],
  documents: ["document1.pdf", "document2.pdf"],
  images: [randomImage(), randomImage()],
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
    network: "BNB Smart Chain Mainnet",
    precision: "5",
    capitalStructure: "Independent Fund",
    classification: "Retail Investor",
    productType: "Others",
    creationTime: "2023-01-01T00:00:00Z",
    releaseTime: "2023-02-01T00:00:00Z",
    compleationTime: "2023-03-01T00:00:00Z",
  },
  issuanceTerms: {
    investmentPeriod: "120 Days",
    dividendYield: "5%",
    grossmargin: "20%",
    equityMultiple: "5%",
    profit: "15%",
    leverage: "20%",
    investmentStructure: "/",
    distributionFrequency: "Quarterly",
  },
  companyMembers: [
    {
      picture: randomImage(),
      firstName: "John",
      midName: "A",
      lastName: "Doe",
      position: "CEO",
      history: "John has over 20 years of experience in the industry.",
    },
    {
      picture: randomImage(),
      firstName: "Jane",
      midName: "B",
      lastName: "Smith",
      position: "CFO",
      history:
        "Jane is a financial expert with a background in investment banking.",
    },
    {
      picture: randomImage(),
      firstName: "Emily",
      midName: "C",
      lastName: "Johnson",
      position: "COO",
      history: "Emily has a strong background in operations and management.",
    },
  ],
};
