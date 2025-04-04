import { useState } from "react";
import axios from "axios";
import { WeatherData } from "../types/weather";

const API_KEY = "API-KEY-HERE";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

export const useFetchWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityName: string) => {

    if (!cityName.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      setError(null);
      const response = await axios.get(API_URL, {
        params: {
          q: cityName,
          units: "metric",
          appid: API_KEY,
        },
      });

      setWeather(response.data);
      localStorage.setItem(
        "weatherData",
        JSON.stringify({ data: response.data, timestamp: new Date().getTime() })
      );
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 404) {
          setError("City not found");
        } else {
          setError("API error");
        }
      } else {
        setError("Network error or API unreachable");
      }
    }
  };

  return { weather, error, fetchWeather, setWeather };
};