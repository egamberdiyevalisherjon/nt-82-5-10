import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [values, setValues] = useState({
    phone: "+998",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) navigate("/");
  }, []);

  function handleInputChange(e) {
    setValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleRegister(e) {
    e.preventDefault();

    // Validations ...

    // register
    try {
      let {
        data: { token, message },
      } = await axios.post("/auth/market", values);

      localStorage.setItem("token", token);
      axios.defaults.headers.common["x-auth-token"] = `Bearer ${token}`;

      toast(message, { type: "success" });
      navigate("/");
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center">
      <form
        onSubmit={handleRegister}
        className="p-5 w-50 mx-auto bg-white border shadow rounded-3"
      >
        <h2>Login</h2>
        <div className="my-3">
          <label className="form-label" htmlFor="phone">
            Your phone number
          </label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            id="phone"
            placeholder="+998xxxxxxxxx"
            value={values.phone}
            onChange={handleInputChange}
            required
            min={13}
          />
        </div>
        <div className="my-3">
          <label className="form-label" htmlFor="password">
            Enter a Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="xxxxxx"
            value={values.password}
            onChange={handleInputChange}
            required
            min={4}
          />
        </div>
        <button className="my-3 btn btn-outline-success w-100">Login</button>
        <p>
          No account yet? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
