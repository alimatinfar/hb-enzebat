
function onInputJustEnglishLetters(e:any) {
  const value = e.target.value;

  // حذف کاراکترهای غیر از حروف انگلیسی
  e.target.value = value.replace(/[^a-zA-Z]/g, '');
  return e
}

export default onInputJustEnglishLetters;