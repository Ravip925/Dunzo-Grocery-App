import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import Swal from "sweetalert2";
import "animate.css";
import { mobile } from "../Responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
    url("https://i.ibb.co/ZBvMs2c/cart.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({
    padding: "20px",
  })}
`;
const Wrapper = styled.div`
  width: 900px;
  height: 500px;
  display: flex;
  border-radius: 10px;
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
    0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
  ${mobile({
    width: "100%",
    flexDirection: "column",
  })}
`;

const Left = styled.div`
  flex: 1.3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  ${mobile({
    borderBottomLeftRadius: "0",
    borderTopRightRadius: "10px",
  })}
  .h1 {
    font-weight: 830;
    margin-bottom: 40px;
    ${mobile({
      fontSize: "1.5rem",
      margin: "20px 0",
    })}
  }
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  ${mobile({
    flex: 0.6,
    borderTopRightRadius: "0",
    borderBottomLeftRadius: "10px",
  })}
  .heading_2 {
    font-weight: 800;
    margin-bottom: 30px;
  }
`;

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await publicRequest.post("/login", data);
      localStorage.setItem("token", res.data);
      Swal.fire({
        title: "Success",
        text: "Login successful",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        Swal.fire(`Login Failed`);
      }
    }
  };

  return (
    <Container>
      <Wrapper className="animate__animated animate__fadeInLeftBig">
        <Left>
          <h1 className="h1">Login to Your Account</h1>
          <form className="form_container" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input"
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="input"
              autoComplete="off"
            />

            {error && <div className="error_msg">{error}</div>}
            <button type="submit" className="green_btn">
              Sign In
            </button>
          </form>
        </Left>
        <Right>
          <h1 className="heading_2">New Here ?</h1>
          <Link to="/signup">
            <button type="button" className="white_btn">
              Sign Up
            </button>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Login;
