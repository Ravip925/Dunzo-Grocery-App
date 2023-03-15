import { Discount } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./NavBar";
import "animate.css";
import { mobile } from "../Responsive";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  padding: 0 5rem;
  place-items: center;
  background-color: aliceblue;
  ${mobile({
    padding: "0 1rem",
    height: "auto",

  })}
`;
const Wrapper = styled.div`
  width: 100%;
  height: auto;
  margin-top: 70px;
  padding: 3rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 50px;
  position: relative;
  ${mobile({
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "5rem 0",
  })}

  h1 {
    position: absolute;
    top: -3rem;
    font-weight: 400;
    color: #8e8e8eae;
    ${mobile({
      top: "1.5rem",
      fontSize: "1.5rem",
    })}
  }
`;
const Discounts = styled.div`
  width: 100px;
  height: 25px;
  font-size: 0.7rem;
  border-bottom-left-radius: 25px;
  background-color: #ffb84c;
  position: absolute;
  top: 0px;
  right: 0;
  color: red;
  padding: 6px 5px 5px 25px;
`;

const ProductsNotFound = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  ${mobile({
    width: "100%",
    height: "75vh",
  })}
`;
const Image = styled.div`
  width: 50%;
  height: 300px;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
  ${mobile({
    width: "100%",
    height: "250px",
  })}
`;
const SearchedProducts = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const search = location.pathname.split("/")[2];

  useEffect(() => {
    if (search !== "") {
      publicRequest
        .get(`/products/search/${search}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [search]);
  return (
    <>
      <NavBar />
      <Container>
        <Wrapper>
          <h1>Searched Products:</h1>
          {products.length !== 0 ? (
            products.map((items) => (
                <Card
                  className="animate__animated animate__zoomInDown"
                  key={items._id}
                  sx={{
                    minWidth: 260,
                    maxWidth: 260,
                    borderRadius: 2,
                    position: "relative",
                    paddingBottom: "1rem",
                    boxShadow: "18px 18px 20px rgba(0, 0, 0, 0.2)",
                    ...(() => {
                      if (window.innerWidth <= 600) {
                        return {
                          maxWidth: 300,
                          minWidth: 300,
                        };
                      } else {
                        return {};
                      }
                    })(),
                  }}
                >
                  <Discounts>
                    <b>{items.discount}% OFF</b>{" "}
                    <Discount
                      style={{
                        fontSize: "0.95rem",
                        position: "absolute",
                        right: "10px",
                      }}
                    />
                  </Discounts>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    sx={{ backgroundSize: "cover" }}
                    image={items.img}
                  />
                  <CardContent>
                    <Typography
                      sx={{
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        fontSize: "1.1rem",
                        lineHeight: "28px",
                        textOverflow: "ellipsis",
                      }}
                      gutterBottom
                      variant="h6"
                      component="div"
                    >
                      {items.name.substring(0, 42)}
                      <span style={{ color: "#4a4a4a", fontSize: "0.8rem" }}>
                        ...
                      </span>
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "Montserrat", fontWeight: "500" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {items.category}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <NavLink to={`/product/${items._id}`}>
                      <Button
                        sx={{
                          width: "85px",
                          color: "white",
                          backgroundColor: "#52ff42",
                          borderRadius: "30px",
                          "&.MuiButtonBase-root:hover": {
                            bgcolor: "#6afe5d",
                          },
                        }}
                        size="small"
                      >
                        Explore
                      </Button>
                    </NavLink>
                    <Button sx={{ cursor: "auto" }} size="small">
                      ₹ {items.price}
                    </Button>
                    <Button sx={{ color: "gray", cursor: "auto" }} size="small">
                      {items.quantity[0]}
                    </Button>
                  </CardActions>
                </Card>
            ))
          ) : (
            <ProductsNotFound>
              <Image url="https://jetmartindia.com/images/no-product-found.png"></Image>
            </ProductsNotFound>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

export default SearchedProducts;
