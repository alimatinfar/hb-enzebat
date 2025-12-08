import 'axios';

declare module 'axios' {
  export interface InternalAxiosRequestConfig<T = any> {
    skipInterceptor?: boolean; // افزودن ویژگی اختیاری
  }
}