import { Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import CompleteProfile from "./Pages/CompleteProfile";
import Profile from "./Pages/Profile";

function App() {
  return (
    <div className="text-bg-light">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
