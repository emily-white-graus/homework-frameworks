// Temperature converter component
import React, { useCallback, useEffect, useReducer } from 'react'

// generic fetch reducer to be used for fact + image
const INITIAL_STATE = { isLoading: false, data: null, error: null }
const fetchReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case 'FETCH_START':
			return { ...state, isLoading: true }
		case 'FETCH_SUCCESS':
			return { isLoading: false, data: action.payload, error: null }
		case 'FETCH_ERROR':
			return { ...state, isLoading: false, error: action.payload }
		default:
			return state
	}
}

// simpler usage of fetchReducer
const dispatchCatFact = async (dispatch) => {
	dispatch({ type: 'FETCH_START' })
	try {
		const factResponse = await fetch('https://catfact.ninja/fact')
		const factData = await factResponse.json()
		return dispatch({ type: 'FETCH_SUCCESS', payload: factData.fact })
	} catch (error) {
		return dispatch({
			type: 'FETCH_ERROR',
			payload: error?.message || 'could not fetch cat fact',
		})
	}
}

// Generate a random funny title
const getImageTitle = () => {
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
	return titles[Math.floor(Math.random() * titles.length)]
}

// combine api data with random title generator
const dispatchCatImage = async (dispatch) => {
	dispatch({ type: 'FETCH_START' })
	try {
		const imageResponse = await fetch(
			'https://api.thecatapi.com/v1/images/search',
		)
		const imageData = await imageResponse.json()
		const payload = { url: imageData[0].url, title: getImageTitle() }
		return dispatch({ type: 'FETCH_SUCCESS', payload })
	} catch (error) {
		return dispatch({
			type: 'FETCH_ERROR',
			payload: error?.message || 'could not fetch cat image',
		})
	}
}

const CatPage = () => {
	const [fact, dispatchFact] = useReducer(fetchReducer, INITIAL_STATE)
	const [image, dispatchImage] = useReducer(fetchReducer, INITIAL_STATE)

	const fetchCatFact = useCallback(() => dispatchCatFact(dispatchFact), [])
	const fetchCatImage = useCallback(() => dispatchCatImage(dispatchImage), [])

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
						{image?.isLoading ? (
							<div className="loading">Loading image...</div>
						) : (
							<>
								{image?.data?.title && <h2>{image.data.title}</h2>}
								{image?.data?.url && (
									<img
										src={image.data.url}
										alt="Random Cat"
										className="cat-image"
									/>
								)}
							</>
						)}
					</div>

					<div className="generator-container">
						<h2>CAT FACTS</h2>
						<div className="fact-container">
							{fact?.isLoading ? (
								<div className="loading-text">Loading fact...</div>
							) : (
								fact?.data && <p>{fact.data}</p>
							)}
						</div>

						<div className="button-container">
							<button
								type="button"
								className="generate-btn image-btn"
								onClick={fetchCatImage}
								disabled={image.isLoading}
							>
								NEW CAT IMAGE
							</button>

							<button
								type="button"
								className="generate-btn fact-btn"
								onClick={fetchCatFact}
								disabled={fact.isLoading}
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

export default CatPage