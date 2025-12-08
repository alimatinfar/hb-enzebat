type Props = {
  event: any;
  hasDotKey?: boolean;
}

function inputOnKeyDownJustNumber({event, hasDotKey}: Props) {
  const keyCode = event.which;

  const dotKeyCode = 46;
  const allowedKeys = [8, 13, ...(hasDotKey ? [dotKeyCode] : [])];

  if (
    !(keyCode > 47 && keyCode < 58) &&
    !(keyCode > 1775 && keyCode < 1786) &&
    !allowedKeys.includes(keyCode)
  ) {
    event.preventDefault();
  }
}

export default inputOnKeyDownJustNumber;