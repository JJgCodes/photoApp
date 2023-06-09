import './Modal.css'
import { Picture } from '../../pages/Album/Album'
import { useState } from 'react'

export interface ModalProps {
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
		<div className="modal" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
							<div className="loading-text">
								<p>Loading.....</p>
								<button className="close-button" onClick={onClose}>
									X
								</button>
							</div>
						)}
						<div className={isLoading ? 'modal-unloaded' : 'modal-loaded'}>
							<img
								data-testid="thumbnail-img"
								className="thumbnail-img"
								src={picture.url}
								alt={picture.title}
								onLoad={handleImageLoad}
								onError={handleImageError}
							/>
							<button data-testid="loaded-close-button" className="close-button" onClick={onClose}>
								X
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Modal
