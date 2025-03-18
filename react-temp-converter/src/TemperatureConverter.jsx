// Temperature converter component
import React, { useState } from "react";

function TemperatureConverter() {
	const [celsius, setCelsius] = useState(0);
	const [fahrenheit, setFahrenheit] = useState(32);

	const handleCelsiusChange = (e) => {
		const value = e.target.value;
		setCelsius(value);
		setFahrenheit(((value * 9) / 5 + 32).toFixed(2));
	};

	const handleFahrenheitChange = (e) => {
		const value = e.target.value;
		setFahrenheit(value);
		setCelsius((((value - 32) * 5) / 9).toFixed(2));
	};

	return (
		<div className="temperature-converter">
			<h1>Temperature Converter</h1>
			<div className="converter-container">
				<div className="input-group">
					<label htmlFor="celsius">Celsius:</label>
					<input
						id="celsius"
						type="number"
						value={celsius}
						onChange={handleCelsiusChange}
					/>
					<span>°C</span>
				</div>

				<div className="input-group">
					<label htmlFor="fahrenheit">Fahrenheit:</label>
					<input
						id="fahrenheit"
						type="number"
						value={fahrenheit}
						onChange={handleFahrenheitChange}
					/>
					<span>°F</span>
				</div>
			</div>
		</div>
	);
}

export default TemperatureConverter;
