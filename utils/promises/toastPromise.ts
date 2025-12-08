import importToast from "@/utils/awaitImports/importToast";

function toastPromise() {
  return new Promise((resolve) => {
    (async () => {
      const toast = await importToast();
      resolve(toast);
    })()
  })
}

export default toastPromise