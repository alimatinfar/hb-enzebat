import axios from "axios"
import getToken from "@/utils/authentication/getToken";


const axiosInstance = axios.create({
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    "Access-Control-Allow-Origin": "*"
  },
})

axiosInstance.interceptors.request.use(async (request: any) => {
  // request.headers["x-apikey"] = [process..env.apiKey];
  request.baseURL = `/api/`

  const token = getToken();

  if (token) {
    request.headers["Authorization"] = [`Bearer ${token}`];
  }
  return request;
});


axiosInstance.interceptors.response.use(
  response => {
    if (response.config.skipInterceptor) {
      return response; // بدون بررسی ادامه بده
    }

    if (response.data?.isSucceed != null && !response.data.isSucceed) return Promise.reject({response})
    return response
  },
  err => {
    return Promise.reject(err)
  }
)

export {axiosInstance}