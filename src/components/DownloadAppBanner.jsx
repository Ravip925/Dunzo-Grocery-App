import styled from "styled-components";
import "animate.css";
import { mobile } from "../Responsive";

const Container = styled.div`
  width: 100%;
  height: 164px;
  padding: 0 1.5rem;
  background-color: aliceblue;
  display: grid;
  place-items: center;
  ${mobile({
    height: "430px",
    padding: "0 1rem",
    overflowX: "hidden",
  })}
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: relative;
`;
const Left = styled.div`
  flex: 1;
  height: 100%;
  position: relative;
  ${mobile({
    flex: "0",
    position: "static",
  })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  ${mobile({
    flex: "1",
    marginLeft: "-1rem",
    marginTop: "-16rem",
    alignItems: "center",
    textAlign: "center",
  })}
`;
const Box = styled.div`
  width: 205px;
  height: 237px;
  position: absolute;
  top: -73px;
  right: 0;
  background-image: url("https://resources.dunzo.com/web-assets/prod/_next/static/images/dunzo-daily-app-preview-7c97560e963bcd173c11c470b2ff63ed.png");
  background-size: cover;
  ${mobile({
    top: "193px",
    left: "21%",
  })}
`;

const Boxes = styled.div`
  flex: 1;
`;
const Title = styled.h3`
  line-height: 28px;
  ${mobile({
    fontSize: "14px",
    lineHeight: "25px",
  })}
`;
const Items = styled.div`
  width: 120px;
  height: 36px;
  border-radius: 44px;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
`;

const DownloadAppBanner = () => {
  return (
    <Container>
      <Wrapper className="animate__animated animate__fadeInLeftBig">
        <Left>
          <Box></Box>
        </Left>
        <Right>
          <Boxes>
            <Title>All this from the convenience of your phone.</Title>
            <Title style={{ fontWeight: 550 }}>
              Download the Dunzo mobile app.
            </Title>
          </Boxes>
          <Boxes style={{ display: "flex", gap: "10px" }}>
            <Items url="https://resources.dunzo.com/web-assets/prod/_next/static/images/playstore-ee5b43e66d1583a6066423fb42fb69d8.svg"></Items>
            <Items url="https://resources.dunzo.com/web-assets/prod/_next/static/images/appstore-078da620a293bb95473ae21624a55872.svg"></Items>
          </Boxes>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default DownloadAppBanner;
