import {NextResponse} from "next/server";


export type NextErrorResponseProps = {
  error: string;
  status?: number;
}

function NextErrorResponse({error, status = 400}: NextErrorResponseProps) {
  return NextResponse.json({ error }, { status })
}

export default NextErrorResponse