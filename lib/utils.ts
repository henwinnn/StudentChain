import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBigIntToDecimal(rawAmount, decimals) {
  if (typeof rawAmount !== 'bigint') {
    try {
      rawAmount = BigInt(rawAmount);
    } catch (e) {
      console.error('rawAmount must be a BigInt or convertible to BigInt:', e);
      return 'Invalid Number';
    }
  }

  if (decimals < 0) {
    console.error('Decimals must be a non-negative number.');
    return 'Invalid Decimals';
  }

  if (decimals === 0) {
    return rawAmount.toLocaleString('en-US');
  }

  let rawAmountStr = rawAmount.toString();

  while (rawAmountStr.length <= decimals) {
    rawAmountStr = '0' + rawAmountStr;
  }

  const integerPart = rawAmountStr.slice(0, rawAmountStr.length - decimals);
  const decimalPart = rawAmountStr.slice(rawAmountStr.length - decimals);

  const trimmedDecimalPart = decimalPart.replace(/0+$/, '');

  let formattedResult = '';
  if (trimmedDecimalPart === '') {
    formattedResult = integerPart;
  } else {
    formattedResult = `${integerPart}.${trimmedDecimalPart}`;
  }

  const [integerFormatted, fractionFormatted] = formattedResult.split('.');
  const finalInteger = parseFloat(integerFormatted).toLocaleString('en-US');

  if (fractionFormatted) {
    // Anda bisa mengatur berapa banyak desimal yang ingin ditampilkan di sini
    // Misalnya, 2 desimal, atau lebih banyak jika diperlukan presisi tinggi
    return `${finalInteger}.${fractionFormatted.substring(0, 2)}`;
  } else {
    return finalInteger;
  }
}
