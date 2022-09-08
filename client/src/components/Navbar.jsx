import styled from "styled-components"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { useState } from "react";
import Upload from "./Upload";

const Container = styled.div`
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => theme.bgLighter};
    height: 56px;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    padding: 0 20px;
    position: relative;
`;

const Search = styled.div`
    width: 50%;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
    width: 100%;
    border: none;
    background-color: transparent;
    color: ${({ theme }) => theme.text};
    &:focus {
        outline: none;
    }
`;

const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ae6ff;
    color: #3ae6ff;
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    &:hover {
        background-color: #585858;
    }
`;

const User = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
    border-radius: 50%;
    &:hover {
        background-color: #585858;
    }
`;

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const { currentUser } = useSelector(state => state.user);

    return (
        <>
            <Container>
                <Wrapper>
                    <Search>
                        <Input
                            placeholder="Search..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <SearchOutlinedIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/search?q=${searchTerm}`)}
                        />
                    </Search>
                    {currentUser ? (
                        <>
                            <User>
                                <Icon>
                                    <VideoCallOutlinedIcon
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setOpen(true)}
                                    />
                                </Icon>
                                <Avatar
                                    src={currentUser?.img ? currentUser?.img : "https://ih1.redbubble.net/image.399793925.2011/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg"}
                                />
                                {currentUser.name}
                            </User>
                        </>
                    ) : (
                        <Link to="signin" style={{ textDecoration: "none" }}>
                            <Button>
                                <AccountCircleOutlinedIcon />
                                SIGN IN
                            </Button>
                        </Link>
                    )}
                </Wrapper>
            </Container>
            {open && (
                <Upload setOpen={setOpen} />
            )}
        </>
    )
}

export default Navbar