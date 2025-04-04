import { useState } from "react";
import axios from "axios";
import { WeatherData } from "../types/weather";

const API_KEY = "d0924060eb8706a69cc0b6e9a8bbe156";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const CACHE_TTL = 5 * 60 * 1000;

export const useFetchWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityName: string) => {
    const cacheKey = `weather_${cityName.toLowerCase()}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      const parsed = JSON.parse(cached);
      const isFresh = new Date().getTime() - parsed.timestamp < CACHE_TTL;

     if (isFresh) {
       setWeather(parsed.data);
       setError(null);
       return;
     }
    }

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
        cacheKey,
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