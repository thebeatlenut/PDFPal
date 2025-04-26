import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**Hook to set page title
 * @param {string} title - The title to be displayed in the page title.
 * @param {boolean} [prevailOnUnmount=false] - Whether the title should persist on unmount.
 *
 */
export const useDocumentTitle = (title: string, prevailOnUnmount = false) => {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title + " | PDF Pal";
  }, [title]);

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    },
    [prevailOnUnmount]
  );
};

/**Hook to get window width */
export const useWindowWidth = () => {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return width;
};
