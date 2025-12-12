import {useSearchParams} from "next/navigation";


type Props = {
  queryName: string
}

function useGetQueryParam({queryName}: Props) {
  const searchParams = useSearchParams();

  return new URLSearchParams(searchParams.toString())?.get(queryName)
}

export default useGetQueryParam;