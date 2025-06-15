
import { abi } from "@/app/ABI/abi";
import type { Address } from "viem";

export const CampusCreditContract = {
  address: "0x6B36396D0Fc7bd789d3B22b0a2Ed44e04F6d2429" as Address,
  abi: abi ,
} as const;
export const StudentIDContract = {
  address: "0xB320351898f33F164E10AC1Ed3e2D6205df2f061" as Address,
  abi: abi ,
} as const;

export const CampusAddressContract = {
  address: "0x9ecF5a31cf3F2df152A0b271F28C42f4CC6103b9" as Address,
  abi: abi ,
} as const;
