import styled from 'styled-components';
import VideoCallOutlined from '@mui/icons-material/VideoCallOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Question = styled.div`
    color: ${({ theme }) => theme.textSoft};
`;

const Answer = styled.div`
    width: 600px;
    margin-top: -5px;
    margin-bottom: 10px;
    line-height: 25px;
    color: ${({ theme }) => theme.text};
`;

const Questions = () => {
    return (
        <Container>
            <Question>What do you offer?</Question>
            <Answer>
                We offer all the features you expect from a modern video-sharing
                application. They include abilities to post videos and comments, like
                videos, and save videos. We also have a fully functional search bar, so go
                on and search for something you like or find interesting.
            </Answer>
            <Question>How do I post a video?</Question>
            <Answer>
                Create an account or log in. In the navigation bar you should
                see <VideoCallOutlined style={{ verticalAlign: "middle" }} /> icon.
                Click on the icon and a window with from will pop up. Fill out the form and
                click on the Upload button to upload a video.
            </Answer>
            <Question>How do I subscribe a user?</Question>
            <Answer>
                Create an account or log in. Go to any video and you should see a
                red <span style={{ color: "red" }}>SUBSCRIBE</span> button.
                Click on the button.
            </Answer>
            <Question>How do I post a comment?</Question>
            <Answer>
                Create an account or log in. Go to any video and you should see the comments
                section under a video. Start typing your comment and Send button will
                appear. Click the Send button.
            </Answer>
            <Question>How can I save a video?</Question>
            <Answer>
                Create an account or log in. Go to any video and you should
                see <PlaylistAddOutlinedIcon style={{ verticalAlign: "middle" }} /> icon.
                Click on the icon and a video will be saved. You can watch saved videos
                by going to Saved section in the Sidebar. Click on
                the <VideoLibraryOutlinedIcon style={{ verticalAlign: "middle" }} /> icon
                and you will be taken to the Saved page where you can see all the videos you
                have saved.
            </Answer>
            <Question>Can I change my profile picture or other settings?</Question>
            <Answer>
                Unfortunately, at this moment, you can't. I am working on creating the
                Settings page. In the meantime, why don't you post a video?
            </Answer>
        </Container>
    )
}

export default Questions