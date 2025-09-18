import {
  Card,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
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

  useEffect(()=>{
    const interval=setInterval(()=>{
      if(city)
      {
        getWeather();
      }
    },60000);

    return()=>clearInterval(interval);

  },[city])
  return (
    <>
      <div className="flex justify-center p-20">
        <div className="flex flex-col border-2  border-gray-300 gap-5 items-center p-20">
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
              <div className="gap-5 p-4  border-gray-500">
                <Typography >Weather name :<span className="font-bold">{weather.name}</span></Typography>
                <Typography>Weather description :<span className="font-bold">{weather.weather[0].description}</span></Typography>
                <Typography>Weather temperature :<span className="font-bold">{weather.main.temp}C</span></Typography>
                <Typography>Weather Humidity :<span className="font-bold">{weather.main.humidity}</span></Typography>
                <Typography>Weather Speed :<span className="font-bold">{weather.wind.speed}</span></Typography>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
export default MainPage;
