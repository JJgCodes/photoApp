import './Modal.css'
import { Picture } from '../../services/api'
import { useState } from 'react'

interface ModalProps {
	picture: Picture
	onClose: () => void
}

const Modal = ({ picture, onClose }: ModalProps) => {
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
		<div className="modal">
			<div className="modal-content">
				{isError && !isLoading ? (
					<div className="error-text">
						<button className="close-button" onClick={onClose}>
							X
						</button>
						<p>Error loading image</p>
					</div>
				) : (
					<div>
						{isLoading && (
							<div className='loading-text'>
								<p>Loading.....</p>
								<button className="close-button" onClick={onClose}>
									X
								</button>
							</div>
						)}

						<img
							src={picture.url}
							alt={picture.title}
							onLoad={handleImageLoad}
							onError={handleImageError}
							style={{ display: isLoading ? 'none' : 'block' }}
						/>
						<button
							className="close-button"
							onClick={onClose}
							style={{ display: isLoading ? 'none' : 'block' }}
						>
							X
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Modal
