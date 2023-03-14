import styled from "styled-components";
import { mobile } from "../Responsive";
import "../App.css";

const Container = styled.div`
  width: 100%;
  height: 650px;
  display: grid;
  place-items: center;
  padding: 0 1.5rem;
  background-color: rgb(23, 30, 48);

  ${mobile({
    padding: "0 1rem",
    height: "auto",
  })}
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 1rem 0;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  position: relative;
`;
const Top = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: white;
  gap: 20px;
  padding-top: 2rem;
`;
const Bottom = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding-top: 2rem;
  ${mobile({
    flexDirection: "column",
    paddingTop: "0rem",
  })}
`;
const Title = styled.h5`
  font-size: 18px;
  font-weight: 700;
  line-height: 20px;
  color: white;
`;
const Desc = styled.p`
  font-size: 15px;
  line-height: 25px;
  letter-spacing: normal;
  color: rgb(183, 186, 195);
  font-weight: 500;
`;
const Boxes = styled.div`
  padding: 0.5rem;
  width: 20%;
  height: 100%;
  div {
    ${mobile({
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      gap: "15px",
      padding: "0",
    })}
  }
  p {
    font-size: 15px;
    line-height: 32px;
    letter-spacing: normal;
    color: white;
    font-weight: 500;
  }
  ${mobile({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  })}
`;
const Hr = styled.hr`
  width: 100%;
  background-color: #e2e2e2;
`;
const Image = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
`;
const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Top>
          <Title style={{ fontSize: "16px" }}>
            You can’t stop time, but you can save it!
          </Title>
          <Desc>
            Living in the city, there is never enough time to shop for
            groceries, pick-up supplies, grab food and wade through traffic on
            the way back home. How about we take care of all of the above for
            you? What if we can give you all that time back? Send packages
            across the city and get everything from food, groceries, medicines
            and pet supplies delivered right to your doorstep. From any store to
            your door, just make a list and we’ll make it disappear. Just Dunzo
            It!
          </Desc>
        </Top>
        <Hr />
        <Bottom>
          <Boxes
            id="footer_icon"
            style={{
              width: "15%",
              padding: "1rem 0",
            }}
          >
            <Image url="https://resources.dunzo.com/web-assets/prod/_next/static/images/logo-footer-9f5c4da498fff7fcbead38344d855d20.png"></Image>
          </Boxes>
          <Boxes>
            <Title style={{ marginBottom: "20px" }}>Dunzo</Title>
            <div>
              <p>About</p>
              <p>Jobs</p>
              <p>Contact</p>
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
              <p>Dunzo for partner</p>
              <p>Dunzo for business</p>
            </div>
          </Boxes>
          <Boxes>
            <Title style={{ marginBottom: "20px" }}>SERVICEABLE CITIES</Title>
            <div>
              <p>Bangalore</p>
              <p>Pune</p>
              <p>Gurgaon</p>
              <p>Hyderabad</p>
              <p>Delhi</p>
              <p>Chennai</p>
              <p>Mumbai</p>
            </div>
          </Boxes>
          <Boxes>
            <Title style={{ marginBottom: "20px" }}>GET IN TOUCH</Title>
            <div>
              <p>Email</p>
              <p>Twitter</p>
              <p>Facebook</p>
              <p>Instagram</p>
              <p>Linkedin</p>
            </div>
          </Boxes>
          <Boxes
            style={{ width: "30%", display: "grid", placeItems: "center" }}
          >
            <Image
              style={{ width: "60%", height: "60%" }}
              url="https://resources.dunzo.com/web-assets/prod/_next/static/images/footer-mascot-0a94653a7991194aa18773ec353d7fb6.png"
            ></Image>
          </Boxes>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Footer;
