import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./BookingModal.module.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Calendar from "../../../../containers/Calendar";
import { useRef } from "react";
import { useEffect } from "react";
import { format } from "date-fns";
import NotifyModal from "../../../../components/NotifyModal";
import * as Yup from "yup";

const trans = {
  firstname: {
    en: "Firstname",
    vi: "Họ",
  },
  surname: {
    en: "Surname",
    vi: "Tên",
  },
  email: {
    en: "Email",
    vi: "Email",
  },
  phone: {
    en: "Phone number",
    vi: "Số điện thoại",
  },
  gender: {
    en: "Gender",
    vi: "Giới tính",
  },
  male: {
    en: "Male",
    vi: "Nam",
  },
  female: {
    en: "Female",
    vi: "Nữ",
  },
  other: {
    en: "Other",
    vi: "Khác",
  },
  address: {
    en: "Address",
    vi: "Địa chỉ",
  },
  depature_date: {
    en: "Departure date",
    vi: "Ngày khởi hành",
  },
  adults: {
    en: "Adults",
    vi: "Số người lớn",
  },
  children: {
    en: "Children",
    vi: "Số trẻ em",
  },
  book_now: {
    en: "Book now",
    vi: "Đăng ký",
  },
  booked_successfully: {
    en: "Booked successfully. We will contact you in 2 hours.",
    vi: "Đặt tour thành công. Chúng tôi sẽ liên hệ với bạn trong vòng 2 giờ.",
  },
  booked_failed: {
    en: "Something wrong happens. Please try again, or contact us: 123456789",
    vi: "Có lỗi xảy ra. Vui lòng thử lại, hoặc yêu cầu gọi lại, hoặc liên hệ với chúng tôi theo số: 123456789",
  },
  form_validation: {
    too_short: {
      en: "Too short",
      vi: "Quá ngắn",
    },
    too_long: {
      en: "Too long",
      vi: "Quá dài",
    },
    required: {
      en: "Required",
      vi: "Bắt buộc",
    },
    invalid_email: {
      en: "Invalid email",
      vi: "Email không hợp lệ",
    },
    invalid_phone: {
      en: "Invalid phone number",
      vi: "Số điện thoại không hợp lệ",
    },
  },
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const initialValues = {
  firstname: "",
  surname: "",
  email: "",
  address: "",
  phone: "",
  gender: "",
  adult: "",
  children: "",
  date: "",
};

function BookingModal({ selectedDate, onHide, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef();
  const dateLabelRef = useRef();

  const lang = useTranslation().i18n.language;

  const submitHandler = async (values) => {
    const tour = props.tour;

    try {
      setError(null);
      setIsSuccess(false);
      setIsLoading(true);
      await axios.post("http://localhost:5000/tour/booking", {
        tourId: tour._id,
        firstname: values.firstname,
        surname: values.surname,
        email: values.email,
        phone: values.phone,
        gender: values.gender,
        address: values.address,
        adult: values.adult,
        children: values.children,
        departureDate: values.date,
      });
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const genderChangeHandler = (e, setFieldValue, values) => {
    if (values.gender !== e.target.values) {
      setFieldValue("gender", e.target.value);
    }
  };

  const bookingTourSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, trans.form_validation.too_short[lang])
      .max(50, trans.form_validation.too_long[lang])
      .required(trans.form_validation.required[lang]),
    surname: Yup.string()
      .min(2, trans.form_validation.too_short[lang])
      .max(50, trans.form_validation.too_long[lang])
      .required(trans.form_validation.required[lang]),
    email: Yup.string()
      .email(trans.form_validation.invalid_email[lang])
      .required(trans.form_validation.required[lang]),
    address: Yup.string().required(trans.form_validation.required[lang]),
    phone: Yup.string()
      .matches(phoneRegExp, trans.form_validation.invalid_phone[lang])
      .required(trans.form_validation.required[lang]),
    gender: Yup.string().required(trans.form_validation.required[lang]),
    adult: Yup.number().min(1).required(trans.form_validation.required[lang]),
    date: Yup.string().required(trans.form_validation.required[lang]),
  });

  useEffect(() => {
    if (showCalendar) {
      const handler = (e) => {
        if (
          !calendarRef.current.contains(e.target) &&
          !dateLabelRef.current.contains(e.target)
        ) {
          setShowCalendar(false);
        }
      };

      window.addEventListener("click", handler);

      return () => window.removeEventListener("click", handler);
    }
  }, [showCalendar]);

  useEffect(() => {
    if (isSuccess) {
      onHide();
    }
  }, [isSuccess]);

  let notify = {};
  if (isSuccess) {
    notify = {
      type: "success",
      message: trans.booked_successfully[lang],
      btn: {
        component: "button",
        cb: () => {
          onHide();
          setIsSuccess(false);
          setError(null);
        },
      },
      show: isSuccess,
    };
  }

  return (
    <>
      <NotifyModal {...notify} />

      <Modal
        {...props}
        onHide={() => {
          onHide();
          setIsSuccess(false);
          setError(null);
        }}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="fs-5">
              {props.tour.name} [{props.tour.code}]
            </h4>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className={styles.form}>
            {isLoading && (
              <div className={styles.spinner}>
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}

            <Formik
              initialValues={{
                ...initialValues,
                date: selectedDate || "",
              }}
              validationSchema={bookingTourSchema}
              onSubmit={submitHandler}
            >
              {({ setFieldValue, values }) => (
                <Form>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className={styles.label}>
                        <h6>{trans.firstname[lang]}:</h6>
                        <Field type="text" name="firstname" />
                        <ErrorMessage name="firstname" component="h5" />
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className={styles.label}>
                        <h6>{trans.surname[lang]}:</h6>
                        <Field type="text" name="surname" />
                        <ErrorMessage name="surname" component="h5" />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className={styles.label}>
                        <h6>{trans.email[lang]}:</h6>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="h5" />
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className={styles.label}>
                        <h6>{trans.phone[lang]}:</h6>
                        <Field type="tel" name="phone" />
                        <ErrorMessage name="phone" component="h5" />
                      </div>
                    </div>
                  </div>

                  <div className={styles.gendersGroup + " " + styles.label}>
                    <h6>{trans.gender[lang]}:</h6>
                    <div className="row">
                      <div className="col-4 ">
                        <label
                          className={
                            styles.label +
                            " d-flex align-items-center border justify-content-center mb-0"
                          }
                        >
                          <p className="m-0">{trans.male[lang]}</p>
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={values.gender === "male"}
                            onChange={(e) =>
                              genderChangeHandler(e, setFieldValue, values)
                            }
                          />
                        </label>
                      </div>

                      <div className="col-4 ">
                        <label
                          className={
                            styles.label +
                            " d-flex align-items-center border justify-content-center mb-0"
                          }
                        >
                          <p className="m-0">{trans.female[lang]}</p>
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={values.gender === "female"}
                            onChange={(e) =>
                              genderChangeHandler(e, setFieldValue, values)
                            }
                          />
                        </label>
                      </div>

                      <div className="col-4 ">
                        <label
                          className={
                            styles.label +
                            " d-flex align-items-center border justify-content-center mb-0"
                          }
                        >
                          <p className="m-0">{trans.other[lang]}</p>
                          <input
                            type="radio"
                            name="gender"
                            value="other"
                            checked={values.gender === "other"}
                            onChange={(e) =>
                              genderChangeHandler(e, setFieldValue, values)
                            }
                          />
                        </label>
                      </div>
                    </div>
                    <ErrorMessage name="gender" component="h5" />
                  </div>

                  <div className={styles.label}>
                    <h6>{trans.address[lang]}:</h6>
                    <Field type="text" name="address" />
                    <ErrorMessage name="address" component="h5" />
                  </div>

                  <div className="row">
                    <div
                      className={
                        styles.dateField + " col-6 col-sm-4 " + styles.label
                      }
                    >
                      <h6>{trans.depature_date[lang]}:</h6>

                      <input
                        ref={dateLabelRef}
                        onClick={(e) => {
                          e.preventDefault();
                          setShowCalendar((prev) => !prev);
                        }}
                        type="text"
                        readOnly
                        onFocus={(e) => e.preventDefault()}
                        placeholder={
                          values.date
                            ? format(values.date, "dd/MM/yyyy")
                            : "Select date"
                        }
                      />

                      {showCalendar && (
                        <div ref={calendarRef} className={styles.calendar}>
                          <Calendar
                            availableDates={props.tour.departureDates.map(
                              (item) => new Date(item)
                            )}
                            onSelect={(selectedDate) => {
                              setFieldValue("date", selectedDate);
                              setShowCalendar(false);
                            }}
                          />
                        </div>
                      )}
                      <ErrorMessage name="date" component="h5" />
                    </div>

                    <div className="col-6 col-sm-4">
                      <div className={styles.label}>
                        <h6>{trans.adults[lang]}:</h6>
                        <Field type="number" name="adult" />
                        <ErrorMessage name="adult" component="h5" />
                      </div>
                    </div>

                    <div className="col-6 col-sm-4">
                      <div className={styles.label}>
                        <h6>{trans.children[lang]}:</h6>
                        <Field type="number" name="children" />
                        <ErrorMessage name="children" component="h5" />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <p className={styles.errorMessage + " mb-1 text-danger"}>
                      {trans.booked_failed[lang]}
                    </p>
                  )}
                  <button className="btn btn-dark btn-sm" type="submit">
                    {trans.book_now[lang]}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BookingModal;
