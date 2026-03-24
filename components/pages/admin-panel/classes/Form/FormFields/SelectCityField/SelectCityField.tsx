import useGetRequiredErrorMessage
  from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetRequiredErrorMessage";
import useGetFormErrorMessage from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useGetFormErrorMessage";
import SelectForm from "@/components/Form/Select/SelectForm";
import {
  selectCityFieldLabel, selectCityFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/SelectCityField/SelectCityField.constances";
import useFetchData from "@/request/hooks/useFetchData";
import {
  AdminCityResponseType
} from "@/components/pages/admin-panel/classes/AdminPanelClasses.types";
import APIES from "@/request/constances/apies";

function SelectCityField() {
  const requiredErrorMessage = useGetRequiredErrorMessage(selectCityFieldLabel, true);
  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(selectCityFieldName);

  const {
    data, isFetching, error
  } = useFetchData<{ cities: AdminCityResponseType[] }>({
    axiosConfig: {
      url: APIES.ADMIN_CITIES
    }
  })

  return (
    <SelectForm
      fieldName={selectCityFieldName}
      inputProps={{
        errorMessage,
        label: selectCityFieldLabel
      }}
      rules={{
        required: requiredErrorMessage
      }}
      selectProps={{
        loading: isFetching,
        options: data?.cities || []
      }}
    />
  );
}

export default SelectCityField;