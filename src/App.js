import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import CreateHome from './components/Homes/CreateHome';
import SignUpPage from './components/User/SignUpPage';
import AllHomes from './components/Homes/AllHomes';
import HomeDetails from './components/Homes/HomeDetails';
import SignInPage from './components/User/SignInPage';
import Rent from './components/Rent/Rent';
import Profile from './components/User/Profile';
import ChangeEmail from './components/User/ChangeEmail';
import ChangePassword from './components/User/ChangePassword';
import { UserProvider } from './context/UserContext';
import CreateLand from './components/Land/CreateLand';
import AllLands from './components/Land/AllLands';
import LandDetails from './components/Land/LandDetails';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <div className="App">
            <UserProvider>
                <BrowserRouter>
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/create-home" element={<CreateHome />} />
                            <Route path="/create-land" element={<CreateLand />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route path="/signin" element={<SignInPage />} />
                            <Route path="/all-homes" element={<AllHomes />} />
                            <Route path="/all-lands" element={<AllLands />} />
                            <Route path="/home-details" element={<HomeDetails />} />
                            <Route path="/land-details" element={<LandDetails />} />
                            <Route path="/Rent" element={<Rent />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/change-email" element={<ChangeEmail />} />
                            <Route path="/change-password" element={<ChangePassword />} />
                        </Routes>
                    </main>
                    <Footer />
                </BrowserRouter>
            </UserProvider>

            <ToastContainer />
        </div>
    );
}

export default App;
