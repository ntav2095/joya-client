import { useEffect } from "react";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { lazzyNotLoading } from "../store/lazyloading.slice";

export default function useLazyLoading() {
  const dispatch=useDispatch()
  console.log("observerloading");

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entry) =>
          entry.forEach((item) => {
            console.log("observer");
            if (item.isIntersecting) {
              const loadingimage = (img) => {
                const lazzy = img.getAttribute("lazy");
                img.setAttribute("src", lazzy);
                img.removeAttribute("lazy");
              };
              loadingimage(item.target);
              observer.unobserve(item.target);
            }
          }),
        {
          rootMargin: "50px",
        }
      ),
    []
  );

  function lazzy() {
    const image = document.querySelectorAll("img[lazy]");
    dispatch(lazzyNotLoading())
    console.log("image", image);
    image.forEach((item) => {
      observer.observe(item);
    });
  }
  // useEffect(() => {
    // if (!loading && data) {
      // setTimeout(() => {
        
  //     }, 500);
    // }
  // }, [data]);
  return [lazzy];
}
