function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = new TextDecoder().decode(Uint8Array.from(atob(base64), c => c.charCodeAt(0)));
    return JSON.parse(decodedData);
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
}

export default parseJwt