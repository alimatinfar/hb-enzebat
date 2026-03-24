import REGEXES from "../regexes";
import removeSeparator from "../../utils/separator/removeSeparator";
import withSeparator from "../../utils/separator/withSeparator";


const FORM_PATTERNS = {
  PASSWORD: {
    value: REGEXES.PASSWORD,
    message: 'حداقل 12 کارکتر و حداقل یک حرف بزرگ و یک حرف کوچک و عدد',
  },

  MOBILE: {
    value: REGEXES.MOBILE,
    message: 'شماره موبایل نامعتبر است',
  },

  WITHOUT_SPACE: {
    value: REGEXES.WITHOUT_SPACE,
    message: 'فاصله مجاز نیست.'
  },

  NUMERIC: {
    value: REGEXES.NUMERIC,
    message: 'فقط عدد وارد کنید'
  },

  MIN_LENGTH_CHAR: (value: number, customMessage?:string) => ({
    value,
    message: customMessage || `باید بیشتر از ${value} کاراکتر باشد`,
  }),

  MAX_LENGTH_CHAR: (value: number) => ({
    value,
    message: `باید کمتر از ${value} کاراکتر باشد`,
  }),

  MAX_NUMBER: (inputValue: number, value: number) => {
    return Number(removeSeparator(inputValue)) <= value || `عدد میتواند حداکثر ${withSeparator(value)} باشد`
  },

  SPECIFIC_LENGTH_CHAR: (value: number) => ({
    value,
    message: `${value} رقم وارد کنید`,
  }),

  DATE_GREATER_FROM_NOW: (value: any, label: string) => {
    return (value?.valueOf() > new Date().getTime()) || (`تاریخ/زمان ${label} نمی تواند کوچکتر از تاریخ/زمان جاری باشد`)
  },

  CHECK_MELLI_CODE: (code: any) => {
    if (code === '' || code == null) return true

    const errorMessage = 'الگوی کد ملی اشتباه است'

    if (!code || !/^[0-9۰۱۲۳۴۵۶۷۸۹]{10}$/.test(code)) return errorMessage;
    const factors = [10, 9, 8, 7, 6, 5, 4, 3, 2, 0, 0];
    const digits = Array.from(code).map((c: any) => +c);
    if (new RegExp(`^[${digits[0]}]+$`).test(code)) return errorMessage;
    const sumDigits = digits
      .map((digit, idx) => digit * factors[idx])
      .reduce((a, b) => a + b, 0);
    const digitForControl: any = digits[digits.length - 1];
    const r: any = sumDigits - parseInt((sumDigits / 11).toString()) * 11;

    const result = r <= 1 ? r === digitForControl : digitForControl === 11 - r

    return result ? true : errorMessage
  },

  ENGLISH_WITHOUT_SPACE: {
    value: REGEXES.FULL_REGEX_ENGLISH_WITHOUT_SPACE,
    message: 'فقط کاراکترهای انگلیسی مجاز است'
  }
}

export default FORM_PATTERNS;