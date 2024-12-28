import React, { useEffect, useState } from "react";

function AnalogClock() {
  const hoursList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const [hours, setHours] = useState(new Date().getHours() + 5);
  const [minutes, setMinutes] = useState(new Date().getMinutes() + 30);
  const [seconds, setSeconds] = useState(new Date().getSeconds());

  useEffect(() => {
    const intervalTimerId = setInterval(() => {
      const date = new Date();
      setHours(date.getHours() + 5);
      setMinutes(date.getMinutes() + 30);
      setSeconds(date.getSeconds());
    }, 1000);
    return () => clearInterval(intervalTimerId);
  }, []);

  // Calculate angles with the correct starting position (12 o'clock = 0 degrees)
  const hourAngle = ((hours % 12) * 30 + minutes * 0.5 + 180) % 360; // 30° per hour + 0.5° per minute
  const minuteAngle = (minutes * 6 + seconds * 0.1 + 180) % 360; // 6° per minute + 0.1° per second
  const secondAngle = (seconds * 6 + 180) % 360; // 6° per second

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative border-[3px] border-black border-solid w-96 h-96 rounded-full">
        <div className="absolute w-3 h-3 bg-gray-500 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        {hoursList.map((hour) => {
          const angle = hour * 30 - 90; // Each hour is 30 degrees, starting at -90 for "12"
          const x = Math.cos((angle * Math.PI) / 180) * 160; // Radius for labels (140px from center)
          const y = Math.sin((angle * Math.PI) / 180) * 160;

          return (
            <div
              key={hour}
              className="absolute text-black font-bold"
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {hour}
            </div>
          );
        })}
        {/* Hour Hand */}
        <div
          className="absolute bg-black w-2 rounded-md origin-bottom transform -translate-x-1/2"
          style={{
            height: "30%",
            transform: `rotate(${hourAngle}deg)`,
            bottom: "50%",
            left: "50%",
          }}
        ></div>

        {/* Minute Hand */}
        <div
          className="absolute bg-gray-600 w-1.5 rounded-md origin-bottom transform -translate-x-1/2"
          style={{
            height: "40%",
            transform: `rotate(${minuteAngle}deg)`,
            bottom: "50%",
            left: "50%",
          }}
        ></div>

        {/* Second Hand */}
        <div
          className="absolute bg-red-500 w-1 rounded-md origin-bottom transform -translate-x-1/2"
          style={{
            height: "45%",
            transform: `rotate(${secondAngle}deg)`,
            bottom: "50%",
            left: "50%",
          }}
        ></div>
      </div>
    </div>
  );
}

export default AnalogClock;
