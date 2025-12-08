'use client'

import { useEffect } from "react";

function useOutsideClicked(ref:any, func:any, deps?: any[]) {
  useEffect(() => {
    function handleClickOutside(event:any) {
      if (ref.current && !ref.current.contains(event.target)) {
        func();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, ...deps || []]);
}

export default useOutsideClicked