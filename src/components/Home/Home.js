import React from 'react';
import MoviesList from '../MoviesList/MoviesList';
//import './Home.css';
import classes from './Home.module.scss';

const BACKGROUND_SRC = "https://i2.wp.com/www.dasym.com/wp-content/uploads/2017/07/Cinema-Image-by-Alexandre-Chassignon-on-Flickr.jpg?fit=2304%2C1728&ssl=1"

const Home = (props) => {
    // return (
    //     <div className="home">
    //         <MoviesList />
    //     </div>
    // )

    return  (
        <>
        <div className={classes.home_cover}
          style={{backgroundImage: `url("https://i2.wp.com/www.dasym.com/wp-content/uploads/2017/07/Cinema-Image-by-Alexandre-Chassignon-on-Flickr.jpg?fit=2304%2C1728&ssl=1")`}}
        >
          <div className={`${classes.content}`}>
            <div className={classes.info}>
              <h2 className={classes.title}>Cinema Reservation</h2>
            </div>
          </div>
            {/* <img className={classes.home_photo} src="https://i2.wp.com/www.dasym.com/wp-content/uploads/2017/07/Cinema-Image-by-Alexandre-Chassignon-on-Flickr.jpg?fit=2304%2C1728&ssl=1" /> */}
        </div>
        <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Movies in Our Cinema</h2>
            {/* <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link> */}
          </div>
          {/* <MovieList category={category.movie} type={movieType.popular} /> */}
            <MoviesList />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Charts </h2>
            {/* <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link> */}
          </div>
          {/* <MovieList category={category.movie} type={movieType.top_rated} /> */}
        </div>

       
      </div>
      </>
    )
}

export default Home;
