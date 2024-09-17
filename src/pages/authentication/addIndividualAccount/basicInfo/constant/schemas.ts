import { z } from "zod";

export const basicInfoSchema = z.object({
  registeredAddress: z.object({
    homeNumber: z.string(),
    villageNumber: z.string(),
    villageName: z.string(),
    subStreetName: z.string(),
    streetName: z.string(),
    subDistrictName: z.string(),
    districtName: z.string(),
    provinceName: z.string(),
    zipCode: z.string(),
    countryName: z.string(),
  }),
  currentAddress: z.object({
    homeNumber: z.string().optional(),
    villageNumber: z.string().optional(),
    villageName: z.string().optional(),
    subStreetName: z.string().optional(),
    streetName: z.string().optional(),
    subDistrictName: z.string().optional(),
    districtName: z.string().optional(),
    provinceName: z.string().optional(),
    zipCode: z.string().optional(),
    countryName: z.string().optional(),
  }),
  officeAddress: z.object({
    homeNumber: z.string().optional(),
    villageNumber: z.string().optional(),
    villageName: z.string().optional(),
    subStreetName: z.string().optional(),
    streetName: z.string().optional(),
    subDistrictName: z.string().optional(),
    districtName: z.string().optional(),
    provinceName: z.string().optional(),
    zipCode: z.string().optional(),
    countryName: z.string().optional(),
  }),
  occupation: z.object({
    education: z.string(),
    sourceOfIncome: z.string(),
    currentOccupation: z.string(),
    officeName: z.string().optional(),
    typeOfBusiness: z.string().optional(),
    positionName: z.string().optional(),
    salaryRange: z.string(),
  }),
  firstBankAccount: z.object({
    bankName: z.string(),
    bankBranchName: z.string(),
    bankAccountNumber: z.string(),
  }),
  secondBankAccountBody: z.object({
    bankName: z.string().optional(),
    bankBranchName: z.string().optional(),
    bankAccountNumber: z.string().optional(),
  }),
  investment: z.object({
    shortTermInvestment: z.boolean().optional(),
    longTermInvestment: z.boolean().optional(),
    taxesInvestment: z.boolean().optional(),
    retireInvestment: z.boolean().optional(),
  }),
});

export type TBasicInfo = z.infer<typeof basicInfoSchema>;
