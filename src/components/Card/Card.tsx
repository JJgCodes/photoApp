import { Picture } from '../../services/api'
import './Card.css'
import { useState } from 'react'

interface CardProps {
	picture: Picture
	onClick: () => void
}

const Card = ({ picture, onClick }: CardProps) => {
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)

	const handleImageLoad = () => {
		setIsLoading(false)
	}

	const handleImageError = () => {
		setIsLoading(false)
		setIsError(true)
	}

	return (
		<div className="card" onClick={onClick}>
			{isError && !isLoading ? (
				<div className="error-text">
					<p>Error loading image</p>
				</div>
			) : (
				<div className="img-container">
					{isLoading && <p className="loading-text">Loading.....</p>}
					<img
						src={picture.thumbnailUrl}
						alt={picture.title}
						onLoad={handleImageLoad}
						onError={handleImageError}
						style={{ display: isLoading ? 'none' : 'block' }}
					/>
				</div>
			)}
			<div className="card-content">
				<h5 className="card-title">{picture.title}</h5>
				<p className="card-album-id">Album ID: {picture.albumId}</p>
			</div>
		</div>
	)
}

export default Card
