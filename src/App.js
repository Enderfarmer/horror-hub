import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Stories from "./pages/Stories";
import Home from "./pages/Home";
import Wrapper from "./components/Wrapper";
import Search from "./pages/Search";

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
                    path="/search"
                    element={<Wrapper component={<Search />} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
