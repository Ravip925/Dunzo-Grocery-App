import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../Responsive";

const Container = styled.div`
  margin-top: 70px;
  width: 100%;
  height: 70px;
  padding: 0 1.5rem;
  display: grid;
  place-items: center;
  background-color: #ffeaa7;
  box-shadow: 0px 10px 10px -8px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 12;
  ${mobile({
    height: "80px",
  })}
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;
const Left = styled.div`
  width: 60px;
  height: 100%;
  display: flex;
  align-items: center;
`;
const Right = styled.div`
  h4 {
    line-height: 28px;
    ${mobile({
      lineHeight: "20px",
    })}
  }
`;
const Box = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-image: url("https://ik.imagekit.io/dunzo/dunzo-catalog-prod/tr:w-$w$,h-$h$,cm-pad_resize_store_thumbnail/stores/YTJucjlTZGxRMnN0bGZBMzRTK0RFUT09-1591200867005-store_image.jpg");
  background-size: cover;
`;

const Style = {
  fontSize: "1.3rem",
};

const CatBar = ({ product, isProductPage }) => {
  const [state, setState] = useState("");
  useEffect(() => {
    setState(product);
  }, [product]);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Box></Box>
        </Left>
        <Right>
          {isProductPage && <h4>{state?.name}</h4>}
          <h5 style={isProductPage ? { fontWeight: "450" } : Style}>
            {state?.category}
          </h5>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default CatBar;
