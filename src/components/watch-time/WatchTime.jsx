import { useEffect } from "react";
import { useState } from "react";
import { hostUrl } from "../../utils/urls";

export default function WatchTime() {
  const [startTime, setStartTime] = useState(Date.now());
  const [totalVisibleTime, setTotalVisibleTime] = useState(0);
  const [isVisible, setIsVisible] = useState(!document.hidden);

  useEffect(() => {
    
    function handleVisibilityChange() {

      if (document.hidden) {
        const endTime = Date.now();
        const visibleDuration = endTime - startTime;

        setTotalVisibleTime((prevTime) => prevTime + visibleDuration);
        setIsVisible(false);

      } else {

        setStartTime(Date.now());
        setIsVisible(true);
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {

      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (isVisible) {

        const endTime = Date.now();
        const visibleDuration = endTime - startTime;
        const totalTime = totalVisibleTime + visibleDuration;

        console.log(`User spent ${totalTime} milliseconds on the homes page.`);

        sendDataToServer(totalTime);

      } else {

        console.log(
          `User spent ${totalVisibleTime} milliseconds on the homes page.`
        );

        sendDataToServer(totalVisibleTime);
      }
    };
  }, [startTime, totalVisibleTime, isVisible]);

  return (
    <div>
      <span>{totalVisibleTime}</span>
    </div>
  );
}

function sendDataToServer(duration) {
  fetch(`${hostUrl}/api/time-tracking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      duration,
      page: "all-homes",
      timestamp: new Date().toISOString(),
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error));
}

// For Backend

// app.post("/api/time-tracking", (req, res) => {
//   const { duration, timestamp } = req.body;
//   console.log(`Duration: ${duration}, Page: ${page}, Timestamp: ${timestamp}`);

//   res.json({ message: "Time tracking data received successfully." });
// });
