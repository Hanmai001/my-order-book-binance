export class NumberUtils {
  static isNumber(plain: any) {
    return !isNaN(plain);
  }

  static formatNumber(num: string | number) {
    const formatNum = Number(num);
  if (typeof formatNum !== 'number' || Number.isNaN(formatNum)) return '--';

  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: 0, 
    maximumFractionDigits: 7
  };

  let output = new Intl.NumberFormat('en-GB', options).format(formatNum);
  return output;
  }
}