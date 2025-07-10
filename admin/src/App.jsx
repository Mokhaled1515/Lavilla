import "./app.styles.scss";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/re";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard/dashboard";
import CreateRoom from "./pages/CreateRoom";
import Rooms from "./pages/Rooms/Rooms";
import Room from "./pages/Room/Room";
import EditRoom from "./pages/EditRoom/EditRoom";
const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/create" element={<CreateRoom />} />
          <Route path="/edit/rooms/:id" element={<EditRoom />} />
          <Route path="/rooms/all/:id" element={<Room />} />
        </Routes>
      </Router>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;
