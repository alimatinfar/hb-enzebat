import CryptoJS from "crypto-js"

const tokenSecretKey = "12345polaris12345polaris12345polarisTokenKey"

export function encrypt(value: string) {
  const encryptedData = CryptoJS.AES.encrypt(value, tokenSecretKey)

  return encryptedData.toString()
}

export function decrypt(value: string) {
  const decryptedData = CryptoJS.AES.decrypt(value, tokenSecretKey)
  const parsedText = decryptedData.toString(CryptoJS.enc.Utf8)

  return parsedText
}
