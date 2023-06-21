import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { setModalOpen, setModalPicture } from '../../state/modalSlice'
import { Modal as ModalComponent, Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const Modal = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	const { isOpen } = useSelector((state: RootState) => state.modal)

	const dispatch = useDispatch<AppDispatch>()
	const { picture } = useSelector((state: RootState) => state.modal) // Access the state from Redux

	const handleImageLoad = () => {
		setIsLoading(false)
	}
	const handleImageError = () => {
		setIsLoading(false)
		setIsError(true)
		setIsError(false)
	}

	const handleModalClose = () => {
		dispatch(setModalOpen(false))
		dispatch(setModalPicture([]))
		setIsLoading(true)
	}

	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	}

	return (
		<ModalComponent onClose={handleModalClose} open={isOpen} disableEnforceFocus>
			<Box sx={style}>
				{isError && !isLoading ? (
					<Box
						sx={{
							bgcolor: 'white',
							padding: 2,
							display: 'flex',
						}}
					>
						<IconButton onClick={handleModalClose}>
							<CloseIcon fontSize="small" />
						</IconButton>
						<Typography>Error loading image</Typography>
					</Box>
				) : (
					<Box>
						<Box
							sx={{
								flexDirection: 'column',
								justifyContent: 'space-between',
								gap: 2,
							}}
						>
							<Box
								sx={{
									marginLeft: 'auto',
								}}
							>
								<IconButton onClick={handleModalClose}>
									<CloseIcon
										sx={{
											color: 'white',
										}}
									/>
								</IconButton>
							</Box>
							{isLoading && (
								<Typography
									sx={{
										bgcolor: 'white',
										padding: 2,
									}}
								>
									Loading.....
								</Typography>
							)}
							<img
								data-testid="thumbnail-img"
								className="thumbnail-img"
								src={picture.url}
								alt={picture.title}
								onLoad={handleImageLoad}
								onError={handleImageError}
							/>
						</Box>
					</Box>
				)}
			</Box>
		</ModalComponent>
	)
}

export default Modal
