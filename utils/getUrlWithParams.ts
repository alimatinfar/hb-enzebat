function getUrlWithParams(url:string, params:any, shouldEncode: boolean= false) {

  let joinedParams = '';
  if (params) {
    const mappedParams = Object.keys(params).map(item => {

      const value = params[item]
      const finalValue = shouldEncode ? encodeURIComponent(value) : value

      return `${item}=${finalValue}`
    })
    joinedParams = `?${mappedParams.join('&')}`
  }

  return `${url}${joinedParams}`
}

export default getUrlWithParams;