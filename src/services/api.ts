const fetchPhotoData = async () => {
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/photos')
		const data = await response.json()
		if (!response.ok) {
			throw new Error('Failed to fetch photo data')
		}
		return { data, error: null }
	} catch (error: any) {
		const errorMessage = error.message || 'An error occurred'
		return { data: [], error: errorMessage }
	}
}

export default fetchPhotoData
