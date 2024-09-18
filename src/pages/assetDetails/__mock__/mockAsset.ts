import { TAssetData } from "../types";

export const mockAssetData: TAssetData = {
  asset: {
    id: "1",
    title: "Sample Asset",
    logo: "logo.png",
    issueBy: "Issuer Name",
    image: "image.png",
    name: "Asset Name",
    description: "Asset Description",
    catagory: "Category",
    return: "10%",
    region: "Region",
    minimum: "1000",
  },
  info: {
    totalIssuance: 100000,
    totalAmountRaised: 50000,
    contractInfomation: "Contract Information",
    minimumInvestmentAmount: 1000,
    minimumInvestmentQuantity: 10,
    issueUnitPrice: 100,
  },
  details:
    "do quis amet fugiat et ea Lorem sint mollit nisi eiusmod ex pariatur fugiat reprehenderit ullamco in esse culpa exercitation ipsum velit nisi mollit cillum consectetur sit amet fugiat occaecat culpa minim commodo sint dolor veniam est proident dolore consectetur sunt Lorem reprehenderit aute laboris culpa voluptate amet consectetur esse do nisi exercitation ad laboris aliquip ut sint eiusmod anim consectetur excepteur incididunt cillum elit cupidatat proident mollit sint laboris cupidatat incididunt qui enim Lorem officia nisi aute laboris ea Lorem ex ullamco irure enim reprehenderit minim laboris labore duis enim quis laboris pariatur exercitation duis nostrud consectetur aliquip sint do occaecat minim cupidatat esse culpa reprehenderit consectetur aliquip irure incididunt mollit aliquip in cillum tempor nostrud proident fugiat excepteur incididunt labore sit amet pariatur quis proident mollit voluptate nisi cillum reprehenderit ex occaecat enim eu duis officia esse ut ex officia laborum amet consequat qui sunt laborum do et id dolor culpa proident fugiat fugiat excepteur sit eiusmod velit eu voluptate ut nisi aute cupidatat deserunt Lorem incididunt pariatur consequat ex sint aliqua voluptate do qui nisi laborum laborum veniam nostrud minim eu velit quis adipisicing occaecat id Lorem occaecat duis qui id laborum voluptate reprehenderit fugiat est occaecat\n\n\tconsequat in dolore consequat aliquip amet ex exercitation id aute velit eiusmod minim pariatur et id eiusmod tempor in eu sunt occaecat non aute id quis laboris irure incididunt commodo laborum aliqua cillum ad duis Lorem labore in cupidatat reprehenderit nostrud occaecat et aliqua aliquip veniam qui do est ullamco\n\n\ttempor excepteur dolor occaecat et in ex do adipisicing enim incididunt dolore aliqua aliqua eiusmod reprehenderit ad veniam adipisicing irure irure consectetur excepteur commodo aliquip commodo est tempor anim veniam consequat dolore dolore esse incididunt veniam nostrud labore velit ea ullamco adipisicing aute commodo minim irure enim eiusmod quis anim esse proident nulla exercitation ullamco minim sunt consequat irure aliquip esse veniam aliqua aute commodo eu commodo labore nisi qui reprehenderit velit nulla tempor do fugiat incididunt incididunt ex sit labore fugiat reprehenderit anim ex ex occaecat magna officia elit magna ad id enim aliquip ad aliquip nisi aute pariatur",
  documents: ["document1.pdf", "document2.pdf"],
  images: ["image1.png", "image2.png"],
  videos: ["video1.mp4", "video2.mp4"],
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
    dividenYeild: "5%",
    grossmargin: "20%",
    equityMultiple: "2x",
    profit: "$10000",
    leverage: "1.5x",
    investmentStructure: "Direct",
    distributionFrequency: "Quarterly",
  },
  companyMembers: [
    {
      picture: "member1.png",
      firstName: "John",
      midName: "A",
      lastName: "Doe",
      position: "CEO",
      history: "John has over 20 years of experience in the industry.",
    },
    {
      picture: "member2.png",
      firstName: "Jane",
      midName: "B",
      lastName: "Smith",
      position: "CFO",
      history:
        "Jane is a financial expert with a background in investment banking.",
    },
    {
      picture: "member3.png",
      firstName: "Emily",
      midName: "C",
      lastName: "Johnson",
      position: "COO",
      history: "Emily has a strong background in operations and management.",
    },
  ],
};
