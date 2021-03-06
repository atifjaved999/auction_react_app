import React from "react";
import Countdown from "react-countdown";
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return (<span>Expired</span>);
  } else {
    return (
      <span>
        Time Left: {days} d:{hours} h:{minutes} m:{seconds} s
      </span>
    );
  }
};
const Timer = (props) => {
  const {item} = props
  return(
    <div key={item.id}>
      <Countdown
        date={new Date(item.expired.toString())}
        renderer={renderer}
      />
    </div>
  )
}
export default Timer;
