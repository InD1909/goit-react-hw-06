import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addContact } from "../../redux/contactsSlice";
import s from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();
  const initialValues = { name: "", number: "" };

  const contactSchema = Yup.object({
    name: Yup.string()
      .required("This field is required!")
      .min(3, "Too short!")
      .max(50, "Too long!"),
    number: Yup.string()
      .required("This field is required!")
      .min(3, "Too short!")
      .max(50, "Too long!"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={contactSchema}
    >
      <Form className={s.wrapper}>
        <span>Name</span>
        <Field name="name" className={s.contactInput} />
        <ErrorMessage name="name" component="span" className={s.error} />
        <span className={s.contactNumber}>Number</span>
        <Field name="number" className={s.contactInput} />
        <ErrorMessage name="number" component="span" className={s.error} />
        <button type="submit" className={s.formBtn}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
