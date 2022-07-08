import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Select from "react-select";

const NewUserForm = () => {
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "",
    avatar: "",
    email_verified: "",
    password: "",
  });
  const [photo, setPhoto] = useState();
  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setPayload({
      ...payload,
      status: 0,
      email_verified: 0,
      [name]:
        name === "status"
          ? Number(value)
          : name === "email_verified"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = FormData();
    for (let key in payload) {
      if (key === "role") {
        payload[key].map((val) => {
          formData.append("role", val);
        });
      } else {
        formData.append(key, payload[key]);
      }
    }
    if (photo) {
      formData.append("avatar", photo);
    }
  };

  // user role options list
  const options = [
    { value: "admin", label: "Admin" },
    { value: "teacher", label: "Teacher" },
    { value: "student", label: "Student" },
  ];

  const onChangeRole = (value) => {
    const newRole = [];
    value.map((val) => {
      newRole.push(val);
      setPayload({ ...payload, role: newRole });
    });
  };

  return (
    <div className="container my-5">
      <h3 className="text-center">Add New USer</h3>

      <div className="row">
        <div className="col-8 mx-auto">
          <div className="text-end">
            <NavLink to="/" className="btn btn-primary mb-3">
              See all List users
            </NavLink>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="" className="mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id=""
                className="form-control"
                value={payload.name}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="mb-2">
                Upload image
              </label>
              <input
                type="file"
                id=""
                accept="image/*"
                className="form-control"
                onChange={(e) => handlePhoto(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="mb-2">
                Phone Nubmer
              </label>
              <input
                type="tel"
                name="phone"
                id=""
                className="form-control"
                value={payload.phone}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id=""
                className="form-control"
                value={payload.email}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="mb-2">
                Choose Role
              </label>
              <Select
                options={options}
                defaultValue={options[0]}
                isMulti
                isSearchable
                placeholder="Select Role"
                onChange={(e) => {
                  onChangeRole(e);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="mb-2">
                Status
              </label>
              <select
                name="status"
                id=""
                className="form-select"
                value={payload.status}
                onChange={onChange}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="" className="mb-2">
                Email Varified
              </label>
              <select
                name="email_verified"
                id=""
                className="form-select"
                value={payload.email_verified}
                onChange={onChange}
              >
                <option value={1}>Verified</option>
                <option value={0}>Not Verified</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="" className="mb-2">
                Enter Pasword
              </label>
              <input
                type="text"
                name="password"
                id=""
                className="form-control"
                value={payload.password}
                onChange={onChange}
              />
            </div>
            <button className="btn btn-lg btn-primary w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUserForm;
