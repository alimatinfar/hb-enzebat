export function generateOptions() {

  const totalOptions = 60

  const items = new Array(totalOptions).fill(0)
  const mappedItems = items.map((item, index) => ({
    name: `ایتم شماره- ${index + 1}`,
    description: `توضیحات-${index + 1}`,
    id: index,
  }))

  return mappedItems
}


type FetchOptionsParamsType = {
  page?: number,
  rowsPerPage?: number,
  search?: string
}

function fetchOptions({page = 1, rowsPerPage = 10, search = ''}: FetchOptionsParamsType) {

  const items = generateOptions()

  const searchedItems = items.filter(item => item.name.includes(search))

  const startIndex = rowsPerPage * (page - 1)
  const endIndex = startIndex + rowsPerPage
  const finalResult = searchedItems.slice(startIndex, endIndex)

  return {
    data: finalResult,
    rowsPerPage: rowsPerPage,
    currentPage: page,
    allCount: searchedItems.length,
  }
}

export default fetchOptions
