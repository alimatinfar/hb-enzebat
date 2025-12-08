import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import {CustomAxiosRequestConfig} from "@/types/axiosTypes";
import useRequestErrorHandling, {DisableThrowErrorToast} from "@/request/hooks/useRequestErrorHandling";
import {NextSuccessResponseProps} from "@/utils/backend/response/NextSuccessResponse";

type Props<T, V> = {
  axiosConfig: CustomAxiosRequestConfig; // تنظیمات Axios
  options?: UseMutationOptions<T, Error, V>; // تنظیمات اختیاری Mutation
  dataInParams?: boolean;
  disableThrowErrorToast?: DisableThrowErrorToast;
};

const useMutateData = <T, V>(
  { axiosConfig, options, dataInParams, disableThrowErrorToast }: Props<NextSuccessResponseProps<T>, V>
): UseMutationResult<NextSuccessResponseProps<T>, Error, V> => {

  const {
    requestErrorHandling
  } = useRequestErrorHandling()

  // تعریف تابع mutationFn
  const mutationFn = async (variables: V): Promise<NextSuccessResponseProps<T>> => {
    try {
      const { axiosInstance } = await import("../axiosInstance");
      const { data } = await axiosInstance({
        ...axiosConfig,
        [dataInParams ? 'params' : 'data']: variables, // ارسال داده‌ها در بدنه درخواست
      });
      return data;
    } catch (error) {
      requestErrorHandling(error, disableThrowErrorToast).then()

      return Promise.reject(error)
    }
  };

  // فراخوانی useMutation با آرگومان‌های جداگانه
  return useMutation<NextSuccessResponseProps<T>, Error, V>({
    mutationFn, // تابع اجرا
    retry: false,
    ...options, // تنظیمات اضافی
  });
}

export default useMutateData;
