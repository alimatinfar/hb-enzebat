import {useEffect, useState} from "react";
import {SetStateType} from "@/types/SetStateType";
import {usePathname, useRouter, useSearchParams} from "next/navigation";


type Props<T> = {
  initialState: T,
  queryParamKey: string
}

function useStateQueryParams<T>({initialState, queryParamKey}: Props<T>): [state:T, setState: SetStateType<T>] {

  const searchParams = useSearchParams()

  const router = useRouter()
  const pathname = usePathname()

  function updateSearchParams(key:string, value: string){
    const updatedParams = new URLSearchParams(searchParams.toString())
    updatedParams.set(key, value)
    router.replace(`${pathname}?${updatedParams}`)
  }

  const queryParamsValue = searchParams.get(queryParamKey)

  const [state, setState] = useState<T>(
    queryParamsValue ? JSON.parse(queryParamsValue) : initialState
  )

  useEffect(() => {
    updateSearchParams(queryParamKey, JSON.stringify(state))
  }, [state]);

  return [state, setState]
}

export default useStateQueryParams;