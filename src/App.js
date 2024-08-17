import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Map from "./components/Map";
import PlaybackControls from "./components/PlaybackControls";
import ConfigurePanel from "./components/ConfigurePanel";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const sampleRoutes = {
  today: [
    [18.5204, 73.8567],
    [18.5225, 73.8566],
    [18.5248, 73.8532],
    [18.528, 73.856],
    [18.5308, 73.8605],
    [18.5366, 73.8701],
    [18.5395, 73.8763],
    [18.5506, 73.8705],
    [18.559, 73.8353],
    [18.552, 73.816],
    [18.546, 73.807],
    [18.5204, 73.8567],
  ],
  yesterday: [
    [18.5204, 73.8567],
    [18.5183, 73.8553],
    [18.5165, 73.8558],
    [18.5124, 73.8476],
    [18.508, 73.8397],
    [18.5015, 73.8508],
    [18.4953, 73.8646],
    [18.5073, 73.893],
    [18.529, 73.8746],
    [18.543, 73.896],
    [18.555, 73.891],
    [18.5204, 73.8567],
  ],
};

const App = () => {
  const [vehiclePosition, setVehiclePosition] = useState([18.5204, 73.8567]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [vehicleInfo, setVehicleInfo] = useState({
    status: "STOPPED",
    speed: 0,
    distance: 0,
    battery: 100,
    totalTime: "00:00:00",
    movingTime: "00:00:00",
    idleTime: "00:00:00",
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    if (isPlaying && routeCoordinates.length > 0) {
      const interval = setInterval(() => {
        const nextIndex = Math.min(
          currentTime + 1,
          routeCoordinates.length - 1
        );
        setVehiclePosition(routeCoordinates[nextIndex]);
        setCurrentTime(nextIndex);

        // Update vehicle info
        setVehicleInfo((prevInfo) => ({
          ...prevInfo,
          status: "MOVING",
          speed: Math.random() * 60,
          distance: prevInfo.distance + 0.1,
          battery: Math.max(0, prevInfo.battery - 0.1),
          totalTime: incrementTime(prevInfo.totalTime),
          movingTime: incrementTime(prevInfo.movingTime),
        }));

        if (nextIndex === routeCoordinates.length - 1) {
          setIsPlaying(false);
          setVehicleInfo((prevInfo) => ({ ...prevInfo, status: "STOPPED" }));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, currentTime, routeCoordinates]);

  const handleRouteSelection = (event) => {
    const selectedValue = event.target.value;
    setSelectedRoute(selectedValue);
    setRouteCoordinates(sampleRoutes[selectedValue]);
    setCurrentTime(0);
    setVehiclePosition(sampleRoutes[selectedValue][0]);
    setVehicleInfo((prevInfo) => ({
      ...prevInfo,
      status: "READY",
      speed: 0,
      distance: 0,
      battery: 100,
      totalTime: "00:00:00",
      movingTime: "00:00:00",
      idleTime: "00:00:00",
    }));
  };

  const incrementTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds + 1;
    return new Date(totalSeconds * 1000).toISOString().substr(11, 8);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Map
          center={vehiclePosition}
          zoom={13}
          vehiclePosition={vehiclePosition}
          routeCoordinates={routeCoordinates}
          vehicleInfo={vehicleInfo}
          onConfigButtonClick={() => setShowConfig(true)}
        />
        <PlaybackControls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          totalDuration={routeCoordinates.length - 1}
          disabled={routeCoordinates.length === 0}
        />
        <ConfigurePanel
          show={showConfig}
          setShow={setShowConfig}
          handleRouteSelection={handleRouteSelection}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
