
type Props = {
  value: any;
  format?: string;
}

export function getFormattedDate({value, format = "YYYY-MM-DD"}: Props) {
  return value.format(format)
}


export function getFormattedDateTime({value}: Pick<Props, 'value'>) {
  const date = getFormattedDate({value})
  const time = value.format('HH:mm:ss')
  return `${date}T${time}`
}

