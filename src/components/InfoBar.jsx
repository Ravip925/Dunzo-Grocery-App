import { KeyboardArrowRight } from "@mui/icons-material";
import styled from "styled-components";
import "animate.css";
import { mobile } from "../Responsive";

const Container = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 70px;
  display: grid;
  place-items: center;
  background: rgb(6, 6, 17);
  background: linear-gradient(
    90deg,
    rgba(6, 6, 17, 1) 0%,
    rgba(15, 13, 51, 1) 26%,
    rgba(24, 24, 87, 1) 50%,
    rgba(2, 31, 160, 1) 100%
  );
  ${mobile({
    height: "40px",
  })}
`;
const Wrapper = styled.div`
  padding: 0 1.5rem;
  width: 100%;
  height: 50px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({
    height: "40px",
    padding: "0 1rem",
    gap: "10px",
  })}
`;

const Left = styled.div`
  flex: 1.5;
  display: flex;
  align-items: center;
  gap: 15px;
  text-overflow: ellipsis;
  h5 {
    ${mobile({
      fontSize: "0.45rem",
      textOverflow: "ellipsis",
      fontWeight: "500",
    })}
  }
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  h5 {
    margin-right: "12px";
    ${mobile({
      fontSize: "0.45rem",
      textOverflow: "ellipsis",
      fontWeight: "500",
      margin: "0",
    })}
  }
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  margin-left: -15px;

  ${mobile({
    width: "40px",
    height: "40px",
  })}
`;
const InfoBar = () => {
  return (
    <Container className="animate__animated animate__fadeInLeftBig">
      <Wrapper>
        <Left>
          <Image
            src="https://resources.dunzo.com/web-assets/prod/_next/static/images/paan-3514c1ca4be5af789addd127f4c24308.png"
            alt="cover"
          ></Image>
          <h5>
            Order Paan items, munchies and much more on our new Dunzo Mo app
          </h5>
        </Left>
        <Right>
          <h5
            style={{
              position: "relative",
              color: "#1FAB89",
            }}
          >
            Download Dunzo Mobile app now{" "}
            <KeyboardArrowRight
              style={{
                position: "absolute",
                top: "-3px",
                ...(() => {
                  if (window.innerWidth <= 480) {
                    return {
                      display: "none",
                    };
                  } else {
                    return {};
                  }
                })(),
              }}
            />
          </h5>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default InfoBar;
