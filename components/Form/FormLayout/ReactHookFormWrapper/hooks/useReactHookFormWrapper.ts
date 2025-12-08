import {useForm, UseFormProps} from "react-hook-form";

type Props<FormValues> = {
  onSubmitHandler: (data:FormValues) => void;
  defaultValues?: FormValues;
}

function useReactHookFormWrapper<FormValues extends Object>({onSubmitHandler, defaultValues}: Props<FormValues>) {

  const formMethods = useForm<FormValues>({defaultValues} as UseFormProps<FormValues, any> | undefined)
  const {handleSubmit, getValues} = formMethods
  const onSubmit = handleSubmit(onSubmitHandler)

  return {onSubmit, formMethods}
}

export default useReactHookFormWrapper;