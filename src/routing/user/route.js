import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import UserLogin from "../../component/user/auth/login";
import NewUserForm from "../../component/user/create";
import UserList from "../../component/user/list";
import { AuthContext } from "../../storage/authProvider";

const UserRoute = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user.user && user.user._id ? (
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/create-user" element={<NewUserForm />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login-user" element={<UserLogin />} />
        </Routes>
      )}
    </>
  );
};

export default UserRoute;
