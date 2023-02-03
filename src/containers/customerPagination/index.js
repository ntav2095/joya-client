import { useEffect, useState, useRef } from "react";
import "./pagination.css";
import { chevronLeft, chevronRight } from "../../assets/svgs";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import { useTranslation } from "react-i18next";

export default function CustomPagination({ total, pagenumber, callback }) {
  const [state, setState] = useState(pagenumber);
  const [pageInput, setPageInput] = useState(pagenumber);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const { t } = useTranslation();

  const ref = useRef(null);

  useEffect(() => {
    if (state !== pagenumber) {
      callback(state);
    }
  }, [state]);

  useEffect(() => {
    setState(pagenumber);
  }, [pagenumber]);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (Number(pageInput) > total || Number(pageInput) < 1) return;
    setState(Number(pageInput));
    setShow(false);
  };

  const changeHandler = (e) => {
    const val = e.target.value;
    const valNum = Number(val);

    if (isNaN(valNum)) {
      return;
    }

    if (!Number.isInteger(valNum)) {
      return;
    }

    setPageInput(val);
  };

  // buttons classes
  let leftClasses = "";
  if (pagenumber == 1) {
    leftClasses += " color__button__disable";
  }

  let rightClasses = "";
  if (pagenumber == total) {
    rightClasses += " color__button__disable";
  }

  return (
    <div className="container__pagination" ref={ref}>
      <Overlay
        show={show}
        target={target}
        placement="top"
        container={ref}
        containerPadding={20}
        onExited={() => setPageInput(state)}
        rootClose={true}
        onHide={() => setShow(false)}
      >
        <Popover id="popover-contained">
          <Popover.Body>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="nhập số trang"
                value={pageInput}
                onChange={changeHandler}
              />
              <button type="submit">{t("components.pagination.go")}</button>
            </form>
          </Popover.Body>
        </Popover>
      </Overlay>

      <button className="button__number" onClick={handleClick}>
        {pagenumber}
      </button>
      <span>{"  of " + total + " "}</span>
      <button
        id="chevronLeft"
        className={leftClasses}
        type="button"
        onClick={() => pagenumber > 1 && setState(state - 1)}
      >
        {chevronRight}
      </button>
      <button
        id="chevronRight"
        className={rightClasses}
        type="button"
        onClick={() => pagenumber < total && setState(state + 1)}
      >
        {chevronLeft}
      </button>
    </div>
  );
}
