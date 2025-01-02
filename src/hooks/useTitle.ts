import { useEffect } from "react";

function useTitle(title: string) {
  useEffect(() => {
    if (!title) {
      return;
    }
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}

export default useTitle;
