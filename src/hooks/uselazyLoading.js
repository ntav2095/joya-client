import { useEffect } from "react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export default function useLazyLoading() {
  const location = useLocation();

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entry) =>
          entry.forEach((item) => {
            if (item.isIntersecting) {
              const img = item.target;
              console.log(img.getAttribute("lazy"));
              img.setAttribute("src", img.getAttribute("lazy"));
              observer.unobserve(img);
            }
          }),
        {
          rootMargin: "50px",
        }
      ),
    []
  );

  useEffect(() => {
    const images = document.querySelectorAll("img[lazy]");
    images.forEach((item) => {
      observer.observe(item);
    });
  }, [location]);
}
