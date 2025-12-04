import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Stories from "./pages/Stories";
import Home from "./pages/Home";
import Wrapper from "./components/Wrapper";
import Search from "./pages/Search";
import Story from "./pages/Story";
import Random from "./pages/Random";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NewStory from "./pages/NewStory";

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    index
                    element={<Wrapper component={<Home />} />}
                />
                <Route
                    path="/stories"
                    element={<Wrapper component={<Stories />} />}
                />
                <Route
                    path="/story/:id"
                    element={<Wrapper component={<Story />} />}
                />
                <Route
                    path="/search"
                    element={<Wrapper component={<Search />} />}
                />
                <Route
                    path="/random"
                    element={<Wrapper component={<Random />} />}
                />
                <Route
                    path="/register"
                    element={<Wrapper component={<Register />} />}
                />
                <Route
                    path="/login"
                    element={<Wrapper component={<Login />} />}
                />
                <Route
                    path="/new-story"
                    element={<Wrapper component={<NewStory />} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
