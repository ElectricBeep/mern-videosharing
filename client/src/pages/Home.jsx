import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from "axios";
import { MoonLoader } from "react-spinners";

import Card from '../components/Card';
import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const NoVideos = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.textSoft};
`;

const Home = ({ type }) => {
    const [videos, setVidoes] = useState([]);
    const [loading, setLoading] = useState(false);

    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        const getVideos = async () => {
            setLoading(true);
            try {
                const res = await axios.post(`${process.env.REACT_APP_BASE_URL}${type}`, {
                    userId: currentUser?._id
                });
                setVidoes(res.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        getVideos();
    }, [type, currentUser]);

    return (
        <Container>
            {loading ? (
                <Spinner message="Loading..." />
            ) : (
                <>
                    {(type === "/videos/sub" && !videos.length) && (
                        <NoVideos>You haven't subscribed to anyone!</NoVideos>
                    )}
                    {((type === "/videos/random" || type === "/videos/trend") && !videos.length) && (
                        <NoVideos>Ops, something went wrong. Please try to reload a page.</NoVideos>
                    )}
                    {videos.map((video) => (
                        <Card
                            video={video}
                            key={video._id}
                            setVidoes={setVidoes}
                        />
                    ))}
                </>
            )}
        </Container>
    )
}

export default Home