import { useState, useEffect } from "react";

const useInfiniteScroll = callback => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let isMounted = true;
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight ||
        isFetching
      )
        return;
      if (isMounted) {
        setIsFetching(true);
      }
      return () => (isMounted = false);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching]);

  useEffect(() => {
    let isMounted = true;
    if (!isFetching) return;
    if (isMounted) {
      callback(isMounted);
    }
    return () => (isMounted = false);
  }, [callback, isFetching]);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
