import { Picture } from '../pages/Album/Album'

const paginate = (photoData: Picture[], items?: number) => {
	//* created a default of 12 however function can accept a number *//
	const itemsPerPage = items || 12
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
