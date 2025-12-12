import LS_KEYS from "../constances/localStorageKeys";

const Ls = {
  exists: (typeof window !== 'undefined' && window?.localStorage !== undefined),

  get(key: string) {
    if (!this.exists) return;
    const data = window.localStorage.getItem(key)
    if (!data) return; else {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error("Invalid JSON data:", e);
        return null; // or handle the error as appropriate for your use case
      }
    }
  },

  add(key: string, data: any) {
    if (!this.exists) return
    window.localStorage.setItem(key, JSON.stringify(data))
  },

  remove(key: string) {
    if (!this.exists) return;
    window.localStorage.removeItem(key)
  },

  wipe() {
    if (!this.exists) return;
    window.localStorage.clear()
  },

  clearNestedLocalStorage(formLocalStorageKey: keyof typeof LS_KEYS) {
    const allValues: string[] = []

    function loopOnLsKeys(object: any) {
      Object.entries(object).forEach(item => {
        if (typeof item[1] === 'object') return loopOnLsKeys(item[1])
        allValues.push(String(item[1]))
      })
    }

    loopOnLsKeys(LS_KEYS[formLocalStorageKey])

    allValues.forEach(value => {
      Ls.remove(value)
    })
  }
}

export default Ls;