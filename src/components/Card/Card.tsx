import { useDispatch, useSelector } from 'react-redux'
import { Picture } from '../../pages/Album/Album'
import './Card.css'
import { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../store'
import { setPaginatedData } from '../../state/paginationSlice'
import paginate from '../../utils/pagination'
import { setModalOpen, setModalPicture } from '../../state/modalSlice'

const Card = (picture: Picture, index: number) => {
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	const dispatch = useDispatch<AppDispatch>()

	const handleImageLoad = () => {
		setIsLoading(false)
	}

	const handleImageError = () => {
		setIsLoading(false)
		setIsError(true)
	}

	const handleCardClick = () => {
		dispatch(setModalPicture(picture))
		dispatch(setModalOpen(true))
	}

	return (
		<div className="card" onClick={handleCardClick} key={index}>
			{isError && !isLoading && (
				<div className="error-text" data-testid={picture.title}>
					<p>Error loading image</p>
				</div>
			)}
			<div className="img-container">
				{isLoading && <p className="loading-text">Loading.....</p>}
				<img
					src={picture.thumbnailUrl}
					alt={picture.title}
					onLoad={handleImageLoad}
					onError={handleImageError}
				/>
			</div>
			<div className="card-content">
				<h5 className="card-title">{picture.title}</h5>
				<p className="card-album-id">Album ID: {picture.albumId}</p>
			</div>
		</div>
	)
}

const Cards = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { data, status } = useSelector((state: RootState) => state.photoData) // Access the state from Redux
	const currentPage = useSelector((state: RootState) => state.currentPage.page) // Access the state from Redux

	const paginatedData = paginate(data)
	const currentData = paginatedData[currentPage - 1]

	useEffect(() => {
		dispatch(setPaginatedData(paginate(data)))
	}, [dispatch, data])

	return (
		<div className="card-container">
			{status === 'succeeded' && currentData.map((picture: Picture, index) => Card(picture, index))}
		</div>
	)
}

export default Cards
