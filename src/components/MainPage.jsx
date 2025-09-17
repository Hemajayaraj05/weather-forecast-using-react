import {Card,CardContent,TextField,Typography,Button} from "@mui/material";
import { useState } from "react";
import axios from "axios";

function MainPage() {
  const API_KEY = "4f0ef6daf9d9a40608d22b9475fe051a";
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},&appid=${API_KEY}&units=metric`
      );

      setWeather(response.data);
      setError("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("City not found!");
      setWeather(null);
    }
  };
  return (
    <>
      <div>
        <Typography>Weather Forecast</Typography>
        <TextField
          label="Enter city"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <Button variant="contained" color="success" onClick={getWeather}>
          Get Weather
        </Button>

        {error && <Typography color="error">{error}</Typography>}

        {weather && (
          <Card>
            <CardContent>
              <Typography>{weather.name}</Typography>
              <Typography>{weather.weather[0].description}</Typography>
              <Typography>{weather.main.temp}C</Typography>
              <Typography>{weather.main.humidity}</Typography>
              <Typography>{weather.wind.speed}</Typography>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
export default MainPage;
