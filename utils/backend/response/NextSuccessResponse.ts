import {NextResponse} from "next/server";


export type NextSuccessResponseProps<T> = {
  data?: T;
  message?: string;
} & any


function NextSuccessResponse({data = {}, message}: NextSuccessResponseProps<any>) {
  return NextResponse.json({ success: true, ...data, ...message ? {message} : {}});
}

export default NextSuccessResponse