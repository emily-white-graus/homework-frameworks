<script lang="js">
let celsius = '0'
let fahrenheit = '32'

function handleCelsiusChange(e) {
	celsius = e.target.value
	fahrenheit = ((Number(celsius) * 9) / 5 + 32).toFixed(2)
}

function handleFahrenheitChange(e) {
	fahrenheit = e.target.value
	celsius = (((Number(fahrenheit) - 32) * 5) / 9).toFixed(2)
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