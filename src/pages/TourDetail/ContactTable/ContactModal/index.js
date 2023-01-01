import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import styles from "./ContactModal.module.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import NotifyModal from "../../../../components/NotifyModal";
import { useParams } from "react-router-dom";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const trans = {
  firstname: {
    en: "Firstname",
    vi: "Họ",
  },
  surname: {
    en: "Surname",
    vi: "Tên",
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
  plz_choose_gender: {
    en: "please choose gender",
    vi: "Vui lòng chọn giới tính",
  },
  requested_successfully: {
    en: "Requested successfully. We will contact you in 2 hours.",
    vi: "Yêu cầu gọi lại thành công. Chúng tôi sẽ liên hệ với bạn trong vòng 2 giờ.",
  },
  requested_failed: {
    en: "Something wrong happens. Please try again, or contact us: 123456789",
    vi: "Có lỗi xảy ra. Vui lòng thử lại, hoặc yêu cầu gọi lại, hoặc liên hệ với chúng tôi theo số: 123456789",
  },
  call_me: {
    en: "Call me",
    vi: "Yêu cầu gọi lại",
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

const initialValues = {
  firstname: "",
  surname: "",
  phone: "",
  gender: "",
};

function ContactModal({ success, onHide, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const lang = useTranslation().i18n.language;
  const tourId = useParams().tourId;
  console.log(tourId);

  const submitHandler = async (values) => {
    try {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);
      await axios.post("http://localhost:5000/tour/advisory", {
        firstname: values.firstname,
        surname: values.surname,
        phone: values.phone,
        gender: values.gender,
        tourId,
      });
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const contactFormSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, trans.form_validation.too_short[lang])
      .max(50, trans.form_validation.too_long[lang])
      .required(trans.form_validation.required[lang]),
    surname: Yup.string()
      .min(2, trans.form_validation.too_short[lang])
      .max(50, trans.form_validation.too_long[lang])
      .required(trans.form_validation.required[lang]),
    phone: Yup.string()
      .matches(phoneRegExp, trans.form_validation.invalid_phone[lang])
      .required(trans.form_validation.required[lang]),
    gender: Yup.string().required(trans.form_validation.required[lang]),
  });

  useEffect(() => {
    if (isSuccess) {
      onHide();
    }
  }, [isSuccess]);

  let notify = {};

  if (isSuccess) {
    notify = {
      message:
        "Yêu cầu tư vấn thành công! Chúng tôi sẽ gọi lại cho bạn sau ít phút.",
      type: "success",
      btn: {
        cb: () => {
          setIsSuccess(false);
          setError(null);
        },
        component: "button",
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
            <h6 className="fs-6">{trans.call_me[lang]}</h6>
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
              initialValues={initialValues}
              validationSchema={contactFormSchema}
              onSubmit={submitHandler}
            >
              {({ values }) => (
                <Form>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className={styles.label}>
                        <h6>{trans.firstname[lang]}:</h6>
                        <Field type="text" name="firstname" />
                        <ErrorMessage name="firstname" component="p" />
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className={styles.label}>
                        <h6>{trans.surname[lang]}:</h6>
                        <Field type="text" name="surname" />
                        <ErrorMessage name="surname" component="p" />
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className={styles.label}>
                        <h6>{trans.phone[lang]}:</h6>
                        <Field type="tel" name="phone" />
                        <ErrorMessage name="phone" component="p" />
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className={styles.label}>
                        <h6>{trans.gender[lang]}:</h6>
                        <Field
                          as="select"
                          name="gender"
                          style={{
                            color: values.gender === "" ? "gray" : "#000",
                          }}
                        >
                          <option value="" disabled defaultValue>
                            {trans.plz_choose_gender[lang]}
                          </option>
                          <option value="male">{trans.male[lang]}</option>
                          <option value="female">{trans.female[lang]}</option>
                          <option value="other">{trans.other[lang]}</option>
                        </Field>
                        <ErrorMessage name="gender" component="p" />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <p className={styles.errorMessage + " mb-2 text-danger"}>
                      {trans.requested_failed[lang]}
                    </p>
                  )}
                  <button className="btn btn-dark btn-sm" type="submit">
                    {trans.call_me[lang]}
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

export default ContactModal;
