import React, { useState, useLayoutEffect } from "react";

import CloundIMG from "../assets/cloud.png";
import HumidityIMG from "../assets/humidity.png";
import WindIMG from "../assets/wind.png";

function WeatherApp() {
	const [city, setCity] = useState("Srinagar");
	const [weatherData, setWeatherData] = useState();
	const [dataRecieved, setDataRecieved] = useState(false);

	const apiKey = import.meta.env.VITE_API_KEY;
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}&appid=${apiKey}`;

	const fetchData = async () => {
		try {
			const response = await fetch(apiUrl);
			if (!response.ok) {
				throw new Error("Network response is not ok!");
			}
			const data = await response.json();
			setWeatherData(data);
			setDataRecieved(true);
			console.log(weatherData);
		} catch (e) {
			console.log(e);
			setDataRecieved(false);
		}
	};

	useLayoutEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="app-container">
			{/*SEARCH BAR*/}
			<div className="input-items">
				<input
					type="text"
					placeholder="Enter city name"
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
				<button onClick={fetchData}>
					<i className="fa-solid fa-magnifying-glass"></i>
				</button>
			</div>

			{/*WEATHER DATA*/}
			{dataRecieved ? (
				<div>
					<img src={CloundIMG} alt="" className="weather-image" />
					<div className="temp">
						{Math.floor(weatherData.main.temp)}
						<span>&deg;C</span>
					</div>
					<div className="city">
						<i class="fa-solid fa-location-dot"></i>{" "}
						{weatherData.name}
					</div>
					<div className="other-info">
						<div className="humility">
							<p>
								<img src={HumidityIMG} />
								{weatherData.main.humidity} %
							</p>
							<p>Humidity</p>
						</div>
						<div className="wind-speed">
							<p>
								<img src={WindIMG} /> {weatherData.wind.speed}
								km/h
							</p>
							<p>Wind Speed</p>
						</div>
					</div>
				</div>
			) : (
				<h2 className="no-data">
					<i class="fa-regular fa-face-frown"></i> No Data Found!
				</h2>
			)}
		</div>
	);
}
export default WeatherApp;