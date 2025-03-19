<script>
let celsius = '0'
let fahrenheit = '32'

function handleCelsiusChange(event) {
	celsius = event.target.value
	if (celsius !== '') {
		fahrenheit = ((Number(celsius) * 9) / 5 + 32).toFixed(2)
	} else {
		fahrenheit = ''
	}
}

function handleFahrenheitChange(event) {
	fahrenheit = event.target.value
	if (fahrenheit !== '') {
		celsius = (((Number(fahrenheit) - 32) * 5) / 9).toFixed(2)
	} else {
		celsius = ''
	}
}
</script>

<div class="temperature-converter">
  <h1>Temperature Converter</h1>
  <div class="converter-container">
    <div class="input-group">
      <label for="celsius">Celsius:</label>
      <input id="celsius" type="number" bind:value={celsius} on:input={handleCelsiusChange} />
      <span>°C</span>
    </div>
    <div class="input-group">
      <label for="fahrenheit">Fahrenheit:</label>
      <input id="fahrenheit" type="number" bind:value={fahrenheit} on:input={handleFahrenheitChange} />
      <span>°F</span>
    </div>
  </div>
</div>
