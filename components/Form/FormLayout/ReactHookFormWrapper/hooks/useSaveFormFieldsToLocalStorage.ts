import Ls from "../../utils/customLocalStorage";
import {useEffect} from "react";


type Props<FormDataType> = {
  lsKey: string;
  setValue: any;
  getValues: any;
  disableSetDefaultValue?: boolean;
}

let callCount = 0 

function useSaveFormFieldsToLocalStorage<FormDataType>({lsKey, setValue, getValues, disableSetDefaultValue}: Props<FormDataType>) {

  useEffect(function() {
    if (disableSetDefaultValue) return

    setTimeout(function () {
      const defaultValues: FormDataType = Ls.get(lsKey)

      if (!defaultValues) return
      Object.keys(defaultValues).forEach(item => {
        const itemIns = item as keyof FormDataType
        setValue(itemIns, defaultValues[itemIns])
      })
    }, 300)
  },[])

  // useEffect(function() {
  //   return function () {
  //     callFunctionOnlyOnce(saveDataToLocalStorage)()
  //   }
  // },[])

  function saveDataToLocalStorage() {
    Ls.add(lsKey, getValues())
  }

  return saveDataToLocalStorage
}

export default useSaveFormFieldsToLocalStorage;