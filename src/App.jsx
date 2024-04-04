import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';

import { UserProvider } from './context/UserContext';
import { HomesContextProvider } from './context/HomesContext';

import Header from './layout/Header';
import CreateHome from './pages/home/CreateHome';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import AllHomes from './pages/home/AllHomes';
import EditHome from './pages/home/EditHome';
import HomeDetails from './pages/home/HomeDetails';
import SignIn from './pages/user/SignInPage';
import SignUpPage from './pages/user/SignUpPage';
import Footer from './layout/Footer';

import './App.scss';

const queryClient = new QueryClient()

function App() {
    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <HomesContextProvider>
                    <UserProvider>
                        <BrowserRouter>
                            <Header />
                            <main className="main">
                                <Routes>
                                    <Route path="/" element={<LandingPage />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/all-homes" element={<AllHomes />} />
                                    {/* <Route path="/chat" element={<Chat />} />
                                    <Route path="/chat-history" element={<ChatHistory />} /> */}
                                    <Route path="/create-home" element={<CreateHome />} />
                                    {/* <Route path="/create-meeting" element={<CreateMeeting />} /> */}
                                    {/* <Route path="/create-visitation" element={<CreateVisitation />} /> */}
                                    <Route path="/edit-home" element={<EditHome />} />
                                    {/* <Route path="/edit-meeting" element={<EditMeeting />} /> */}
                                    <Route path="/home-details" element={<HomeDetails />} />
                                    {/* <Route path="/news" element={<NewsList />} /> */}
                                    {/* <Route path="/profile" element={<Profile />} /> */}
                                    {/* <Route path="/rent" element={<Rent />} /> */}
                                    <Route path="/signin" element={<SignIn />} />
                                    <Route path="/signup" element={<SignUpPage />} />
                                </Routes>
                            </main>
                            <Footer />
                        </BrowserRouter>
                    </UserProvider>
                </HomesContextProvider>
            </QueryClientProvider>

            <ToastContainer />
        </div>
    );
}

export default App;
