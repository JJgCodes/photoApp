import { Picture } from '../services/api'

const paginate = (photoData: Picture[], items?: number) => {
	//* created a default of 18 however function can accept a number *//
	const itemsPerPage = items || 18
	// pages calculations
	const pages = Math.ceil(photoData.length / itemsPerPage)
	const paginatedArray = []

	for (let i = 0; i < pages; i++) {
		const start = i * itemsPerPage
		const end = start + itemsPerPage
		paginatedArray.push(photoData.slice(start, end))
	}

	return paginatedArray
}

export default paginate
