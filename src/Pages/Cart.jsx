import { Add, Remove } from "@mui/icons-material";
import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import { mobile } from "../Responsive";
import "animate.css";
import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../redux/cartRedux";
import { userRequest } from "../requestMethods";

const Container = styled.div`
  ${mobile({
    width: "100%",
    height: "auto",
  })}
`;
const Wrapper = styled.div`
  padding: 20px;
  height: 700px;
  background-color: aliceblue;
  margin-top: 70px;

  ${mobile({
    padding: "1rem",
    height: "auto",
  })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ justifyContent: "center" })}
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  background-color: transparent;
  border: 3px solid teal;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 25px;
  ${mobile({
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
  })}
`;
const CartProduct = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
`;
const Info = styled.div`
  margin: 10px 0px;
  padding: 1rem;
  height: 530px;
  overflow-y: scroll;
  ${mobile({ padding: "1rem" })}
`;
const Product = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 1rem 0;
  margin: 15px 0;
  justify-content: space-between;
  background-color: #ffffff;
  &:hover {
    box-shadow: 0 0 10px 4px #c3c3c3ce;
  }

  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Image = styled.img`
  width: 20%;
  ${mobile({ width: "50%", alignSelf: "center" })}
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span`
  font-size: 20px;
  ${mobile({ marginBottom: "20px" })}
`;
const ProductQnt = styled.span`
  ${mobile({ marginBottom: "20px" })}
`;

const PriceDetail = styled.span`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px 15px;

  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

  ${mobile({ margin: "20px" })}
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.4);
  border-radius: 10px;
  padding: 10px;
  height: 370px;
  margin-top: 10px;
  background-color: white;

  p {
    text-align: center;
    margin-top: 8px;
    color: red;
  }

  ${mobile({
    padding: "20px",
    marginBottom: "40px",
    width: "100%",
    height: "390px",
    marginLeft: "0px",
  })}
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && 500};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const RemoveItem = styled.h2`
  margin-top: 15px;
  color: #e91515;
  cursor: pointer;
`;
const Button = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 40px;
  border: none;
  display: flex;
  align-items: center;
  font-family: inherit;
  font-weight: 500;
  font-size: 16px;
  padding: 0.7em 1.4em 0.7em 1em;
  color: white;
  background: #ad5389;
  background: linear-gradient(0deg, #ff2222 0%, #fb7575 100%);
  border: none;
  box-shadow: 0 0.4em 1.5em -0.5em #ff1717;
  letter-spacing: 0.05em;
  border-radius: 20em;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    box-shadow: 0 0.5em 1.5em -0.5em #14a73e98;
  }

  &:active {
    box-shadow: 0 0.3em 1em -0.5em #14a73e98;
  }
`;
const SummaryItemPrice = styled.span``;
const SummaryItemText = styled.span``;
const SummaryButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
const key = process.env.REACT_APP_RAZORPAY_KEY;

const Cart = () => {
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const checkoutHandler = async (amount) => {
    const {
      data: { order },
    } = await userRequest
      .post("/checkout/payment", {
        amount,
      })
      .catch((err) => setErr(err.message));
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Dunzo",
      description: "Order Groceries",
      image:
        "https://resources.dunzo.com/web-assets/prod/_next/static/images/logo-footer-9f5c4da498fff7fcbead38344d855d20.png",
      order_id: order.id,
      callback_url: "http://localhost:8000/api/checkout/paymentverification",
      prefill: {
        name: "Ravi Patil",
        email: "ravipatil@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Container>
      <NavBar />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <NavLink style={{ textDecoration: "none" }} to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </NavLink>
          <TopTexts>
            <TopText>
              Cart Items <b style={{ color: "blue" }}>{cart.quantity}</b>
            </TopText>
          </TopTexts>
        </Top>
        {/* {cart.quantity===0? <IsCartEmpty>YOUR CART IS EMPTY !!</IsCartEmpty>:null} */}
        <Bottom>
          <CartProduct>
            <Info>
              {cart.products.map((item) => (
                <Product
                  className="animate__animated animate__backInLeft"
                  key={item._id}
                >
                  <ProductDetail>
                    <Image src={item.img} alt="cover" />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {item.name}
                      </ProductName>
                      <ProductQnt>
                        <b style={{ color: "#878787" }}>
                          {item.weightQuantity}
                        </b>
                      </ProductQnt>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Remove
                        onClick={() => dispatch(decrementQuantity(item._id))}
                        style={{ cursor: "pointer" }}
                      />
                      <ProductAmount>
                        <b>{item.Qnt}</b>
                      </ProductAmount>
                      <Add
                        onClick={() => dispatch(incrementQuantity(item._id))}
                        style={{ cursor: "pointer" }}
                      />
                    </ProductAmountContainer>
                    <ProductPrice>
                      ₹ {item.productPrice * item.Qnt}
                    </ProductPrice>
                    <RemoveItem>
                      <Button onClick={() => dispatch(removeItem(item))}>
                        Remove
                      </Button>
                    </RemoveItem>
                  </PriceDetail>
                </Product>
              ))}
            </Info>
          </CartProduct>
          <Summary className="animate__animated animate__zoomIn">
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>
                ₹ {cart.total === 0 ? "0" : "60"}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>
                -₹ {cart.total === 0 ? "0" : "60"}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryButton onClick={() => checkoutHandler(cart.total)}>
              CHECKOUT NOW
            </SummaryButton>
            {err && <p>{err}</p>}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
