import {AxiosRequestConfig} from "axios";

export type CustomAxiosRequestConfig = AxiosRequestConfig & {
  skipInterceptor?: boolean; // اضافه کردن ویژگی اختیاری
};