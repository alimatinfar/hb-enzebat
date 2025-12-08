import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {CustomAxiosRequestConfig} from "@/types/axiosTypes";
import useRequestErrorHandling from "@/request/hooks/useRequestErrorHandling";
import {NextSuccessResponseProps} from "@/utils/backend/response/NextSuccessResponse";


type Props<T> = {
  queryKey?: string | any[]; // کلید کوئری
  axiosConfig: CustomAxiosRequestConfig; // تنظیمات Axios
  options?: Partial<UseQueryOptions<NextSuccessResponseProps<T>, Error>>; // تنظیمات اختیاری کوئری
  disableThrowErrorToast?: boolean;
};

const useFetchData = <T>(
  {queryKey, axiosConfig, options, disableThrowErrorToast}: Props<T>
) => {

  const {
    requestErrorHandling
  } = useRequestErrorHandling()

  const fetchData = async (): Promise<NextSuccessResponseProps<T>> => {
    try {
      const {axiosInstance} = await import("../axiosInstance");
      const {data} = await axiosInstance(axiosConfig);

      return data as NextSuccessResponseProps<T>;
    } catch (error) {
      requestErrorHandling(error, disableThrowErrorToast).then()
      return Promise.reject(error)
    }
  };

  return useQuery<NextSuccessResponseProps<T>, Error>({
    queryKey: queryKey ? (Array.isArray(queryKey) ? queryKey : [queryKey]) : [
      axiosConfig.url, ...axiosConfig.params ? [axiosConfig.params] : []
    ],
    queryFn: fetchData,
    retry: false,
    refetchOnWindowFocus: false,
    ...options,
  });
}

export default useFetchData
