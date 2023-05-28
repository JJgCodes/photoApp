import React, { useEffect, useState } from 'react'
import './Album.css'
import fetchPhotoData, { Picture } from '../../services/api'
import paginate from '../../utils/pagination'
import Card from '../../components/Card/Card'
import Modal from '../Modal/Modal'

const Album = () => {
	// state
	const [photoData, setPhotoData] = useState<Picture[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [modalOpen, setModalOpen] = useState(false)
	const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null)
	const [errorMessage, setErrorMessage] = useState<string | null>('')

	// useEffect load data on mount
	useEffect(() => {
		const fetchData = async () => {
			const { data, error } = await fetchPhotoData()
			if (error) {
				setErrorMessage(error)
			} else {
				setPhotoData(data)
			}
		}
		fetchData()
	}, [])

	// functions handling click and modal
	const handleCardClick = (picture: Picture) => {
		setSelectedPicture(picture)
		setModalOpen(true)
	}

	const handleModalClose = () => {
		setModalOpen(false)
		setSelectedPicture(null)
	}

	// Pagination
	const paginatedData = paginate(photoData)
	const currentData = paginatedData[currentPage - 1]

	return (
		<div className="album">
			<h1>Photo Album Viewer</h1>
			{errorMessage && <p className="error-message">{errorMessage}</p>}
			{/* Cards */}
			<div className="card-container">
				{currentData &&
					currentData.length > 0 &&
					currentData.map((picture: Picture) => (
						<Card
							key={picture.id}
							title={picture.title}
							albumId={picture.albumId}
							imageUrl={picture.thumbnailUrl}
							onClick={() => handleCardClick(picture)}
						/>
					))}
			</div>
			{/* page control/pagination */}
			<div className="pagination">
				<button
					disabled={currentPage === 1}
					onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
				>
					Previous
				</button>
				<span>
					{currentPage} / {paginatedData.length}
				</span>
				<button
					disabled={currentPage === paginatedData.length}
					onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
				>
					Next
				</button>
			</div>
			{/* Modal */}
			{modalOpen && selectedPicture && (
				<Modal picture={selectedPicture} onClose={handleModalClose} />
			)}
		</div>
	)
}

export default Album
