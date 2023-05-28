import { Picture } from '../services/api'

const paginate = (photoData: Picture[]) => {
	const itemsPerPage = 18
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
