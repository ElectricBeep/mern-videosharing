import styled from "styled-components";
import { useState, useEffect } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from "axios";
import { useSelector } from "react-redux";

const Container = styled.div`
    position: relative;
    display: flex;
    gap: 10px;
    margin: 15px 0;
    padding: 5px 15px;
    border-radius: 3px;
    &:hover {
        background-color: #585858;
    }
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Name = styled.span`
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
`;

const Date = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.textSoft};
    margin-left: 5px;
`;

const Text = styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.text};
`;

const DeleteIcon = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    color: red;
    cursor: pointer;
`;

const Comment = ({ comment, comments }) => {
    const [channel, setChannel] = useState({});

    const { currentUser } = useSelector(state => state.user);

    //Get channel
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}users/find/${comment.userId}`);
                setChannel(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [comment.userId]);

    const handleDeleteComment = async () => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}comments/${comment._id}`, {
            userId: currentUser._id
        });
        window.location.reload();
    };

    return (
        <Container>
            <Avatar
                src={channel?.img ? channel.img : "https://ih1.redbubble.net/image.399793925.2011/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg"}
            />
            <Details>
                <Name>{channel.name} <Date>1 day ago</Date></Name>
                <Text>
                    {comment.desc}
                </Text>
            </Details>
            <DeleteIcon>
                {comment.userId === currentUser._id && (
                    <DeleteOutlineIcon
                        fontSize="small"
                        onClick={handleDeleteComment}
                    />
                )}
            </DeleteIcon>
        </Container>
    )
}

export default Comment