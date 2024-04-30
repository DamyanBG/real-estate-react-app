import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LandingPage from "./pages/LandingPage";
import { UserProvider } from "./context/UserProvider";
import AllHomes from "./pages/home-pages/AllHomes";
import HomeDetails from "./pages/home-pages/HomeDetails";
import CreateHome from "./pages/home-pages/CreateHome";
import EditHome from "./pages/home-pages/EditHome";

import "./App.scss";
import "leaflet/dist/leaflet.css"
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import Rent from "./pages/Rent";

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <BrowserRouter>
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/all-homes" element={<AllHomes />} />
                            <Route path="/create-home" element={<CreateHome />} />
                            <Route path="/edit-home" element={<EditHome />} />
                            <Route path="/home-details" element={<HomeDetails />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/rent" element={<Rent />} />
                        </Routes>
                    </main>
                    <Footer />
                </BrowserRouter>
            </UserProvider>
        </QueryClientProvider>
    );
}

export default App;
