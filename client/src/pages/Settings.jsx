import styled from "styled-components";
import ConstructionIcon from '@mui/icons-material/Construction';

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${({ theme }) => theme.text};
`;

const Settings = () => {
    return (
        <Container>
            Settings is currently under construction.
            <ConstructionIcon />
        </Container>
    )
}

export default Settings