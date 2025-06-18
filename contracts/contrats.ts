import { abi } from '@/app/ABI/abi';
import type { Address } from 'viem';

export const CampusCreditContract = {
  address: '0x7A7Ffe65546AeFafc77b8bf52d9E944589A1dC6D' as Address,
  abi: abi,
} as const;
export const StudentIDContract = {
  address: '0x3dCDC2c2fFf5D6D1C73678BDDdE87F97B3B649a7' as Address,
  abi: abi,
} as const;

export const CampusMasterContract = {
  address: '0xB33B71e0E7E50c509024531666F25dDf455044B0' as Address,
  abi: abi,
} as const;
