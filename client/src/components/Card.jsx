import styled from 'styled-components';
import { Link } from "react-router-dom";
import moment from "moment";
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const Container = styled.div`
    width: ${(props) => props.type !== "sm" && "360px"};
    margin-bottom: ${(props) => props.type === "sm" ? "10px" : "45px"};
    cursor: pointer;
    display: ${(props) => props.type === "sm" && "flex"};
    gap: 10px;
`;

const Video = styled.video`
     width: 100%;
    height: ${(props) => props.type === "sm" ? "120px" : "202px"};
    background-color: #999;
    flex: 1;
    object-fit: cover;
`

const Image = styled.img`
    width: 100%;
    height: ${(props) => props.type === "sm" ? "120px" : "202px"};
    background-color: #999;
    flex: 1;
    object-fit: cover;
`;

const Details = styled.div`
    display: flex;
    margin-top: ${(props) => props.type !== "sm" && "16px"};
    gap: 12px;
    flex: 1;
`;

const ChannelImage = styled.img`
    width: 36px;
    height: 36px;
    object-fit: cover;
    border-radius: 50%;
    background-color: #999;
    display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`
    
`;

const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
    margin: 9px 0;
`;

const Info = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
    const [user, setUser] = useState({});
    const [hover, setHover] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}users/find/${video.userId}`);
            setUser(res.data);
        };
        getUser();
    }, [video.userId]);

    const increaseViews = async (id) => {
        await axios.put(`${process.env.REACT_APP_BASE_URL}videos/view/${id}`);
    };

    return (
        <Link to={`/video/${video._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <Container
                type={type}
                onMouseEnter={(e) => setHover(true)}
                onMouseLeave={(e) => setHover(false)}
                onClick={() => increaseViews(video._id)}
            >
                {hover ? (
                    <Video type={type} autoPlay src={video.videoUrl} />
                ) : (

                    <Image type={type} src={video.imgUrl} />
                )}
                <Details type={type}>
                    <ChannelImage
                        type={type}
                        src={user?.img ? user.img : "https://ih1.redbubble.net/image.399793925.2011/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg"}
                    />
                    <Texts>
                        <Title>{video.title}</Title>
                        <ChannelName>{user?.name}</ChannelName>
                        <Info>{video.views} veiws • {moment(video.createdAt).fromNow()}</Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    )
}

export default Card