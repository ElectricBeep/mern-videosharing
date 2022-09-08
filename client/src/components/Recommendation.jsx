import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
    flex: 2;
`;

const Recommendation = ({ tags, currentVideoId }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getRecommendedVideos = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}videos/tags?tags=${tags}`);
            setVideos(res.data);
        };
        getRecommendedVideos();
    }, [tags]);

    //So that I don't get currently selected video in the recomendations
    const filteredVideos = videos.filter((video) => video._id !== currentVideoId);

    return (
        <Container>
            {filteredVideos?.map((video) => (
                <Card type="sm" key={video._id} video={video} />
            ))}
        </Container>
    )
}

export default Recommendation