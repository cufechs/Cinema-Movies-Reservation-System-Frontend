import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import MovieDetail from './components/MovieDetail/MovieDetail';
import SiteAdmin from './components/SiteAdmin/SiteAdmin';

const App = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/movies/:movieID" element={<MovieDetail />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/site-administration" element={<SiteAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
