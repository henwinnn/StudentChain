import { abi } from '@/app/ABI/abi';
import { abiCredit } from '@/app/ABI/abiCredit';
import { abiStudent } from '@/app/ABI/abiStudent';
import type { Address } from 'viem';

export const CampusCreditContract = {
  address: '0xfcb5b4b87E3c7716a136b290465A18e93a06fDBa' as Address,
  abi: abiCredit,
} as const;

export const StudentIDContract = {
  address: '0xb3A86F2982cD02BC4832c02699ae30c6C88F329A' as Address,
  abi: abiStudent,
} as const;

export const CampusMasterContract = {
  address: '0x8ceEde932dB45E8cb6389D2ffa7b09385f3386dB' as Address,
  abi: abi,
} as const;
