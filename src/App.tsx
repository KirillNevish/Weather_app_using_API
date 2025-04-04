import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard"
import CityInput from "./components/CityInput";
import { Container } from "@mui/material";
import { useFetchWeather } from "./hooks/useFetchWeather";
import "./App.css"


function App() {
  const [ city, setCity] = useState("");
  const { weather, error, fetchWeather, setWeather } = useFetchWeather();

  useEffect(() => {
    const cachedWeather = localStorage.getItem("weatherData");
    if (cachedWeather) {
      const parsedData = JSON.parse(cachedWeather);
      if (new Date().getTime() - parsedData.timestamp < 300000) {
        setWeather(parsedData.data);
      }
    }
  }, []);

  return (
    <Container className="mainContainer" sx={{
      minHeight: "50vh",
      width: "100vw",
      display: "flex",
      gap: 2,
      padding: 2, }}>
      <CityInput
        onSearch={(typedCity) => {
        setCity(typedCity);
        fetchWeather(typedCity);
        }}
        error={error}
      />
       {weather && (
        <WeatherCard
        name={weather.name}
        temp={weather.main.temp}
        icon={weather.weather[0].icon}
        description={weather.weather[0].description}
        dt={weather.dt}
      />
      )}
    </Container>
  );
}

export default App;
