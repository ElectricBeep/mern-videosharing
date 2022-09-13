import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components"
import axios from "axios";
import { useSelector } from "react-redux";

import Comment from "./Comment";

const Container = styled.div`
      
`;

const NewComment = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
`;

const Input = styled.input`
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.soft};
    background-color: transparent;
    outline: none;
    padding: 5px;
    width: 100%;
    color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.textSoft};
    &:hover {
        background-color: #585858;
    }
`;


const Comments = ({ videoId }) => {
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);

    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/comments/${videoId}`);
                setComments(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getComments();
    }, [videoId]);

    const postComment = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/comments`, {
                videoId,
                desc: commentText,
                userId: currentUser._id
            });
            comments.push(res.data);
            setCommentText("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container>
            <NewComment>
                <Avatar
                    src={currentUser?.img ? currentUser.img : "https://ih1.redbubble.net/image.399793925.2011/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg"}
                />
                <Input
                    value={commentText}
                    placeholder="Add comment..."
                    onChange={(e) => setCommentText(e.target.value)}
                />
                {(commentText.length > 0 && currentUser) && (
                    <Button onClick={postComment}>Send</Button>
                )}
            </NewComment>
            {comments?.map((comment) => (
                <Comment
                    comment={comment}
                    key={comment._id}
                    comments={comments}
                />
            ))}
        </Container>
    )
}

export default Comments