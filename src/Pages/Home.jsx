import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateMarketInfo } from "../store/slices/market";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token) return navigate("/login");

    async function getMe() {
      try {
        let {
          data: { market },
        } = await axios.get("/markets/me");

        toast("Logged in successfully", { type: "success" });

        if (market.isCompleted) {
          dispatch(updateMarketInfo(market));
          return navigate("/profile");
        } else return navigate("/complete-profile");
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");

        delete axios.defaults.headers.common["x-auth-token"];
      }
    }

    getMe();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");

    delete axios.defaults.headers.common["x-auth-token"];

    toast("Logged out", { type: "info" });

    navigate("/login");
  }

  return (
    <>
      <header>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <Outlet />
    </>
  );
};

export default Home;
