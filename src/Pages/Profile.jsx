import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { info } = useSelector(({ market }) => market);

  console.log(info);
  return (
    <main className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="container">
        <h1 className="display-2">{info.name}</h1>
        <h3 className="display-4">{info.inCharge}</h3>
        <p>{info.phone}</p>
        <p>
          {info.address.city?.name?.uz} / {info.address.region?.name?.uz}
        </p>

        <p>{info.address?.full}</p>
      </div>
      <div className="d-flex gap-3">
        <button className="btn btn-danger">Change password</button>
        <button className="btn btn-outline-info">Change info</button>
      </div>
    </main>
  );
};

export default Profile;
