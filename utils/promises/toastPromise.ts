const {toast} = await import("react-toastify")

function toastPromise() {
  return new Promise((resolve: (item: typeof toast) => void) => {
    (async () => {
      resolve(toast);
    })()
  })
}

export default toastPromise