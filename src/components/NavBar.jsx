import React, { useEffect, useState } from "react";
import {
  LocationOn,
  Logout,
  Search,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import styled from "styled-components";
import { Badge } from "@mui/material";
import { mobile } from "../Responsive";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "animate.css";
import "../App.css";

const Container = styled.div`
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: white;
  display: grid;
  place-items: center;
  ${mobile({ height: "70px", })}
`;

const Wrapper = styled.div`
  padding: 0 1.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  ${mobile({ padding: "0 1rem" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  p {
    position: relative;
    ${mobile({
      display: "none",
    })}
  }
`;
const Input = styled.input`
  border: none;
  width: 75%;
  padding: 0px;
  font-size: 17px;
  text-align: center;
  &:focus {
    outline: none;
  }
  ${mobile({ width: "40%" })}
`;
const SearchContainer = styled.div`
  border: 1px solid;
  width: 40%;
  height: 30px;
  display: flex;
  margin-left: 5px;
  padding: 0px;
  align-items: center;
  position: relative;
  ${mobile({
    width: "90px",
    height: "25px",
    fontSize: "0.9rem",
  })}
  input {
    width: 98%;
    height: 98%;
  }
`;

const Logo = styled.div`
  ${mobile({ fontSize: "24px" })}
`;
const Image = styled.img`
  width: 50%;
  ${mobile({ width: "80px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;

  ${mobile({ flex: 3, justifyContent: "flex-end", gap: "8px" })}

  h3 {
    ${mobile({
      display: "none",
    })}
  }
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  &:hover {
    color: #3f3f3f;
  }
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const NavBar = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user_token = jwt_decode(token);
  const user = {
    name: user_token.fname,
    lname: user_token.lname,
  };
  const [location, setLocation] = useState(null);
  const [searchedValue, setSearchedValue] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await axios.get(
              `https://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.REACT_APP_API_KEY}&location=${position.coords.latitude},${position.coords.longitude}`
            );
            const city = response.data.results[0].locations[0].adminArea5; // Extract the city name from the geocoding result
            setLocation(city);
          } catch (error) {
            console.error(error);
            setLocation("Location not found");
          }
        },
        () => {
          setLocation("Location not found");
        }
      );
    } else {
      setLocation("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      navigate(`/search/${searchedValue}`);
    }
  }
  return (
    <Container className="animate__animated animate__fadeInRightBig">
      <Wrapper>
        <Left>
          <Logo>
            <NavLink to="/">
              <Image src="https://resources.dunzo.com/web-assets/prod/_next/static/images/logo-7b2b540792556466133aea6e7c6ae513.png"></Image>
            </NavLink>
          </Logo>
          {location && (
            <p>
              <LocationOn
                style={{
                  fontSize: "20px",
                  color: "#29d0ba",
                  position: "absolute",
                  left: "-25px",
                }}
              />
              location: {location}
            </p>
          )}
          {!location && <p>Finding your location...</p>}
        </Left>
        <Right>
          <h3
            style={{ color: "#4a4a4a", fontWeight: "450", marginRight: "10px" }}
          >
            Hello, {user.name} {user.lname}
          </h3>
          <SearchContainer>
            <Input
              placeholder="Search"
              type="text"
              onKeyDown={handleKeyDown}
              value={searchedValue}
              onChange={(e) => setSearchedValue(e.target.value)}
            />
            <NavLink
              style={{ position: "absolute", right: "0", top: "0" }}
              to={`/search/${searchedValue}`}
            >
              <Search id="search_icon" />
            </NavLink>
          </SearchContainer>

          <NavLink
            style={{ textDecoration: "none", color: "black" }}
            to="/cart"
          >
            <MenuItem>
              <Badge badgeContent={cart.quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </NavLink>
          {user ? (
            <MenuItem onClick={handleLogout}>
              <Logout />
            </MenuItem>
          ) : (
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to="/login"
            >
              <MenuItem>
                <b>SIGN IN</b>
              </MenuItem>
            </NavLink>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
