import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";

import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import { useSelector } from "react-redux";
import Questions from "./pages/Questions";
import Settings from "./pages/Settings";

const Container = styled.div`
    display: flex;
`;

const Main = styled.div`
    flex: 7;
    background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
    padding: 22px 96px;
`;

function App() {
    const [darkMode, setDarkMoode] = useState(true);

    const { currentUser } = useSelector(state => state.user);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <Container>
                <Router>
                    <Menu darkMode={darkMode} setDarkMoode={setDarkMoode} />
                    <Main>
                        <Navbar />
                        <Wrapper>
                            <Routes>
                                <Route path="/">
                                    <Route index element={<Home type="/videos/random" />} />
                                    <Route path="/trends" element={<Home type="/videos/trend" />} />
                                    <Route path="/subscriptions" element={<Home type="/videos/sub" />} />
                                    <Route path="/search" element={<Search />} />
                                    <Route path="/questions" element={<Questions />} />
                                    <Route path="/settings" element={<Settings />} />
                                    <Route path="/saved" element={<Home type={`/users/savedvideos/${currentUser?._id}`} />} />
                                    <Route path="signin" element={currentUser ? <Home type="/videos/random" /> : <SignIn />} />
                                    <Route path="video">
                                        <Route path=":id" element={<Video />} />
                                    </Route>
                                </Route>
                            </Routes>
                        </Wrapper>
                    </Main>
                </Router>
            </Container>
        </ThemeProvider>
    );
}

export default App;
