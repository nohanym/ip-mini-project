import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { auth } from "../firebase";
import FormFieldError from "../components/FormFieldError";
import FileSelector from "../components/FileSelector";
import { createBook } from "../helpers/helpers";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import exitIcon from "../assets/exitIcon.svg";

const BookSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Too Short! Book Title Must be atleast 5 characters")
    .max(150, "Title Too Long!")
    .required("Required Field"),
  author: Yup.string()
    .min(2, "Too Short! Author Name Must be atleast 2 characters")
    .required("Required Field"),
  publisher: Yup.string()
    .min(2, "Too Short! Pulisher Name Must be atleast 2 characters")
    .required("Required Field"),
  category: Yup.string()
    .min(2, "Too Short! Category Must be atleast 2 characters")
    .required("Required Field"),
  description: Yup.string()
    .min(100, "Too Short! Description Must be atleast 100 characters")
    .required("Required Field"),
  publishDate: Yup.date("Publish Date Must be date")
    .required("Publish Date is a required field.")
    .nullable(),
  price: Yup.number("Price must be a number.")
    .min(50, "Price must be atleast 50 ETB")
    .required("Price is Required Field")
    .nullable(),
});

const AddNewBook = ({ setShowAddNewBook }) => {
  const [user] = useAuthState(auth);
  const [coverImage, setCoverImage] = useState("");

  if (!user) {
    // setShowAddNewBook(false);
    return;
  }
  return (
    <div className="create-book-form-overlay">
      <div className="create-new-wrapper">
        <div
          className="form-exit-icon"
          onClick={() => setShowAddNewBook(false)}
        >
          <img src={exitIcon} alt="exit" />
        </div>
        <h1 className="signup-form-title" style={{ textAlign: "center" }}>
          Add New Book
        </h1>
        <Formik
          initialValues={{
            title: "",
            author: "",
            publisher: "",
            category: "",
            description: "",
            publishDate: null,
            price: "",
          }}
          validationSchema={BookSchema}
          onSubmit={async (values) => {
            if (coverImage) {
              await createBook(
                values.title,
                values.description,
                coverImage,
                values.author,
                values.publisher,
                values.category,
                values.publishDate,
                values.price
              ).then(() => {
                setShowAddNewBook(false);
              });
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="create-book-form">
              <FileSelector
                state={coverImage}
                setState={setCoverImage}
                buttonText={
                  coverImage ? "Change Cover Image" : "Add Cover Image"
                }
              />

              {errors.title && touched.title ? (
                <FormFieldError message={errors.title} />
              ) : null}
              <Field
                className="text-input"
                name="title"
                type="text"
                placeholder="Book Title"
              />
              {errors.author && touched.author ? (
                <FormFieldError message={errors.author} />
              ) : null}
              <Field
                className="text-input"
                name="author"
                type="text"
                placeholder="Author Name"
              />

              {errors.publishDate && touched.publishDate ? (
                <FormFieldError message={errors.publishDate} />
              ) : null}
              <Field name="publishDate">
                {({ form, field }) => {
                  const { setFieldValue } = form;
                  const { value } = field;
                  return (
                    <DateView
                      placeholderText="Publishd Date"
                      className="text-input"
                      filterDate={(date) => {
                        return new Date() > date;
                      }}
                      id="publishDate"
                      selected={value}
                      onChange={(val) => setFieldValue("publishDate", val)}
                    />
                  );
                }}
              </Field>

              {errors.publisher && touched.publisher ? (
                <FormFieldError message={errors.publisher} />
              ) : null}
              <Field
                className="text-input"
                name="publisher"
                type="text"
                placeholder="Publisher Name"
              />
              {errors.category && touched.category ? (
                <FormFieldError message={errors.category} />
              ) : null}
              <Field
                className="text-input"
                name="category"
                type="text"
                placeholder="Category"
              />
              {errors.price && touched.price ? (
                <FormFieldError message={errors.price} />
              ) : null}
              <Field
                className="text-input"
                name="price"
                type="number"
                placeholder="Book Price"
              />
              {errors.description && touched.description ? (
                <FormFieldError message={errors.description} />
              ) : null}
              <Field
                className="text-input textarea"
                as="textarea"
                rows={20}
                name="description"
                type="text"
                placeholder="Description"
              />

              <button type="submit" className="create-new-btn">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddNewBook;
