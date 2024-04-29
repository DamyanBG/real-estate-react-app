import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LandingPage from "./pages/LandingPage";
import { UserProvider } from "./context/UserProvider";
import AllHomes from "./pages/home-pages/AllHomes";

import "./App.scss";

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
                        </Routes>
                    </main>
                    <Footer />
                </BrowserRouter>
            </UserProvider>
        </QueryClientProvider>
    );
}

export default App;
