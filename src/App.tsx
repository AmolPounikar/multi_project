
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import Modal from "./pages/Modal/Modal";
import Quiz from "./pages/Quiz/Quiz";
import UsersSearch from "./pages/Users/Users";
import Photos from "./pages/Photos/Photos";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Counter from "./pages/Counter/Counter";
import Convertor from "./pages/Convertor/Convertor";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/counter" element={<Counter />} />
                    <Route path="/modal" element={<Modal />} />
                    <Route path="/currency-converter" element={<Convertor />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/users" element={<UsersSearch />} />
                    <Route path="/photos" element={<Photos />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
