import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateMarketInfo } from "../store/slices/market";
import { useDispatch } from "react-redux";

const CompleteProfile = () => {
  const [regions, setRegions] = useState([]);
  const [values, setValues] = useState({
    name: "",
    inCharge: "",
    address: {
      city: "",
      region: "",
      full: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  useEffect(() => {
    async function getRegions() {
      let { data } = await axios.get("/regions");

      setRegions(data.regions);
    }

    getRegions();
  }, []);

  function handleInputChange(e) {
    setValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  }

  function handleRegionChange(e) {
    let regionId = e.target.value;

    let {
      city: { _id: cityId },
    } = regions.find((r) => r._id === regionId);

    setValues((ov) => ({
      ...ov,
      address: {
        ...ov.address,
        city: cityId,
        region: regionId,
      },
    }));
  }

  function handleFullAddressChange(e) {
    setValues((ov) => ({
      ...ov,
      address: { ...ov.address, full: e.target.value },
    }));
  }

  async function handleCompleteProfile(e) {
    e.preventDefault();

    // Validations

    try {
      console.log(values);
      let { data } = await axios.post("/markets/me", values);

      dispatch(updateMarketInfo(data.market));

      toast("Successfully Completed", { type: "success" });

      navigate("/profile");
    } catch (error) {
      // handle error
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center">
      <form
        onSubmit={handleCompleteProfile}
        className="p-5 w-50 mx-auto bg-white border shadow rounded-3"
      >
        <h2>Complete</h2>
        <div className="my-3">
          <label className="form-label" htmlFor="name">
            Market Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Korzinka"
            value={values.name}
            onChange={handleInputChange}
            required
            min={6}
          />
        </div>
        <div className="my-3">
          <label className="form-label" htmlFor="inCharge">
            Person In Charge
          </label>
          <input
            type="text"
            name="inCharge"
            className="form-control"
            id="inCharge"
            placeholder="Eshmatjon"
            value={values.inCharge}
            onChange={handleInputChange}
            required
            min={4}
          />
        </div>
        <div className="my-3">
          <label className="form-label" htmlFor="region">
            Region
          </label>
          <select
            value={values.address.region}
            className="form-select"
            onChange={handleRegionChange}
            id="region"
          >
            <option value="" disabled>
              Select a region
            </option>
            {regions.map((region) => (
              <option key={region._id} value={region._id}>
                {region.name["uz"]}
              </option>
            ))}
          </select>
        </div>
        <div className="my-3">
          <label className="form-label" htmlFor="full-address">
            Full address
          </label>
          <input
            type="text"
            className="form-control"
            id="full-address"
            placeholder="Navoiy ko'chasi, 6a uy"
            value={values.address.full}
            onChange={handleFullAddressChange}
            required
            min={4}
          />
        </div>
        <button className="my-3 btn btn-outline-success w-100">Login</button>
      </form>
    </div>
  );
};

export default CompleteProfile;
