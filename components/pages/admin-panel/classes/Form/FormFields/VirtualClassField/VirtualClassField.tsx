import CheckBoxForm from "@/components/Form/CheckBox/CheckBoxForm";
import {
  virtualClassFieldLabel,
  virtualClassFieldName
} from "@/components/pages/admin-panel/classes/Form/FormFields/VirtualClassField/VirtualClassField.constances";

function VirtualClassField() {
  return (
    <CheckBoxForm
      fieldName={virtualClassFieldName}
      inputProps={{
        label: virtualClassFieldLabel,
      }}
    />
  );
}

export default VirtualClassField;
