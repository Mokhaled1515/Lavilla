import { useEffect, useState } from "react";
import { loginUser, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  // useEffect(() => {
  //   if (isSuccess) {
  //     // navigate("/dashboard");
  //     toast.success("Login successful ✅");
  //     navigate("/dashboard");
  //   }
  //   dispatch(reset());
  // }, [isSuccess, isError, message, dispatch, navigate]);

  useEffect(() => {
    if (isSuccess && user) {
      toast.success("Login successful ✅");
      navigate("/dashboard");
    }

    if (isError) {
      toast.error(message || "Login failed ❌");
    }

    dispatch(reset());
  }, [isSuccess, isError, message, user, dispatch, navigate]);

  
  const handleChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      email,
      password,
    };
    dispatch(loginUser(dataToSubmit));
  };
  return (
    <div className="container">
      <h1 className="heading center">Login</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
