function useGetRequiredErrorMessage(label:string, isSelect: boolean = false) {
  return `${label} را ${isSelect ? 'انتخاب' : 'وارد'} کنید`
}

export default useGetRequiredErrorMessage