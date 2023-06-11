import './Modal.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { setModalOpen, setModalPicture } from '../../state/modalSlice'

const Modal = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)

	const dispatch = useDispatch<AppDispatch>()
	const { picture } = useSelector((state: RootState) => state.modal) // Access the state from Redux

	const handleImageLoad = () => {
		setIsLoading(false)
	}
	const handleImageError = () => {
		setIsLoading(false)
		setIsError(true)
	}

	const handleModalClose = () => {
		dispatch(setModalOpen(false))
		dispatch(setModalPicture([]))
	}

	const closeButton = (testId?: string) => {
		return (
			<button data-testid={testId || ''} className="close-button" onClick={handleModalClose}>
				X
			</button>
		)
	}


	return (
		<div className="modal" onClick={handleModalClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				{isError && !isLoading ? (
					<div className="error-text">
						{closeButton()}
						<p>Error loading image</p>
					</div>
				) : (
					<div>
						{isLoading && (
							<div className="loading-text">
								<p>Loading.....</p>
								{closeButton()}
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
							{closeButton('loaded-close-button')}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Modal
