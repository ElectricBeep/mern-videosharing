import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import styled from "styled-components";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import app from "../firebase";

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000a2;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 600px;
    height: 600px;
    background-color: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.text};
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
`;

const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    padding: 3px 3px 0px 3px;
    border-radius: 50%;
    &:hover {
        background-color: #585858;
    }
`;

const Title = styled.h1`
    text-align: center;
`;

const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`;

const Textarea = styled.textarea`
    border: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
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
    &:disabled {
        color: #585858;
        pointer-events: none;
    }
`;

const Label = styled.label`
    font-size: 14px;
`;

const Upload = ({ setOpen }) => {
    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [imgPercentage, setImgPercentage] = useState(0);
    const [videoPercentage, setVideoPercentage] = useState(0);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);

    const { currentUser } = useSelector(state => state.user);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    };

    const handleTags = (e) => {
        setTags(e.target.value.split(","));
    };

    const uploadFile = (file, urlType) => {
        setLoading(true);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "imgUrl" ? setImgPercentage(Math.round(progress)) : setVideoPercentage(Math.round(progress));
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) => {
                        return { ...prev, [urlType]: downloadURL };
                    });
                });
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        video && uploadFile(video, "videoUrl");
    }, [video]);

    useEffect(() => {
        img && uploadFile(img, "imgUrl");
    }, [img]);

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/videos`, {
            ...inputs, tags, userId: currentUser._id
        });
        setLoading(false);
        setOpen(false);
        res.status === 200 && navigate(`/video/${res.data._id}`);
    };

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>
                    <CloseIcon />
                </Close>
                <Title>Upload a New Video</Title>
                <Label>Video:</Label>
                {videoPercentage > 0 ? (
                    "Uploading: " + videoPercentage + "%"
                ) : (
                    <Input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideo(e.target.files[0])}
                    />
                )}
                <Input
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                />
                <Textarea
                    rows={8}
                    placeholder="Description"
                    name="desc"
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    placeholder="Separate tags with commas."
                    onChange={handleTags}
                />
                <Label>Image:</Label>
                {imgPercentage ? (
                    "Uploading: " + imgPercentage + "%"
                ) : (
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                )}
                <Button
                    onClick={handleUpload}
                    disabled={loading || !img || !video || inputs === {}}
                >
                    {loading ? "Uploading..." : "Upload"}
                </Button>
            </Wrapper>
        </Container>
    )
}

export default Upload