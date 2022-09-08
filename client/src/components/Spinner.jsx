import { MoonLoader } from "react-spinners";
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div``;

const Spinner = ({ message }) => {
  return (
    <Container>
      <MoonLoader color="#ffffff" size={50} />
      <Text style={{ color: "white", marginTop: "10px" }}>
        {message}
      </Text>
    </Container>
  )
}

export default Spinner