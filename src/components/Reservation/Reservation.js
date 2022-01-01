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
//import VIPCinema from "../VIPCinema/VIPCinema";
import IMAXCinema from "../IMAXCinema/IMAXCinema";

const steps = ["Choose cinema hall", "Choose date", "Choose time", "Choose seat", "Reservation Summary"];

const Reservation = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
    const [selectedHall, setSelectedHall] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSeat, setSelectedSeat] = useState('');

    useEffect(() => {
        console.log("selectedHall: ", selectedHall);
    }, [selectedHall])

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
    setActiveStep(0);
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
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {activeStep + 1 === 1 ? (
              <RoomSelect setSelectedHall={setSelectedHall} selectedHall={selectedHall} movieID={props.movieID}/>
            ) : activeStep + 1 === 2 ? (
              <>
                <h1 style={{color: "black"}}>schedule</h1>
                <p style={{color: 'black'}}>selected date: {selectedDate} </p>
                <DateSelect setSelectedDate={setSelectedDate} selectedDate={selectedDate} dates={["2021-01-01","2021-05-30"]} movieID={props.movieID}/>
              </>
            ) : activeStep + 1 === 3 ? (
              <>
                <h1 style={{color: "black"}}>schedule</h1>
                <p style={{color: 'black'}}>selected time: {selectedTime} </p>
                <ScreenTimes setSelectedTime={setSelectedTime} movieID={props.movieID}/>
              </>
            ):  activeStep +1 === 4 ? (
              //<VIPCinema movieID={props.movieID} />
               //<CinemaRoom movieID={props.movieID}/>
               <IMAXCinema movieID={props.movieID}/>
            ) : (
                <ReservationSummary screenTime={selectedTime} cinemaHall={selectedHall} />
            )}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
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
              disabled={(activeStep == 0 && selectedHall == '') || (activeStep == 1 && selectedDate == '') || (activeStep == 2 && selectedTime == '')}
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