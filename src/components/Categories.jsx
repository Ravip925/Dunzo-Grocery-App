import styled from "styled-components";
import { NavLink } from "react-router-dom";
import "animate.css";
import { mobile } from "../Responsive";

const Container = styled.div`
  width: 100%;
  height: 475px;
  background-color: #e3fdfd;
  display: grid;
  place-items: center;
  ${mobile({
    height: "auto",
  })}
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column;
  ${mobile({
    padding: "0 1rem",
  })}
`;
const Top = styled.div`
  ${mobile({
    margin: "1.5rem 0",
    textAlign: "center",
  })}
`;
const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  ${mobile({
    width: "100%",
    height: "250px",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: "20px",
  })}
`;
const Bottom = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  ${mobile({
    height: "160px",
    flexDirection: "column",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: "1rem",
  })}
`;
const Boxes = styled.div`
  width: 244px;
  height: 180px;
  border-radius: 8px;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
  ${mobile({
    width: "158px",
    height: "115px",
  })}
`;

const Box = styled.div`
  width: 170px;
  height: 135px;
  padding: 1rem;
  border-radius: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
  ${mobile({
    width: "100px",
    height: "130px",
  })}
`;
const Items = styled.div`
  width: 60px;
  height: 60px;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
  ${mobile({
    width: "50px",
    height: "50px",
  })}
`;

const Categories = () => {
  return (
    <Container>
      <Wrapper>
        <Top>
          <h3>Essentials delivered to your doorstep</h3>
        </Top>
        <Center>
          <NavLink to={`/products/Fruits and Vegetables`}>
            <Boxes
              className="animate__animated animate__fadeInLeft"
              id="catBoxes"
              url="https://ik.imagekit.io/dunzo/home/tr:w-488,h-360_home_icon/dunzo/icons/newHome/promoBanner/kitImageUrl/largeIcons/default_fnv_secondary2_1613527515094.png"
            ></Boxes>
          </NavLink>
          <NavLink to={`/products/Foodgrains, Oil & Masala`}>
            <Boxes
              className="animate__animated animate__fadeInLeft"
              id="catBoxes"
              url="https://i.ibb.co/HG15htV/Foodgrains.png"
            ></Boxes>
          </NavLink>
          <NavLink to={`/products/Cleaning & Household`}>
            <Boxes
              className="animate__animated animate__fadeInRight"
              id="catBoxes"
              url="https://i.ibb.co/PZFGgBF/Cleaning-Household.png"
            ></Boxes>
          </NavLink>
          <NavLink to={`/products/Bakery, Cakes & Dairy`}>
            <Boxes
              className="animate__animated animate__fadeInRight"
              id="catBoxes"
              url="https://i.ibb.co/ykzjFG9/Bakery.png"
            ></Boxes>
          </NavLink>
        </Center>
        <Bottom>
          <NavLink to={`/products/Eggs, Meat & Fish`}>
            <Box>
              <Items url="https://ik.imagekit.io/dunzo/home/tr:w-80,h-80_home_icon/icons/R4_Icons/Home/default_meat_tertiary_grid_1609739765849.png"></Items>
              <p>Meat and fish</p>
            </Box>
          </NavLink>
          <NavLink to={`/products/Pet Food & Accessories`}>
            <Box>
              <Items url="https://ik.imagekit.io/dunzo/home/tr:w-80,h-80_home_icon/icons/R4_Icons/Home/default_pets_tertiary_grid_1609739755734.png"></Items>
              <p>Pet's Food</p>
            </Box>
          </NavLink>
          <Box>
            <Items url="https://resources.dunzo.com/web-assets/prod/_next/static/images/dumo-medical-stores-2365362fd2f0f67c8c56967b0de56e56.png"></Items>
            <p>Medical Supplies</p>
          </Box>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Categories;
