import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Axios from "../../../axios";
import { SuccessTostify } from "../../common/tostify";

const UserList = () => {
  //   userlist usestate
  const [userList, setUserList] = useState([]);

  //search form input value
  const [searchTerm, setSearchTerm] = useState("");

  //  to get users from api
  const getUsers = async () => {
    Axios.get("users/list")
      .then((res) => {
        SuccessTostify(`${res.data.total} users are registered ultil`);
        setUserList(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   userlist change only when page loaded
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h4 className="text-center mb-3">All User lists</h4>
        <div className="row">
          <div className="my-3">
            <input
              type="text"
              id=""
              placeholder="Search by name,email.phone ...."
              className="form-control-lg w-100"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
        </div>

        <NavLink to="/create-user" className="btn btn-primary">
          Add New User
        </NavLink>
        <div className="row my-3">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Email Varified</th>
                </tr>
              </thead>
              <tbody>
                {userList.length > 1 ? (
                  userList
                    .filter((val) => {
                      if (searchTerm == "") {
                        return val;
                      } else {
                        const result =
                          val.name.toLowerCase().includes(searchTerm) ||
                          val.email.toLowerCase().includes(searchTerm) ||
                          (val.phone && val.phone.includes(searchTerm));
                        return result;
                      }
                    })
                    .map((value, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={` ${
                                value.avatar
                                  ? `https://binlearn.neputertech.com/${value.avatar}`
                                  : "https://cdn-icons-png.flaticon.com/512/892/892781.png?w=360"
                              }`}
                              alt=""
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                              }}
                            />
                          </td>
                          <td>{value.name}</td>
                          <td>{value.email}</td>
                          <td>
                            {value.phone ? `${value.phone}` : "No Availalbe"}
                          </td>
                          <td>
                            <ul>
                              {value.role.map((val, ind) => {
                                return <li key={ind}>{val}</li>;
                              })}
                            </ul>
                          </td>
                          <td>
                            {value.status ? (
                              <div className="badge bg-primary">Active</div>
                            ) : (
                              <div className="badge bg-danger">Inactive</div>
                            )}
                          </td>
                          <td>
                            {value.email_verified ? (
                              <div className="badge bg-primary">Veridied</div>
                            ) : (
                              <div className="badge bg-danger">
                                Not Verified
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <p className="text-danger">No user available</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
