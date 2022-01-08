import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CinemaRoom from "../CinemaRoom/CinemaRoom";
import RoomSelect from "../RoomSelect/RoomSelect";
import ScreenTimes from '../ScreenTimes/ScreenTimes';
import ReservationSummary from "../ReservationSummary/ReservationSummary";
import DateSelect from "../DateSelect/DateSelect";
import IMAXCinema from "../IMAXCinema/IMAXCinema";
import { useGetMovieReservationsQuery, useReserveTicketMutation } from "../../services/movies";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';


//const steps = ["Choose cinema hall", "Choose date", "Choose time", "Choose seat", "Reservation Summary"];
const steps = ["Choose cinema hall", "Choose date", "Choose seat", "Reservation Summary"];

const Reservation = (props) => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [selectedHall, setSelectedHall] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSeat, setSelectedSeat] = useState('');
    const { data, error, isLoading, isFetching, isSuccess } = useGetMovieReservationsQuery(props.movieID);
    const [roomsAvailable, setRoomsAvailable] = useState([]);
    const [startTimesAvailable, setStartTimesAvailable] = useState([]);
    const [seatsAvailable, setSeatsAvailable] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [price, setPrice] = useState('');
    const [movieReservationId, setMovieReservationId] = useState('');

    const userId = useSelector(state => state.user.id);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const userType = useSelector(state => state.user.role);
    const token = useSelector(state => state.user.token);
    const [reserveTicket] = useReserveTicketMutation();

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        console.log("selectedHall: ", selectedHall);
    }, [selectedHall]);

    useEffect(() => {
      if (data && data.moviereservation) {
        let rooms = data.moviereservation.map(elem => elem.capacity)
        rooms = [... new Set(rooms)];
        rooms = rooms.sort();
        setRoomsAvailable(rooms);
        
        
        console.log("data moviereservation: ",data.moviereservation)
      }
      

    }, [data]);

    useEffect(() => {
      if (data && data.moviereservation) {
        let start_dates = data.moviereservation.filter(elem => elem.capacity == selectedHall).map(elem => elem.start_time);
        start_dates = [... new Set(start_dates)];
        setStartTimesAvailable(start_dates);

      }
    }, [selectedHall]);

    useEffect(() => {
      if (data && data.moviereservation && selectedHall) {
        let seats = data.moviereservation.filter(elem => elem.capacity === selectedHall).filter(elem => elem.start_time == selectedDate).map(elem => elem.vacant_reserved_seats);
        if (seats && seats.length >= 1) {
          seats = JSON.parse(seats[0]);
          setSeatsAvailable(seats);
        }
      }
    }, [selectedHall, selectedDate]);

    useEffect(() => {
      if (seatsAvailable && data && data.moviereservation) {
        let d = data.moviereservation.filter(elem => elem.capacity == selectedHall).filter(elem => elem.start_time == selectedDate);
        console.log(d);
        if (d && d.length >= 1) {
          setMovieReservationId(d[0].id);
          setPrice(d[0].price);
        }
      }
    }, [seatsAvailable]);

    // useEffect(() => {
    //   console.log("selectedDate: ", selectedDate, ", selectedHall: ", selectedHall);
    //   let seats = data?.moviereservation.filter(elem => elem.start_time == selectedDate && elem.capacity == selectedHall);
    //   //seats = JSON.parse(seats);
    //   console.log("seats: ", seats)
    // }, [selectedDate, selectedHall]);

    const handleClickVariant = (variant, msg) => {
      // variant could be success, error, warning, info, or default
      enqueueSnackbar(msg, { variant });
    };

    const bookTicket = () => {
      console.log("userId: ", userId, ", reservationId: ", movieReservationId, ", seat no.: ", selectedSeats);
      let req = {
        user_id: userId,
        id: movieReservationId,
        seat_no: JSON.stringify({ seat_no: selectedSeats})
      }

      console.log("req: ", req)

      if (!isLoggedIn) {
        alert("You are not signed in!");
      }

      reserveTicket(req).then(res => {
        console.log("reservation response: ", res);
        if (res.data && res.data.status) {
          setSelectedSeats([]);
          setMovieReservationId('');
          //data = '';
          handleClickVariant('success', 'Seat booked successfully');
          navigate("/");
        }
      })

    
    }


  const isStepOptional = (step) => {
    return step === 10;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    if (userType === "manager" || userType == "admin") {
      handleClickVariant('error', 'managers or admins cannot book seats');
      console.log("yess")
      return;
    }
    setActiveStep(0);
    bookTicket();
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "#dcdcdc", padding: '20px', borderRadius: '40px' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          
          <Typography sx={{ mt: 2, mb: 1 }} style={{color: 'black'}}>
            All steps completed - press Confirm
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Confirm</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {activeStep + 1 === 1 ? (
              <RoomSelect setSelectedHall={setSelectedHall} selectedHall={selectedHall} movieID={props.movieID} rooms={roomsAvailable}/>
            ) : activeStep + 1 === 2 ? (
              <>
                <h1 style={{color: "black"}}>schedule</h1>
                <p style={{color: 'black'}}>selected date: {selectedDate} </p>
                <DateSelect setSelectedDate={setSelectedDate} selectedDate={selectedDate} dates={startTimesAvailable} movieID={props.movieID}/>
              </>
            ) : activeStep + 1 === 30 ? (
              <>
                <h1 style={{color: "black"}}>schedule</h1>
                <p style={{color: 'black'}}>selected time: {selectedTime} </p>
                <ScreenTimes setSelectedTime={setSelectedTime} movieID={props.movieID}/>
              </>
            ):  activeStep +1 === 3 ? (
              //<VIPCinema movieID={props.movieID} />
               //<CinemaRoom movieID={props.movieID}/>
               <>
               <p style={{color: 'black'}}>Selected Seats: {selectedSeats}</p>
               <IMAXCinema 
                capacity={selectedHall}
                seats={seatsAvailable}
                setSeats={setSeatsAvailable}
                movieID={props.movieID}
                setSelectedSeats={setSelectedSeats}
               />
               </>
            ) : (
                <ReservationSummary 
                  screenTime={selectedDate} 
                  cinemaHall={selectedHall} 
                  seats={selectedSeats}
                  price={price}
                  movieID={props.movieID}
                  userId={userId}
                  movieReservationId={movieReservationId}
                />
            )}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button 
              onClick={handleNext}
              disabled={(activeStep == 0 && selectedHall == '') || (activeStep == 1 && selectedDate == '') || (activeStep == 2 && selectedSeats.length === 0) }
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default Reservation;

// export default function IntegrationNotistack() {
//   return (
//     <SnackbarProvider maxSnack={3}>
//       <Reservation />
//     </SnackbarProvider>
//   );
// }