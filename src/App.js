import './App.scss';
import { CreateLand, HomePage, Footer, Header, CreateHome, SignUpPage, AllHomes, HomeDetails, SignInPage, Rent, NewsList, Profile, ChangeEmail, ChangePassword, AllLands, LandDetails} from './components'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
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
                            <Route path="/rent" element={<Rent />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/change-email" element={<ChangeEmail />} />
                            <Route path="/change-password" element={<ChangePassword />} />
                            <Route path="/news" element={<NewsList />} />
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
