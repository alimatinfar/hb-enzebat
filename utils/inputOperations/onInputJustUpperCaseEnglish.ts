import onInputJustEnglishLetters from "@/utils/inputOperations/onInputJustEnglishLetters";

function onInputJustUpperCaseEnglish(e: any) {
  e.target.value = onInputJustEnglishLetters(e).target.value.toUpperCase();
}

export default onInputJustUpperCaseEnglish