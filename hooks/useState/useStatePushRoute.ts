import {useEffect, useState} from 'react';
import {SetStateType} from "@/types/SetStateType";
import deepEqual from "@/utils/deepEqual";
import {useRouter, useSearchParams} from "next/navigation";


type Props<T> = {
  initialState: T,
  queryParamKey: string
}

function useStatePushRoute<T>({initialState, queryParamKey}: Props<T>): [state: T, setState: SetStateType<T>] {

  const router = useRouter()

  const searchParams = useSearchParams()

  const {queryValue} = getQueryParamsValues()

  const [state, setState] = useState<T>(
    queryValue ? JSON.parse(queryValue) : initialState
  )

  const [isFirst, setIsFirst] = useState(true)

  function getQueryParamsValues() {
    const updatedParams = new URLSearchParams(searchParams.toString());
    const queryValue = updatedParams.get(queryParamKey)
    const parsedQueryValue = queryValue ? JSON.parse(queryValue) : null
    return {
      updatedParams, queryValue, parsedQueryValue
    }
  }

  //update query params when state was changed
  useEffect(() => {
    const {
      updatedParams, parsedQueryValue
    } = getQueryParamsValues()

    if (deepEqual(parsedQueryValue, state)) return

    updatedParams.set(queryParamKey, JSON.stringify(state))

    const routerUrl = `?${updatedParams.toString()}`
    isFirst ? router.replace(routerUrl) : router.push(routerUrl)
    setIsFirst(false)
  }, [state]);

  function updateStateByBackAction() {
    const {
      parsedQueryValue
    } = getQueryParamsValues()

    if (parsedQueryValue == null) return
    if (deepEqual(parsedQueryValue, state)) return

    setState(parsedQueryValue)
  }

  useEffect(() => {
    // window.addEventListener("popstate", updateStateByBackAction);
    //
    // return () => {
    //   window.removeEventListener("popstate", updateStateByBackAction);
    // };
    updateStateByBackAction()
  }, [searchParams]);

  return [state, setState]
}

export default useStatePushRoute;