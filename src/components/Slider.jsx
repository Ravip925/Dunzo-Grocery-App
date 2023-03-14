import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { sliderItems } from "../assets/data";
import { mobile } from "../Responsive";
import "animate.css";

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "25px"};
  right: ${(props) => props.direction === "right" && "5px"};
  margin: auto;
  cursor: pointer;
  opacity: 0;
  z-index: 2;
  transition: 0.2s all;
`;
const Container = styled.div`
  width: 100%;
  height: 480px;
  display: flex;
  position: relative;
  overflow: hidden;
  &:hover ${Arrow} {
    opacity: 0.8;
  }
  ${mobile({
    height: "210px",
    margin: "0",
  })}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.7s ease-in-out;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;
const Slide = styled.div`
  width: 100vw;
  height: 75vh;
  padding: 2rem 1.5rem;

  ${mobile({
    height: "210px",
    padding: "20px",
  })}

  .slider_container {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    display: flex;
    align-items: center;
  }
`;

const Center = styled.div`
  flex: 1;
  height: 100%;
  border-radius: 8px;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: cover;
  ${mobile({
    borderRadius: "10px",
  })};
`;

const Slider = ({ screenWidth }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(slideIndex + 1);
      if (slideIndex === 2) {
        clearInterval(interval);
        setSlideIndex(0);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [slideIndex]);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container className="animate__animated animate__fadeInUpBig">
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowBackIos sx={{ fontSize: "3rem" }} />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <NavLink to={`/products/${item.category}`}>
            <Slide key={item.id}>
              <div className="slider_container">
                <Center url={item.img} isScreenWidth={screenWidth}></Center>
              </div>
            </Slide>
          </NavLink>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowForwardIos sx={{ fontSize: "3rem" }} />
      </Arrow>
    </Container>
  );
};

export default Slider;
