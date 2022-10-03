import React, { useEffect, useRef, useState } from "react";
import { HomeComponent } from "../components/Home";

const Home = () => {
   const [initialCountdown, setInitialCountdown] = useState("25:00");
   const [countdown, setCountdown] = useState("00:05");
   const [pomodoroStep, setPomodoroStep] = useState(0); // 1-4
   const [pomodoroMode, setPomodoroMode] = useState("focus"); // focus, short_break, long_break
   const [pomodoroState, setPomodoroState] = useState("stop"); // start, pause, stop
   const countdownRef = useRef(null);

   if (pomodoroState === "start") {
      clearInterval(countdownRef.current);
      countdownRef.current = setInterval(() => handleCountdown(), 1000);
   } else {
      clearInterval(countdownRef.current);
   }

   const handleCountdown = () => {
      setCountdown((prevCountdown) => {
         const times = prevCountdown.split(":");
         if (times[0] !== "00" && times[1] === "00") {
            return (
               (Number(times[0]) <= 10 ? "0" : "") +
               Number(times[0] - 1) +
               ":" +
               59
            );
         } else if (times[1] !== "00") {
            return (
               times[0] +
               ":" +
               (Number(times[1]) <= 10 ? "0" : "") +
               Number(times[1] - 1)
            );
         } else if (times[0] === "00" && times[1] === "00") {
            setPomodoroState("stop");
            setPomodoroStep(pomodoroStep + 1);
            return "25:00";
         }
      });
   };

   function totalSeconds(time) {
      var parts = time.split(":");
      return Number(parts[0] * 60 + Number(parts[1]));
   }

   var timeone = initialCountdown;
   var timetwo = countdown;
   var pomodoroProgress = (
      (totalSeconds(timetwo) / totalSeconds(timeone)) *
      100
   ).toFixed(2);

   const handleOnClick = (payload) => {
      switch (payload.type) {
         case "pomodoroMode":
            handlePomodoroMode(payload.mode);
            break;
         case "pomodoroState":
            setPomodoroState(payload.state);
         default: // do nothing
      }
   };

   const handlePomodoroMode = (mode) => {
      switch (mode) {
         case "focus":
            {
               setPomodoroMode("focus");
               setCountdown("25:00");
               setInitialCountdown("25:00");
               setPomodoroState("stop");
               clearInterval(countdownRef.current);
            }
            break;
         case "short_break":
            {
               setPomodoroMode("short_break");
               setCountdown("05:00");
               setInitialCountdown("05:00");
               setPomodoroState("stop");
               clearInterval(countdownRef.current);
            }
            break;
         case "long_break":
            {
               setPomodoroMode("long_break");
               setCountdown("15:00");
               setInitialCountdown("15:00");
               setPomodoroState("stop");
               clearInterval(countdownRef.current);
            }
            break;
         default: // do nothing.
      }
   };
   return (
      <HomeComponent
         countdown={countdown}
         pomodoroMode={pomodoroMode}
         onClick={(payload) => handleOnClick(payload)}
         progress={pomodoroProgress}
         pomodoroStep={pomodoroStep}
         pomodoroState={pomodoroState}
      />
   );
};

export { Home };
