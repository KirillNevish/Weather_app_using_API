import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface WeatherCardProps {
  name: string;
  temp: number;
  icon: string;
  description: string;
  dt: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ name, temp, icon, description, dt }) => {
  return (
    <Card
      sx={{
        mt: 2,
        maxWidth: "800px",
        width: "90vw",
        bgcolor: "transparent",
        boxShadow: 10,
        borderRadius: "15px",
        minHeight: "25vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <Typography color="#fff" fontWeight={600} variant="h4">
            {name}
          </Typography>
          <Typography color="#fff" variant="h5">
            {temp}°C
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
          <img
            src={`https://openweathermap.org/img/wn/${icon}.png`}
            alt={description}
            width={150}
          />
          <Typography color="#fff" variant="body1">
            {description}
          </Typography>
        </Box>

        <Typography color="#fff" variant="body1" textAlign="center">
          Last updated: {new Date(dt * 1000).toLocaleTimeString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;