import './Card.css'
import { useState } from 'react'

interface CardProps {
	title: string
	imageUrl: string
	onClick: () => void
}

const Card = ({ title, imageUrl, onClick }: CardProps) => {
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
				<div className="error-text">Error loading image</div>
			) : (
				<div className="img-container">
					{isLoading && <p className="loading-text">Loading.....</p>}
					<img
						src={imageUrl}
						alt={title}
						onLoad={handleImageLoad}
						onError={handleImageError}
						style={{ display: isLoading ? 'none' : 'block' }}
					/>
				</div>
			)}

			<div className="card-content">
				<h5 className="card-title">{title}</h5>
			</div>
		</div>
	)
}

export default Card
