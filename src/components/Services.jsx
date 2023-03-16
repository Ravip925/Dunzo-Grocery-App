import styled from "styled-components";
import { mobile } from "../Responsive";

const Container = styled.div`
  width: 100%;
  height: 475px;
  background-color: #ffff;
  display: grid;
  place-items: center;
  ${mobile({
    height: "360px",
    overflowX: "hidden",
  })}
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem 1.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 50px;
  ${mobile({
    padding: "1rem",
    gap: "30px",
  })}
`;
const Top = styled.div`
  h3 {
    font-family: "ubuntu";
    font-style: normal;
    font-weight: 800;
    font-size: 28px;
    line-height: 42px;
    color: rgb(15, 25, 56);
    ${mobile({
      fontSize: "24px",
      lineHeight: "35px",
    })}
  }
`;
const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mobile({
    flexWrap: "wrap",
    gap: "12px",
  })}
`;

const Boxes = styled.div`
  width: 22%;
  height: 180px;
  border-radius: 8px;
  background-color: burlywood;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
  ${mobile({
    width: "165px",
    height: "110px",
  })}
`;

const Services = () => {
  return (
    <Container>
      <Wrapper>
        <Top>
          <h3>Our Services</h3>
          <hr
            style={{
              width: "50px",
              height: "4px",
              backgroundColor: "rgb(37, 211, 102)",
              border: "none",
              borderRadius: "10px",
              display: "inline-block",
            }}
          />
          <hr
            style={{
              width: "20px",
              height: "4px",
              backgroundColor: "rgb(37, 211, 102)",
              border: "none",
              borderRadius: "10px",
              display: "inline-block",
              marginLeft: "6px",
            }}
          />
        </Top>
        <Center>
          <Boxes url="https://ik.imagekit.io/dunzo/web-assets/images/d4b.jpg?tr=w-488,h-326,cm-pad_resize"></Boxes>
          <Boxes url="https://ik.imagekit.io/dunzo/web-assets/images/grocery.jpg?tr=w-488,h-326,cm-pad_resize"></Boxes>
          <Boxes url="https://ik.imagekit.io/dunzo/web-assets/images/restaurants.jpg?tr=w-488,h-326,cm-pad_resize"></Boxes>
          <Boxes url="https://ik.imagekit.io/dunzo/web-assets/images/send-packages.jpg?tr=w-488,h-326,cm-pad_resize"></Boxes>
        </Center>
      </Wrapper>
    </Container>
  );
};

export default Services;
