import { abi } from '@/app/ABI/abi';
import type { Address } from 'viem';

export const CampusCreditContract = {
  address: '0x49562683Dc1db83873583da74F781AD556d82cd2' as Address,
  abi: abi,
} as const;
export const StudentIDContract = {
  address: '0xB320351898f33F164E10AC1Ed3e2D6205df2f061' as Address,
  abi: abi,
} as const;

export const CampusMasterContract = {
  address: '0x83eE0bC5B57E0E43472636Cb7a506582eda53707' as Address,
  abi: abi,
} as const;
