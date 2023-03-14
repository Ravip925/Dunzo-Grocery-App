import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Box = styled.div`
  width: 30%;
  height: 25vh;
  box-sizing: border-box;
  padding: 50px 0;
  border-radius: 20px;
  background-color: #00aaff;
  text-align: center;
`;

const Success = () => {
  const seachQuery = useSearchParams()[0];
  const history = useNavigate();
  const referenceNum = seachQuery.get("reference");

  useEffect(() => {
    const timeout = setTimeout(() => {
      history("/");
    }, 4000);

    return () => clearTimeout(timeout);
  }, [history]);

  return (
    <Container>
      <Box>
        <h1>Payment Successfull!</h1>
        <h3>🎉 Thank You 🎉</h3>
        <br />
        <h5>Ref. No. : {referenceNum}</h5>
      </Box>
    </Container>
  );
};

export default Success;
