import usePageTitle from "../../hooks/usePageTitle";
import classes from "./NotFound.module.css";

function NotFound() {
  usePageTitle("Trang không tồn tại || Go Travel");
  return (
    <div>
      <div className={classes.notFound}>
        <h1>Page Not Found</h1>
      </div>
    </div>
  );
}

export default NotFound;
