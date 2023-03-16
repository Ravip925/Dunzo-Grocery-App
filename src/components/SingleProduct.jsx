import { Add, Discount } from "@mui/icons-material";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import CatBar from "./CatBar";
import { addProduct, removeItem } from "../redux/cartRedux";
import Swal from "sweetalert2";
import "animate.css";
import "../App.css";
import { mobile } from "../Responsive";

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 0 1.5rem;
  display: grid;
  place-items: center;
  background-color: #dcffc3;
  ${mobile({
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
  ${mobile({
    flexDirection: "column",
  })}
`;
const Right = styled.div`
  flex: 1;
  height: 100%;
  padding: 1.5rem 2rem;
  background-color: #dcffc3;
  display: flex;
  flex-direction: column;
  gap: 27px;
  ${mobile({
    width: "100%",
    padding: "2rem 0rem",
  })}

  h2 {
    font-weight: 800;
    color: #3867d6;
  }
`;
const Center = styled.div`
  flex: 1.5;
  height: 95%;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  background-color: white;
  ${mobile({
    height: "100%",
    width: "100%",
  })}
`;
const Title = styled.h3`
  width: 100%;
  height: 80px;
  background-color: #dcffc3;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const ProductsContainer = styled.div`
  width: 100%;
  height: 400px;
  display: grid;
  place-items: center;
  position: relative;
  p {
    width: 125px;
    height: 30px;
    font-size: 0.8rem;
    border-bottom-left-radius: 25px;
    background-color: #ffb84c;
    position: absolute;
    top: 0px;
    right: 0;
    color: red;
    padding: 6px 5px 5px 25px;
  }

  ${mobile({
    padding: "0",
  })}
`;
const ProductBox = styled.div`
  width: 100%;
  height: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  margin-top: 15px;
`;
const Items = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  gap: 15px;
  padding-right: 1.5rem;
`;
const ProductImage = styled.div`
  width: 290px;
  height: 250px;
  margin: 0 1rem;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
  ${mobile({
    width: "150px",
    height: "150px",
    margin: "0",
  })}
`;

const Box = styled.div`
  flex: 1;
  height: 100%;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  ${mobile({
    padding: "0",
    marginTop: "2rem",
  })}

  h3 {
    ${mobile({
      fontSize: "1rem",
    })}
    h2 {
      ${mobile({})}
    }
  }
`;

const Button = styled.button`
  width: 80%;
  height: 40px;
  border-radius: 40px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  font-weight: 500;
  font-size: 16px;
  padding: 0.7em 1.4em 0.7em 1.1em;
  color: white;
  background: #ad5389;
  background: linear-gradient(
    0deg,
    rgba(20, 167, 62, 1) 0%,
    rgba(102, 247, 113, 1) 100%
  );
  border: none;
  box-shadow: 0 0.7em 1.5em -0.5em #14a73e98;
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
  ${mobile({
    margin: "0",
  })}
`;

const CartEmpty = styled.div`
  width: 100%;
  height: 300px;
  background-color: white;
  display: grid;
  place-items: center;

  h4 {
    font-size: 0.9rem;
    text-align: center;
    line-height: 28px;
  }
`;

const CartItems = styled.div`
  width: 100%;
  height: 350px;
  overflow-y: scroll;
`;
const EmptyImage = styled.div`
  width: 60%;
  height: 170px;
  background-image: url("https://resources.dunzo.com/web-assets/prod/_next/static/images/no-items-in-cart-961121d0aa2fa3f06b4bda1c7f93ae51.png");
  background-size: cover;
  background-position: center;
`;
const CartProduct = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem;
  background-color: white;
  display: flex;
  gap: 15px;
  justify-content: space-between;
  align-items: center;
  ${mobile({
    borderBottom: "1px solid",
    gap: "10px",
    padding: "0.8rem 0.4rem",
  })}
`;
const CartProductImg = styled.div`
  flex: 0.8;
  height: 140px;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  ${mobile({
    width: "80px",
    height: "100px",
  })}
`;
const Price = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const ProductName = styled.div`
  width: 180px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 15px;
  ${mobile({
    fontSize: "0.8rem",
    width: "120px",
  })}
  h4 {
    color: #7c7c7c;
    font-family: "roboto";
    font-weight: 400;
  }
`;

const CheckOut = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 1.5rem 2rem;
  -webkit-box-pack: justify;
  justify-content: space-between;
  cursor: pointer;
  white-space: nowrap;
  min-width: 140px;
  overflow: hidden;
  outline: none;
  color: rgb(255, 255, 255);
  background-color: rgb(0, 210, 144);
  height: 48px;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.2px;
  border-radius: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({
    width: "100%",
  })}
`;

const SingleProduct = () => {
  const [products, setProducts] = useState({});
  const cart = useSelector((state) => state.cart);
  const [weightQuantity, setWeightQuantity] = useState("");
  const dispatch = useDispatch();
  const [productPrice, setProductPrice] = useState();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    const calculatePrice = () => {
      let price = products.price;
      if (
        weightQuantity === "1 kg" ||
        weightQuantity === "1 L" ||
        weightQuantity === "200 Gm" ||
        weightQuantity === "18 pcs"
      ) {
        price /= 1;
      } else if (
        weightQuantity === "500 Gm" ||
        weightQuantity === "500 ml" ||
        weightQuantity === "100 Gm" ||
        weightQuantity === "12 pcs"
      ) {
        price /= 2;
      } else if (
        weightQuantity === "250 Gm" ||
        weightQuantity === "250 ml" ||
        weightQuantity === "50 Gm" ||
        weightQuantity === "6 pcs"
      ) {
        price /= 4;
      }
      return price;
    };
    setProductPrice(calculatePrice());
  }, [weightQuantity, products.price]);

  const handleClick = () => {
    if (weightQuantity === "") {
      Swal.fire({
        title: "Please Select Quantity",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOutDown",
        },
      });
      return;
    }
    dispatch(addProduct({ ...products, weightQuantity, productPrice }));
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <CatBar product={products} isProductPage={true} />
      <Container>
        <Wrapper>
          <Center className="animate__animated animate__fadeInDown">
            <Title>{products.category}</Title>
            <ProductsContainer>
              <ProductBox>
                <Items
                  style={{ display: "grid", placeItems: "center", flex: "0.7" }}
                >
                  <ProductImage url={products.img}></ProductImage>
                </Items>
                <Items
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "5px",
                  }}
                >
                  <Box style={{ marginTop: "2rem" }}>
                    <h3>{products.name}</h3>
                    <FormControl
                      id="select1"
                      size="small"
                      sx={{ mt: 2, minWidth: 120 }}
                    >
                      <Select
                        displayEmpty
                        value={weightQuantity ? weightQuantity : "select"}
                        defaultValue="select"
                        inputProps={{ "aria-label": "Without label" }}
                        onChange={(e) => setWeightQuantity(e.target.value)}
                      >
                        <MenuItem value={"select"} disabled>
                          Select
                        </MenuItem>
                        {products.quantity?.map((Quantity, index) => (
                          <MenuItem key={index} value={Quantity}>
                            {Quantity}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box style={{ flex: "0.7" }}>
                    <h2 style={{ color: "#0040a7" }}>₹ {productPrice}</h2>
                  </Box>
                </Items>
              </ProductBox>
              <p>
                <b>{products.discount}% OFF</b>{" "}
                <Discount
                  style={{
                    position: "absolute",
                    right: "10px",
                    fontSize: "1.2rem",
                  }}
                />
              </p>
              <Button onClick={handleClick}>
                <Add /> ADD
              </Button>
            </ProductsContainer>
          </Center>
          <Right className="animate__animated animate__fadeInDown">
            <h2>Your Cart</h2>
            {cart.quantity === 0 ? (
              <CartEmpty className="animate__animated animate__fadeInRightBig">
                <EmptyImage></EmptyImage>
                <h4 style={{ color: "#808080" }}>
                  Your cart is empty <br /> Add items to get started
                </h4>
              </CartEmpty>
            ) : (
              <div>
                <CartItems>
                  {cart.products.map((product) => (
                    <CartProduct
                      key={product._id}
                      className="animate__animated animate__fadeInLeftBig"
                    >
                      <CartProductImg url={product.img}></CartProductImg>
                      <ProductName>
                        <h3>{product.name}</h3>
                        <h4>{product.weightQuantity}</h4>
                        <h4>Qnt: {product.Qnt}</h4>
                      </ProductName>
                      <Price>
                        <h2 style={{ color: "#0040a7" }}>
                          ₹ {product.productPrice * product.Qnt}
                        </h2>
                        <Button
                          onClick={() => dispatch(removeItem(product))}
                          style={{
                            background:
                              "linear-gradient(0deg,#ff2222 0%, #fb7575 100%)",
                            paddingLeft: "1.5rem",
                            boxShadow: "0 0.4em 1.5em -0.5em #ff1717",
                          }}
                        >
                          Delete
                        </Button>
                      </Price>
                    </CartProduct>
                  ))}
                </CartItems>
                <NavLink to="/cart">
                  <CheckOut>
                    <h4>GO TO CART</h4>
                    <h4>₹ {cart.total}</h4>
                  </CheckOut>
                </NavLink>
              </div>
            )}
          </Right>
        </Wrapper>
      </Container>
    </>
  );
};

export default SingleProduct;
