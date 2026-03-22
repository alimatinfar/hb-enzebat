import PageTitle, {PageTitleProps} from "@/components/others/PageTitle/PageTitle";
import {ButtonProps} from "@/components/Form/Button/ButtonTypes";
import AddButton from "@/components/Form/Button/inherited/AddButton";


type Props = PageTitleProps & {
  btnProps: ButtonProps;
}

function PageTitleWithAddButton(
  {btnProps, ...pageTitleProps}: Props
) {
  return (
    <PageTitle
      {...pageTitleProps}
      endAdornment={(
        <div>
          <AddButton fullWidth size='sm' {...btnProps} />
        </div>
      )}
    />
  );
}

export default PageTitleWithAddButton;