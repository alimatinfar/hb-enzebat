import {NextErrorResponseProps} from "@/utils/backend/response/NextErrorResponse";

export const getResponseErrorMessage = (error: any) => {
  return getErrorResponseData(error)?.error || "خطای نامشخص"
};

export const getResponseErrorCode = (error: any) => {
  return getErrorResponseData(error)?.status || 0
};

export const getErrorResponseData = (error: any): NextErrorResponseProps => {
  return error.response?.data
};

export const getErrorStatus = (error: any) => {
  return error.response ? error.response.status : "خطای نامشخص";
};