import DeleteIcon from "@/components/svg/DeleteIcon";
import ButtonWithConfirm, {ButtonWithConfirmProps} from "@/components/Form/Button/inherited/ButtonWithConfirm";

function DeleteButtonWithConfirm(
  {buttonProps, modalProps, children}: ButtonWithConfirmProps
) {
  return (
    <ButtonWithConfirm
      buttonProps={{
        size: 'sm',
        fullWidth: true,
        rightIcon: (
          <DeleteIcon
            textColor='text-white'
            width={20}
            height={20}
          />
        ),
        ...buttonProps
      }}
      modalProps={modalProps}
    >
      {children}
    </ButtonWithConfirm>
  );
}

export default DeleteButtonWithConfirm;