import Button from "@/components/Form/Button/Button";
import {ButtonProps} from "@/components/Form/Button/ButtonTypes";
import AddCircleIcon from "@/components/svg/AddCircleIcon";

function AddButton(
  props: ButtonProps
) {
  return (
    <Button {...props} rightIcon={<AddCircleIcon />} />
  );
}

export default AddButton;