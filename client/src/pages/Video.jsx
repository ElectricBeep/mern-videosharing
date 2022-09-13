import styled from "styled-components"
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { removeSavedVideo, saveVideo, subscribe } from "../redux/userSlice";
import moment from "moment";
import Recommendation from "../components/Recommendation";

const Container = styled.div`
    display: flex;
    gap: 24px;
`;

const Content = styled.div`
    flex: 5;
`;

const VideoWrapper = styled.div`

`;

const Title = styled.h1`
    font-size: 18px;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Info = styled.span`
    color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
    display: flex;
    gap: 20px;
    color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    padding: 3px 5px;
    border-radius: 5px;
    &:hover {
        background-color: ${({ theme }) => theme.soft};
    }
`;

const Hr = styled.hr`
    margin: 15px 0;
    border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ChannelInfo = styled.div`
    display: flex;
    gap: 20px;
`;

const Image = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
`;

const ChannelDetail = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
    font-weight: 500;
`;

const ChannelCounter = styled.span`
    margin-top: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color: ${({ theme }) => theme.textSoft};
`;

const Description = styled.p`
    font-size: 14px;
`;

const Subscribe = styled.button`
    background-color: #cc1a00;
    font-weight: 500;
    color: #fff;
    border: none;
    border-radius: 3px;
    height: max-content;
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
        background-color: #cc1b00c0;
    }
`;

const VideoFrame = styled.video`
    max-height: 720px;
    width: 100%;
    object-fit: cover;
`;

const Video = () => {
    const [channel, setChannel] = useState({});

    const { currentUser } = useSelector(state => state.user);
    const { currentVideo } = useSelector(state => state.video);

    const dispatch = useDispatch();

    const path = useLocation().pathname.split("/")[2];

    //Get video and user who posted it
    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoRes = await axios.post(`${process.env.REACT_APP_BASE_URL}/videos/find/${path}`);
                const channelRes = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/find/${videoRes.data.userId}`);

                setChannel(channelRes.data);
                dispatch(fetchSuccess(videoRes.data));
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [path, dispatch]);

    //For liking
    const handleLike = async () => {
        await axios.put(`${process.env.REACT_APP_BASE_URL}/users/like/${currentVideo._id}`, {
            userId: currentUser._id
        });
        dispatch(like(currentUser._id));
    };

    //For disliking
    const handleDislike = async () => {
        await axios.put(`${process.env.REACT_APP_BASE_URL}/users/dislike/${currentVideo._id}`, {
            userId: currentUser._id
        });
        dispatch(dislike(currentUser._id));
    };

    //For subscribing
    const handleSubscribe = async () => {
        currentUser.subscribedUsers.includes(channel._id) ? (
            await axios.put(`${process.env.REACT_APP_BASE_URL}/users/unsub/${channel._id}`, {
                userId: currentUser._id
            })
        ) : (
            await axios.put(`${process.env.REACT_APP_BASE_URL}/users/sub/${channel._id}`, {
                userId: currentUser._id
            })
        )
        dispatch(subscribe(channel._id));
    };

    //Save video
    const handleSaveVideo = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_BASE_URL}/users/save/${currentVideo._id}`, {
                userId: currentUser._id
            });
            dispatch(saveVideo(currentVideo._id));
        } catch (err) {
            console.log(err);
        }
    };

    //Remove saved video
    const handleRemoveSavedVideo = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_BASE_URL}/users/deletesave/${currentVideo._id}`, {
                userId: currentUser._id
            });
            dispatch(removeSavedVideo(currentVideo._id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <VideoFrame src={currentVideo?.videoUrl} controls />
                </VideoWrapper>
                <Title>{currentVideo?.title}</Title>
                <Details>
                    <Info>
                        {currentVideo?.views} veiws • {moment(currentVideo?.createdAt).fromNow()}
                    </Info>
                    <Buttons>
                        <Button onClick={handleLike}>
                            {currentVideo?.likes?.includes(currentUser?._id) ? (
                                <ThumbUpIcon />
                            ) : (
                                <ThumbUpOutlinedIcon />
                            )}{" "}
                            {currentVideo?.likes?.length}
                        </Button>
                        <Button onClick={handleDislike}>
                            {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                                <ThumbDownIcon />
                            ) : (
                                <ThumbDownOffAltOutlinedIcon />
                            )}
                            {" "}
                            {currentVideo?.dislikes?.length}
                        </Button>
                        {currentUser?.savedVideos?.includes(currentVideo?._id) ? (
                            <Button onClick={handleRemoveSavedVideo}>
                                <PlaylistRemoveIcon /> Remove
                            </Button>
                        ) : (
                            <Button onClick={handleSaveVideo}>
                                <PlaylistAddOutlinedIcon /> Save
                            </Button>
                        )}
                    </Buttons>
                </Details>
                <Hr />
                <Channel>
                    <ChannelInfo>
                        <Image
                            src={channel?.img ? channel?.img : "https://ih1.redbubble.net/image.399793925.2011/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg"}
                        />
                        <ChannelDetail>
                            <ChannelName>{channel?.name}</ChannelName>
                            <ChannelCounter>
                                {channel?.subscribers} subscribers
                            </ChannelCounter>
                            <Description>
                                {currentVideo?.desc}
                            </Description>
                        </ChannelDetail>
                    </ChannelInfo>
                    <Subscribe onClick={handleSubscribe}>
                        {currentUser?.subscribedUsers?.includes(channel._id)
                            ? "SUBSCRIBED"
                            : "SUBSCRIBE"}
                    </Subscribe>
                </Channel>
                <Hr />
                <Comments videoId={currentVideo?._id} />
            </Content>
            <Recommendation
                currentVideoId={currentVideo?._id}
                tags={currentVideo?.tags}
            />
        </Container>
    )
}

export default Video