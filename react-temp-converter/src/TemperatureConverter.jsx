// Temperature converter component
import React, { useState, useEffect, useCallback } from 'react'

function TemperatureConverter() {
	const [catFact, setCatFact] = useState('')
	const [catImage, setCatImage] = useState('')
	const [isLoadingImage, setIsLoadingImage] = useState(false)
	const [isLoadingFact, setIsLoadingFact] = useState(false)
	const [imageTitle, setImageTitle] = useState('CAT SWIMMING IN ORANGE JUICE')

	// Fetch cat fact
	const fetchCatFact = useCallback(async () => {
		setIsLoadingFact(true)
		try {
			const factResponse = await fetch('https://catfact.ninja/fact')
			const factData = await factResponse.json()
			setCatFact(factData.fact)
		} catch (error) {
			console.error('Error fetching cat fact:', error)
		} finally {
			setIsLoadingFact(false)
		}
	}, [])

	// Fetch cat image
	const fetchCatImage = useCallback(async () => {
		setIsLoadingImage(true)
		try {
			const imageResponse = await fetch(
				'https://api.thecatapi.com/v1/images/search',
			)
			const imageData = await imageResponse.json()
			setCatImage(imageData[0].url)

			// Generate a random funny title
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
				'CAT OCCUPYING THE DOG’S BED',
				'CAT USING YOUR LAPTOP AS A BED',
				'CAT HIDING UNDER THE COUCH',
				'CAT PRETENDING TO BE STARVING',
				'CAT RANDOMLY ATTACKING YOUR FEET',
				'CAT DECIDING YOU’RE UNWORTHY',
				'CAT BEING MAJESTIC AND CHAOTIC',
			]
			setImageTitle(titles[Math.floor(Math.random() * titles.length)])
		} catch (error) {
			console.error('Error fetching cat image:', error)
		} finally {
			setIsLoadingImage(false)
		}
	}, [])

	// Fetch initial data on component mount
	useEffect(() => {
		fetchCatFact()
		fetchCatImage()
	}, [fetchCatFact, fetchCatImage])

	return (
		<div className="app-container">
			<header>
				<div className="logo">✨</div>
				<h1>EMILY'S EXTRAORDINARY CAT GENERATOR</h1>
				<div className="auth-buttons">
					<button type="button" className="login-btn">
						LOG IN
					</button>
					<button type="button" className="signup-btn">
						SIGN UP
					</button>
				</div>
			</header>

			<main>
				<div className="content-container">
					<div className="image-container">
						{isLoadingImage ? (
							<div className="loading">Loading image...</div>
						) : (
							<>
								<h2>{imageTitle}</h2>
								<img src={catImage} alt="Random Cat" className="cat-image" />
							</>
						)}
					</div>

					<div className="generator-container">
						<h2>CAT FACTS</h2>
						<div className="fact-container">
							{isLoadingFact ? (
								<div className="loading-text">Loading fact...</div>
							) : (
								catFact
							)}
						</div>

						<div className="button-container">
							<button
								type="button"
								className="generate-btn image-btn"
								onClick={fetchCatImage}
								disabled={isLoadingImage}
							>
								NEW CAT IMAGE
							</button>

							<button
								type="button"
								className="generate-btn fact-btn"
								onClick={fetchCatFact}
								disabled={isLoadingFact}
							>
								NEW CAT FACT
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default TemperatureConverter
