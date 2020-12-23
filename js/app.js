//Calculate the realtime in degrees
const getDegrees = (currentTime, maxTime) => {
    return Math.round((360 * currentTime) / maxTime);
};

//Set the time rotating clock hands in the correct degrees
const setTimeInCss = (elementId, degree) => {
    const clockHand = document.getElementById(elementId);
    clockHand.style.setProperty(`transform`, ` rotate(${degree}deg)`);
};

//Set correct position for hours format 12h instead of 24
const timeTo12 = (hours) => {
  if (hours > 11) {
    return hours - 12;
  }
  return hours;
};

//Call functions every second  
setInterval(() => {
    //New date
    const date = new Date();
    const hours = timeTo12(date.getHours());

    //Call of getDegrees function for seconds, minutes and hours
    const secondsInDegrees = getDegrees(date.getSeconds(), 60);
    const minutesInDegrees = getDegrees(date.getMinutes(), 60);
    const hoursInDegrees = getDegrees(hours, 12);
    const hoursMinutesInDeg = getDegrees(hours + date.getMinutes() / 60, 12);
    //console.log({hoursInDegrees, hours,minutesInDegrees, secondsInDegrees});




    //Setting time in css rotation value
    //Seconds
    setTimeInCss("clock-hand-seconds", secondsInDegrees);
    setShadow("clock-hand-seconds", date.getSeconds());

    //Minutes
    setTimeInCss("clock-hand-minutes", minutesInDegrees);
    setShadow("clock-hand-minutes", date.getMinutes());

    //Hours
    setTimeInCss("clock-hand-hours", hoursInDegrees);
    setShadow("clock-hand-hours", hours);
}, 1000);
  
  
//SHADOW
// This function takes a second (0 to 15)
// And return the x/12 (like a percent but /12)
  const for12 = (seconds) => (seconds * 12) / 15;
  
  // Function recursive that substract 15 seconds if seconds is bigger than 15
  const alwaysMinus15 = (num) => {
    if (num >= 15) {
      const newNum = num - 15;
      return alwaysMinus15(newNum);
    }
    return num;
  };

  const setShadow = (elementId, currentSecond) => {
    let shadowDecay;
    const element = document.getElementById(elementId);
  
    if (currentSecond <= 15) {
      shadowDecay = for12(currentSecond);
    } else if (currentSecond > 15 && currentSecond <= 30) {
      shadowDecay = 12 - for12(currentSecond - 15);
    } else if (currentSecond > 30 && currentSecond <= 45) {
      shadowDecay = -for12(currentSecond - 30);
    } else if (currentSecond > 45) {
      shadowDecay = -(12 - for12(currentSecond - 45));
    }
  
    //console.log({ shadowDecay });
  
    element.style.setProperty(
      `box-shadow`,
      `${shadowDecay}px 0px 7px 0px rgba(0,0,0,0.5)`
    );
  };
  