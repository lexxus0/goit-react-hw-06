import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { SlPhone, SlUser } from "react-icons/sl";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/contactsSlice";
import css from "./ContactForm.module.css";

const INIT_VALUES = {
  contactName: "",
  contactNumber: "",
};

const PHONE_REGEX = /^\d{3}-\d{2}-\d{2}$/;

const ContactValidationSchema = Yup.object().shape({
  contactName: Yup.string()
    .required("Required")
    .min(3, "Contact name has to be more than 3 characters")
    .max(50, "Contact name has to be less than 50 characters"),
  contactNumber: Yup.string()
    .required("Required")
    .matches(
      PHONE_REGEX,
      "Invalid phone number format. Please use the format 321-22-11"
    ),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  
  const handleSubmit = (values, actions) => {
    const finalContact = {
      id: nanoid(),
      name: values.contactName,
      number: values.contactNumber,
    };

    dispatch(addContact(finalContact));

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={INIT_VALUES}
      onSubmit={handleSubmit}
      validationSchema={ContactValidationSchema}
    >
      {({ errors }) => (
        <Form className={css.contactForm}>
          <label className={css.contactLabel}>
            <SlUser className={css.formIcon} />
            <span className={css.contactSpanName}>Name</span>
            <Field
              className={css.contactField}
              type="text"
              name="contactName"
            />
          </label>
          <ErrorMessage
            className={css.contactErr}
            name="contactName"
            component="span"
          />
          <label className={css.contactLabel}>
            <SlPhone className={css.formIcon} />
            <span className={css.contactSpan}>Number</span>
            <Field
              className={css.contactField}
              type="tel"
              name="contactNumber"
            />
          </label>
          <ErrorMessage
            className={css.contactErr}
            name="contactNumber"
            component="span"
          />
          <button
            disabled={Object.keys(errors).length > 0}
            className={css.contactBtn}
            type="submit"
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
