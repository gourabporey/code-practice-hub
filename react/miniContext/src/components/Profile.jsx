import React, { useContext } from "react";
import UserContext from "../context/UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) return <div>Login required</div>;

  return (
    <div>
      <h1>Username: {user.username}</h1>
    </div>
  );
};

export default Profile;
