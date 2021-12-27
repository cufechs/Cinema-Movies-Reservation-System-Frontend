import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import MovieDetail from './components/MovieDetail/MovieDetail';
import SiteAdmin from './components/SiteAdmin/SiteAdmin';
import SignUp from './components/SignUp/SignUp';
import UserReservations from './components/UserReservations/UserReservations';
import ManagementPage from './components/ManagementPage/ManagementPage';

const App = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/movies/:movieID" element={<MovieDetail />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/site-administration" element={<SiteAdmin />} />
          <Route exact path="/my-reservations" element={<UserReservations />} />
          <Route exact path="/management" element={<ManagementPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
