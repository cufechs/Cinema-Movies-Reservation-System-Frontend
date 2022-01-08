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
import Header_v2 from './components/Header_v2/Header_v2';
import MovieReservationsPage from './components/MovieReservationsPage/MovieReservationsPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Unauthorized from './components/Unauthorized/Unauthorized';
import AboutUs from './components/AboutUs/AboutUs';
import Privacy from './components/Privacy/Privacy';

const App = () => {
  return (
    <div className="app">
      <Router>
        <Header_v2 />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/movies/:movieID" element={<MovieDetail />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/site-administration" element={<ProtectedRoute allowedUser="admin" />}>
            <Route exact path="/site-administration" element={<SiteAdmin />} />
          </Route>
          <Route exact path="/my-reservations" element={<UserReservations />} />
          <Route exact path="/management" element={<ProtectedRoute allowedUser="manager" />}>
            <Route exact path="/management" element={<ManagementPage />} />
          </Route>
          <Route exact path="/movie-reservations/:reservationID" element={<MovieReservationsPage />} />
          <Route exact path="/unauthorized" element={<Unauthorized />} />
          <Route exact path="/aboutus" element={<AboutUs />} />
          <Route exact path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
