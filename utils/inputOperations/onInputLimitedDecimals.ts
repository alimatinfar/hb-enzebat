function onInputLimitedDecimals(e: any, decimalCounts: number) {
  let value = e.target.value;

  value = value.replace(/[^0-9.]/g, '');

  value = value.replace(/(\..*)\./g, '$1');

  const regex = new RegExp(`(\\.\\d{${decimalCounts}})\\d+`, 'g');
  value = value.replace(regex, '$1');

  e.target.value = value;
  return e;
}

export default onInputLimitedDecimals;