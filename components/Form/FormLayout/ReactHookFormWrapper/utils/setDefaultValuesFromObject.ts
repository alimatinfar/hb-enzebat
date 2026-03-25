

type Props = {
  setValue: any;
  defaultValues: NonNullable<unknown>;
}

function setDefaultValuesFromObject({setValue, defaultValues}: Props) {
  Object.entries(defaultValues).forEach(([key, value]) => {
    setValue(key, value)
  })
}

export default setDefaultValuesFromObject