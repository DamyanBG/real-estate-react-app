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
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/create-home' element={<CreateHome />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/signin' element={<SignInPage />} />
            <Route path='/all-homes' element={<AllHomes />} />
            <Route path='/home-details' element={<HomeDetails />} />
            <Route path='/Rent' element={<Rent/>} />
	  </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
