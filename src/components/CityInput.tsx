import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useFetchWeather } from "../hooks/useFetchWeather";

interface CityInputProps {
  onSearch: (city: string) => void;
  error: string | null;
}

const CityInput: React.FC<CityInputProps> = ({ onSearch, error }) => {
  const [inputValue, setInputValue] = useState("");
  const { weather } = useFetchWeather();

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: weather ? "auto" : "100%"
      }}
    >
      <TextField
        className="getW_typeW"
        label="Enter city"
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        margin="normal"
        sx={{
          width: "20vw",
          minWidth: "300px",
          "& .MuiInputBase-input": { color: "#fff" },
          "& .MuiInputLabel-root": { color: "#fff" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#fff", transition: "all 0.2s ease" },
            "&:hover fieldset": { borderColor: "primary.main" },
          },
        }}
        InputLabelProps={{
          sx: { color: "#fff" },
        }}
      />
      <Button
        className="getW_typeW"
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{ color: "#fff", width: "20vw", minWidth: "300px", p: 2 }}
      >
        Get Weather
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default CityInput;