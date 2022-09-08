import styled from 'styled-components'
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import ForestOutlinedIcon from '@mui/icons-material/ForestOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';

import LogoIcon from "../img/Logo.png";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';

const Container = styled.div`
    flex: 1;  
    min-width: max-content;
    height: 100vh;
    background-color: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.text};
    font-size: 14px;
    position: sticky;
    top: 0;
    overflow-y: scroll;
    ::-webkit-scrollbar {
    width: 12px;
}
`;

const Wrapper = styled.div`
    padding: 18px 26px;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
    margin-bottom: 25px;
`;

const Img = styled.img`
    height: 25px;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    padding: 7.5px 3px;
    border-radius: 3px;

    &:hover {
        background-color: ${({ theme }) => theme.soft};
    }
`;

const Hr = styled.hr`
    margin: 15px 0;
    color: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`

`;

const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ae6ff;
    color: #3ae6ff;
    border-radius: 3px;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    &:hover {
        background-color: #585858;
    }
`;

const Title = styled.h2`
    font-size: 14px;
    font-weight: 500;
    color: #aaaaaa;  
    margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMoode }) => {
    const { currentUser } = useSelector(state => state.user);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/signin")
    };

    const handleTags = (type) => {
        if (type === "music") {
            navigate("/search?tags=music");
        } else if (type === "sport") {
            navigate("/search?tags=sport");
        } else if (type === "food") {
            navigate("/search?tags=food");
        } else if (type === "nature") {
            navigate("/search?tags=nature");
        } else if (type === "fitness") {
            navigate("/search?tags=fitness");
        } else if (type === "gaming") {
            navigate("/search?tags=gaming");
        }
    };

    return (
        <Container>
            <Wrapper>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Logo>
                        <Img src={LogoIcon} />
                        MeTubeSharing
                    </Logo>
                </Link>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <HomeIcon />
                        Home
                    </Item>
                </Link>
                <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <ExploreOutlinedIcon />
                        Explore
                    </Item>
                </Link>
                {currentUser && (
                    <Link to="subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
                        <Item>
                            <SubscriptionsOutlinedIcon />
                            Subscriptions
                        </Item>
                    </Link>
                )}
                <Hr />
                {currentUser && (
                    <>
                        <Link to="saved" style={{ textDecoration: "none", color: "inherit" }}>
                            <Item>
                                <VideoLibraryOutlinedIcon />
                                Saved
                            </Item>
                        </Link>
                        <Hr />
                    </>
                )}
                {!currentUser && (
                    <>
                        <Login>
                            Sign in to like videos,<br />
                            comment,<br />
                            and subscribe.
                            <Link to="signin" style={{ textDecoration: "none" }}>
                                <Button>
                                    <AccountCircleOutlinedIcon />
                                    SIGN IN
                                </Button>
                            </Link>
                        </Login>
                        <Hr />
                    </>
                )}
                <Title>BEST OF METUBE</Title>
                <Item onClick={() => handleTags("music")}>
                    <LibraryMusicOutlinedIcon />
                    Music
                </Item>
                <Item onClick={() => handleTags("sport")}>
                    <SportsBasketballOutlinedIcon />
                    Sports
                </Item>
                <Item onClick={() => handleTags("gaming")}>
                    <SportsEsportsOutlinedIcon />
                    Gaming
                </Item>
                <Item onClick={() => handleTags("food")}>
                    <FastfoodOutlinedIcon />
                    Food
                </Item>
                <Item onClick={() => handleTags("nature")}>
                    <ForestOutlinedIcon />
                    Nature
                </Item>
                <Item onClick={() => handleTags("fitness")}>
                    <FitnessCenterOutlinedIcon />
                    Fitness
                </Item>
                <Hr />
                <Link to="settings" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <SettingsOutlinedIcon />
                        Settings
                    </Item>
                </Link>
                <Link to="questions" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <HelpOutlineOutlinedIcon />
                        Questions
                    </Item>
                </Link>
                <Item onClick={() => setDarkMoode(!darkMode)}>
                    <SettingsBrightnessOutlinedIcon />
                    {darkMode ? "Dark Mode" : "Light Mode"}
                </Item>
                <Hr />
                {currentUser && (
                    <Item onClick={handleLogout}>
                        <LogoutIcon />
                        Logout
                    </Item>
                )}
            </Wrapper>
        </Container>
    )
}

export default Menu