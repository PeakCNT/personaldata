import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { adduser } from "../slices/userSlice";
import { saveuser } from "../slices/userSlice";

const Form = () => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last name is required"),
    dob: Yup.string()
      .required("Date of Birth is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date of Birth must be a valid date in the format YYYY-MM-DD"
      ),
    nationality: Yup.string(),
    email: Yup.string().email("Email is invalid"),
    gender: Yup.string(),
    phone: Yup.string().required("Mobilephone is required"),
    salary: Yup.string().required("Expected Salary is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const dispatch = useDispatch();
  const { users, user, edit } = useSelector((state) => state.user);

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    localStorage.setItem("person", JSON.stringify(users));
  }, [users]);

  function onSubmit(data) {
    if (edit) {
      dispatch(saveuser(data));
    } else if (
      users.find((item) => item.lastName === data.lastName) === undefined
    ) {
      dispatch(adduser({ ...data, id: users.length + 1 }));
    } else {
      alert("Duplicate user");
    }
    reset();
  }

  return (
    <>
      <p className="header">Personal Data</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formbox">
          <div>
            <label>Title : </label>
            <select value={user.title} name="title" {...register("title")}>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Ms">Ms</option>
            </select>
            <div className="invalid-feedback">{errors.title?.message}</div>
          </div>
          <div>
            <label>First Name : </label>
            <input
              name="firstName"
              type="text"
              placeholder="First name"
              defaultValue={user.firstName}
              {...register("firstName")}
            />
            <div className="invalid-feedback">{errors.firstName?.message}</div>
          </div>
          <div>
            <label>Last Name : </label>
            <input
              name="lastName"
              type="text"
              placeholder="Last name"
              defaultValue={user.lastName}
              {...register("lastName")}
            />
            <div className="invalid-feedback">{errors.lastName?.message}</div>
          </div>
          <div>
            <label>Date of Birth : </label>
            <input
              name="dob"
              type="date"
              defaultValue={user.dob}
              {...register("dob")}
            />
            <div className="invalid-feedback">{errors.dob?.message}</div>
          </div>
          <div>
            <label>Nationality : </label>
            <select
              value={user.nationality}
              name="nationality"
              {...register("nationality")}
            >
              <option value="thai">Thai</option>
              <option value="japanese">Japanese</option>
              <option value="chinese">Chinese</option>
              <option value="Korean">Korean</option>
            </select>
          </div>
          <div>
            <label>Email : </label>
            <input
              name="email"
              type="text"
              defaultValue={user.email}
              placeholder="name@email.com"
              {...register("email")}
            />
          </div>
          <div>
            <label>Gender : </label>
            <input
              name="gender"
              type="radio"
              defaultValue={user.gender}
              {...register("gender")}
              value="Male"
            />
            <label>Male</label>
            <input
              name="gender"
              type="radio"
              defaultValue={user.gender}
              {...register("gender")}
              value="Female"
            />
            <label>Female</label>
            <input
              name="gender"
              type="radio"
              defaultValue={user.gender}
              {...register("gender")}
              value="Other"
            />
            <label>Other</label>
          </div>
          <div>
            <label>Mobilephone : </label>
            <select name="mobilephone" {...register("phone")}>
              <option value="+66">&#x1F1F9;&#x1F1ED;+66</option>
            </select>
            <input
              defaultValue={user.phone}
              name="phone"
              type="text"
              {...register("phone")}
            />
            <div className="invalid-feedback">{errors.phone?.message}</div>
          </div>
          <div>
            <label>Expected Salary : </label>
            <input
              name="salary"
              type="text"
              placeholder="xx,xxxTHB"
              defaultValue={user.salary}
              {...register("salary")}
            />
            <div className="invalid-feedback">{errors.salary?.message}</div>
          </div>

          <button type="submit" className="">
            {edit ? "Save edit" : "Submit"}
          </button>
          <button type="button" onClick={() => reset()} className="">
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
