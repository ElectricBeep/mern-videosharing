import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components"

import Card from "../components/Card";
import Spinner from "../components/Spinner";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const NoVideos = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.textSoft};
`;

const Search = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    const query = useLocation().search;

    useEffect(() => {
        if (query.includes("?q=")) {
            setLoading(true);
            const fetchSearchedVideos = async () => {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}videos/search${query}`);
                setVideos(res.data);
                setLoading(false);
            };
            fetchSearchedVideos();
        } else {
            setLoading(true);
            const fetchVideosByTags = async () => {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}videos/tags${query}`);
                setVideos(res.data);
                setLoading(false);
            };
            fetchVideosByTags();
        }
    }, [query]);

    return (
        <Container>
            {loading ? (
                <Spinner message="Loading..." />
            ) : (
                <>
                    {!videos.length && (
                        <NoVideos>
                            We couldn't find anything.<br />
                            Please search for something else.
                        </NoVideos>
                    )}
                    {videos?.map((video) => (
                        <Card video={video} key={video._id} />
                    ))}
                </>
            )}
        </Container>
    )
}

export default Search