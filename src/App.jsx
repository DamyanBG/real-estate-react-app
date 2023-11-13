import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import CreateHome from './components/Homes/CreateHome';
import SignUpPage from './components/User/SignUpPage';
import AllHomes from './components/Homes/AllHomes';
import HomeDetails from './components/Homes/HomeDetails';
import Rent from './components/Rent/Rent';
import NewsList from './components/News/NewsList';
import Chat from './components/Chat/Chat';
import Profile from './components/User/Profile';
import { UserProvider } from './context/UserContext';
import CreateLand from './components/Land/CreateLand';
import AllLands from './components/Land/AllLands';
import LandDetails from './components/Land/LandDetails';
import { ToastContainer } from 'react-toastify';
import EditHome from './components/Homes/EditHome';
import EditLand from './components/Land/EditLand';
import ChatHistory from './components/Chat/ChatHistory';
import CreateMeeting from './components/Meeting/CreateMeeting';
import ListMeetings from './components/Meeting/ListMeetings';
import AdminRoutes from './components/User/routes';
import About from './components/About/About';
import SignIn from './components/User/SignInPage';
import CreateVisitation from './components/visitations/CreateVisitation';
import { HomesContextProvider } from './context/HomesContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/create-home" element={<CreateHome />} />
                                    <Route path="/edit-home" element={<EditHome />} />
                                    <Route path="/create-land" element={<CreateLand />} />
                                    <Route path="/signup" element={<SignUpPage />} />
                                    <Route path="/chat" element={<Chat />} />
                                    <Route path="/signin" element={<SignIn />} />
                                    <Route path="/all-homes" element={<AllHomes />} />
                                    <Route path="/all-lands" element={<AllLands />} />
                                    <Route path="/home-details" element={<HomeDetails />} />
                                    <Route path="/land-details" element={<LandDetails />} />
                                    <Route path="/edit-land" element={<EditLand />} />
                                    <Route path="/rent" element={<Rent />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/news" element={<NewsList />} />
                                    <Route path="/about" element={<About />} />
                                    {AdminRoutes}
                                    <Route path="/chat-history" element={<ChatHistory />} />
                                    <Route path="/create-meeting" element={<CreateMeeting />} />
                                    <Route path="/list-meetings" element={<ListMeetings />} />
                                    <Route path="/create-visitation" element={<CreateVisitation />} />
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
