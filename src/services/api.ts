export interface Picture {
	albumId: number
	id: number
	title: string
	thumbnailUrl: string
	url: string
}

const fetchPhotoData = async (): Promise<{ data: Picture[]; error: string }> => {
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/photos')
		const data = await response.json()
		if (!response.ok) {
			throw new Error('Failed to fetch photo data')
		}
		return { data, error: '' }
	} catch (error: any) {
		const errorMessage = error.message || 'An error occurred'
		console.log(errorMessage)
		return { data: [], error: errorMessage }
	}
}

export default fetchPhotoData
