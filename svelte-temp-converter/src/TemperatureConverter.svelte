<script>
import { onMount } from 'svelte'

// State variables
let catFact = ''
let catImage = ''
let isLoadingImage = false
let isLoadingFact = false
let imageTitle = 'CAT SWIMMING IN ORANGE JUICE'

// List of funny cat titles
const titles = [
	'CAT ATTEMPTING PARKOUR',
	'CAT DEMANDING ATTENTION',
	'CAT STARING INTO THE VOID',
	'CAT CHASING INVISIBLE ENEMIES',
	'CAT KNOCKING THINGS OFF SHELVES',
	'CAT HIDING IN A BOX',
	'CAT SITTING LIKE A LOAF',
	'CAT MAKING BISCUITS',
	'CAT CLAIMING YOUR LAP',
	'CAT INTERRUPTING YOUR WORK',
	'CAT SUMMONING DARK FORCES',
	'CAT TELEPORTING AT 3AM',
	'CAT STEALING YOUR SEAT',
	'CAT PERFORMING ZOOMIES',
	'CAT SILENTLY JUDGING YOU',
	'CAT PONDERING EXISTENTIAL QUESTIONS',
	'CAT BEING DRAMATIC',
	'CAT TRYING TO FIT INTO A TINY BOX',
	'CAT REFUSING TO ACKNOWLEDGE COMMANDS',
	'CAT MEOWING AT NOTHING',
	'CAT HAVING A STAREDOWN WITH A WALL',
	'CAT TURNING INTO A LIQUID',
	"CAT OCCUPYING THE DOG'S BED",
	'CAT USING YOUR LAPTOP AS A BED',
	'CAT HIDING UNDER THE COUCH',
	'CAT PRETENDING TO BE STARVING',
	'CAT RANDOMLY ATTACKING YOUR FEET',
	"CAT DECIDING YOU'RE UNWORTHY",
	'CAT BEING MAJESTIC AND CHAOTIC',
]

// Fetch cat fact
async function fetchCatFact() {
	isLoadingFact = true

	try {
		const factResponse = await fetch('https://catfact.ninja/fact')
		const factData = await factResponse.json()
		catFact = factData.fact
	} catch (error) {
		console.error('Error fetching cat fact:', error)
	} finally {
		isLoadingFact = false
	}
}

// Fetch cat image
async function fetchCatImage() {
	isLoadingImage = true

	try {
		const imageResponse = await fetch(
			'https://api.thecatapi.com/v1/images/search',
		)
		const imageData = await imageResponse.json()
		catImage = imageData[0].url

		// Generate a random funny title
		imageTitle = titles[Math.floor(Math.random() * titles.length)]
	} catch (error) {
		console.error('Error fetching cat image:', error)
	} finally {
		isLoadingImage = false
	}
}

// Fetch initial data on component mount (equivalent to useEffect with empty dependency array)
onMount(() => {
	fetchCatFact()
	fetchCatImage()
})
</script>

<div class="app-container">
  <header>
    <div class="logo">✨</div>
    <h1>EMILY'S EXTRAORDINARY CAT GENERATOR</h1>
    <div class="auth-buttons">
      <button type="button" class="login-btn">
        LOG IN
      </button>
      <button type="button" class="signup-btn">
        SIGN UP
      </button>
    </div>
  </header>

  <main>
    <div class="content-container">
      <div class="image-container">
        {#if isLoadingImage}
          <div class="loading">Loading image...</div>
        {:else}
          <h2>{imageTitle}</h2>
          <img src={catImage} alt="Random Cat" class="cat-image" />
        {/if}
      </div>

      <div class="generator-container">
        <h2>CAT FACTS</h2>
        <div class="fact-container">
          {#if isLoadingFact}
            <div class="loading-text">Loading fact...</div>
          {:else}
            {catFact}
          {/if}
        </div>

        <div class="button-container">
          <button
            type="button"
            class="generate-btn image-btn"
            on:click={fetchCatImage}
            disabled={isLoadingImage}
          >
            NEW CAT IMAGE
          </button>

          <button
            type="button"
            class="generate-btn fact-btn"
            on:click={fetchCatFact}
            disabled={isLoadingFact}
          >
            NEW CAT FACT
          </button>
        </div>
      </div>
    </div>
  </main>
</div>