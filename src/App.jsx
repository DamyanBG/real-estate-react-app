import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LandingPage from "./pages/LandingPage";
import { UserProvider } from "./context/UserProvider";
import AllHomes from "./pages/home-pages/AllHomes";
import HomeDetails from "./pages/home-pages/HomeDetails";
import CreateHome from "./pages/home-pages/CreateHome";
import EditHome from "./pages/home-pages/EditHome";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import Rent from "./pages/Rent";
import Chat from "./pages/Chat";
import Meeting from "./pages/Meeting";

import "./App.scss";
import "leaflet/dist/leaflet.css";

const queryClient = new QueryClient();

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
                            <Route
                                path="/create-home"
                                element={<CreateHome />}
                            />
                            <Route path="/edit-home" element={<EditHome />} />
                            <Route path="/home-details">
                                <Route path=":homeId" element={<HomeDetails />} />
                            </Route>
                            <Route path="/chat">
                                <Route path=":chatPartnerId" element={<Chat />} />
                            </Route>
                            <Route path="/meeting">
                                <Route path=":meetingPartnerId/:homeId" element={<Meeting />} />
                            </Route>
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/rent" element={<Rent />} />
                        </Routes>
                        <ToastContainer />
                    </main>
                    <Footer />
                </BrowserRouter>
            </UserProvider>
        </QueryClientProvider>
    );
}

export default App;
