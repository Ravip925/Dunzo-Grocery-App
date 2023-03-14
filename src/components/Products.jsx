import { Add, Discount } from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { removeItem } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";
import CatBar from "./CatBar";
import { useLayoutEffect } from "react";
import "animate.css";
import { mobile } from "../Responsive";

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 0 1.5rem;
  display: grid;
  place-items: center;
  background-color: aliceblue;
  ${mobile({
    padding: "0 1rem",
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
const Left = styled.div`
  flex: 0.5;
  height: 100%;
  padding: 1.8rem 0;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  color: #545454;

  div {
    ${mobile({
      display: "flex",
      gap: "25px",
    })}
  }
  ${mobile({
    flex: "1",
    justifyContent: "center",
    padding: "1.5rem 0 0 0",
  })}
`;
const Right = styled.div`
  flex: 1;
  height: 100%;
  padding: 1.5rem 2rem;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  gap: 27px;
  ${mobile({
    width: "100%",
    padding: "2rem 0rem",
  })}
`;
const Center = styled.div`
  flex: 1.2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  background-color: white;
  ${mobile({
    flex: "1",
  })}
`;
const Title = styled.h3`
  width: 100%;
  height: 80px;
  padding: 0;
  background-color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const ProductsContainer = styled.div`
  width: 100%;
  height: 600px;
  padding-bottom: 2rem;
  overflow-y: scroll;
`;
const ProductBox = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 1rem 0;
  position: relative;
  &:hover {
    position: relative;
    z-index: 10;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2),
      0px -10px 20px rgba(0, 0, 0, 0.2);
  }
  ${mobile({
    borderBottom: "1px solid",
    height: "auto",
  })}
`;
const Items = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    width: 130px;
    height: 35px;
    font-size: 0.8rem;
    border-bottom-left-radius: 25px;
    background-color: #ffb84c;
    position: absolute;
    top: 0px;
    right: 0;
    color: red;
    padding: 8px 5px 5px 25px;
  }
`;
const ProductImage = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(${(props) => props.url});
  background-size: cover;
  ${mobile({
    width: "100px",
    height: "100px",
  })}
`;

const Box = styled.div`
  flex: 1;
  height: 100%;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 15px;
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
    marginRight: "1rem",
  })}
`;
const SelectBox = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CartProductImg = styled.div`
  flex: 0.4;
  height: 140px;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
const Price = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
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
  height: 450px;
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
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  ${mobile({
    borderBottom: "1px solid",
  })}
`;

const ProductName = styled.div`
  flex: 0.6;
  height: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  h4 {
    color: #7c7c7c;
    font-family: "roboto";
    font-weight: 400;
  }
`;

const CheckOut = styled.div`
  width: 100%;
  padding: 1.5rem 2rem;
  -webkit-box-pack: justify;
  justify-content: space-between;
  cursor: pointer;
  white-space: nowrap;
  min-width: 140px;
  overflow: hidden;
  outline: none;
  color: rgb(255, 255, 255);
  background-color: #0080e9;
  height: 48px;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.2px;
  border-radius: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 55px;
`;

const Products = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cat = location.pathname.split("/")[2];
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [discountFilter, setDiscountFilter] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat ? `/products/${cat}` : "/products"
        );
        setProducts(res.data);
      } catch (error) {}
    };
    getProducts();
  }, [cat]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    setFilteredProducts(
      products.filter((items) => {
        if (!priceRange || priceRange === "All") {
          return true;
        } else {
          return items.price < parseInt(priceRange);
        }
      })
    );
  }, [products, priceRange]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((items) => {
        if (!discountFilter || discountFilter === "All") {
          return true;
        } else {
          return items.discount <= parseInt(discountFilter);
        }
      })
    );
  }, [discountFilter, products]);

  return (
    <>
      <CatBar product={products[0]} isProductPage={false} />
      <Container>
        <Wrapper>
          <Left className="animate__animated animate__fadeInDownBig">
            <h3>Filter Products</h3>
            <div>
              <SelectBox>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Price
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={(e) => setPriceRange(e.target.value)}
                    value={priceRange}
                    label="Price"
                  >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={30}>Below 30</MenuItem>
                    <MenuItem value={50}>Below 50</MenuItem>
                    <MenuItem value={100}>Below 100</MenuItem>
                    <MenuItem value={200}>Below 200</MenuItem>
                    <MenuItem value={500}>Below 500</MenuItem>
                  </Select>
                </FormControl>
              </SelectBox>

              <SelectBox>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Discount
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={discountFilter}
                    onChange={(e) => setDiscountFilter(e.target.value)}
                    label="Discount"
                  >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={5}>5%</MenuItem>
                    <MenuItem value={8}>8%</MenuItem>
                    <MenuItem value={12}>12%</MenuItem>
                    <MenuItem value={15}>15%</MenuItem>
                    <MenuItem value={20}>20%</MenuItem>
                  </Select>
                </FormControl>
              </SelectBox>
            </div>
          </Left>
          <Center className="animate__animated animate__fadeInUpBig">
            <Title>
              {products.map((item, index) => index < 1 && item.category)}
            </Title>
            <ProductsContainer>
              {filteredProducts.map((items) => (
                <NavLink key={items._id} to={`/product/${items._id}`}>
                  <ProductBox>
                    <Items
                      style={{
                        display: "grid",
                        placeItems: "center",
                        flex: "0.7",
                      }}
                    >
                      <ProductImage url={items.img}></ProductImage>
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
                      <Box>
                        <h3 style={{ fontSize: "1.1rem" }}>{items.name}</h3>
                        <h4 style={{ color: "#585858" }}>
                          {items.quantity[0]}
                        </h4>
                        <h4
                          style={{
                            color: "#585858",
                            fontFamily: "robotomono",
                            fontWeight: "350",
                          }}
                        >
                          Qnt: 1
                        </h4>
                      </Box>
                      <Box style={{ flex: "0.7" }}>
                        <h2 style={{ color: "#0040a7" }}>₹ {items.price}</h2>
                      </Box>
                    </Items>
                    <Items style={{ flex: "0.6" }}>
                      <p>
                        <b>{items.discount}% OFF</b>{" "}
                        <Discount
                          style={{ position: "absolute", right: "10px" }}
                        />
                      </p>
                      <Button>
                        <Add /> ADD
                      </Button>
                    </Items>
                  </ProductBox>
                </NavLink>
              ))}
            </ProductsContainer>
          </Center>
          <Right className="animate__animated animate__fadeInDownBig">
            <h2 style={{ color: "#3867d6" }}>Your Cart</h2>
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
                  {cart.products?.map((product) => (
                    <CartProduct key={product._id}>
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
                            boxShadow: "0",
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

export default Products;
