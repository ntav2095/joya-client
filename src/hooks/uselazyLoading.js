import { useMemo } from "react";
import { placeholder } from "../assets/images/index";

export function loadingImg(img) {
  const lazzy = img.getAttribute("lazy");
  if (lazzy) {
    img.setAttribute("src", lazzy);
    // img.removeAttribute('lazy')
  }
}
export default function useLazyLoading(loadingimage) {
  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entry) =>
          entry.forEach((item) => {
            if (item.isIntersecting) {
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
    image.forEach((item) => {
      observer.observe(item);
    });
  }
  return [
    () => {
      lazzy();
    },
  ];
}
