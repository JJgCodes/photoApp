import { useDispatch, useSelector } from 'react-redux'
import { Picture } from '../../pages/Album/Album'
import './Card.css'
import { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../store'
import { setPaginatedData } from '../../state/paginationSlice'
import paginate from '../../utils/pagination'
import { setModalOpen, setModalPicture } from '../../state/modalSlice'

const Cards = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { data } = useSelector((state: RootState) => state.photoData)
	const currentPage = useSelector((state: RootState) => state.currentPage.page)

	const paginatedData = paginate(data)
	const currentData = paginatedData[currentPage - 1]

	useEffect(() => {
		dispatch(setPaginatedData(paginate(data)))
	}, [dispatch, data])

	const Card = ({ picture }: { picture: Picture }) => {
		const [isLoading, setIsLoading] = useState(true)
		const [isError, setIsError] = useState(false)

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
			<div className="card" onClick={handleCardClick}>
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

	return (
		<div className="card-container">
			{currentData && currentData.map((picture: Picture, index) => (
				<Card key={index} picture={picture} />
			))}
		</div>
	)
}

export default Cards
