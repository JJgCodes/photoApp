import { useDispatch, useSelector } from 'react-redux'
import { Picture } from '../../pages/Album/Album'
import { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../store'
import { setPaginatedData } from '../../state/paginationSlice'
import { setModalOpen, setModalPicture } from '../../state/modalSlice'
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material'
import paginate from '../../utils/pagination'

const Cards = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { data } = useSelector((state: RootState) => state.photoData)
	const currentPage = useSelector((state: RootState) => state.currentPage.page)

	const paginatedData = paginate(data)
	const currentData = paginatedData[currentPage - 1]

	useEffect(() => {
		dispatch(setPaginatedData(paginate(data)))
	}, [dispatch, data])

	const CardItem = ({ picture }: { picture: Picture }) => {
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
			<Card
				sx={{
					maxHeight: 400,
					width: 180,
					margin: 2,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					'&:hover': { transform: 'scale3d(1.02, 1.02, 1)' },
				}}
				onClick={() => handleCardClick()}
			>
				{isError && !isLoading && (
					<Typography className="error-text" data-testid={picture.title}>
						Error loading image
					</Typography>
				)}
				{isLoading && <Typography>Loading.....</Typography>}
				<CardMedia
					component="img"
					image={picture.thumbnailUrl}
					alt={picture.title}
					onLoad={handleImageLoad}
					onError={handleImageError}
				/>

				<CardContent>
					<Typography gutterBottom>{picture.title}</Typography>
				</CardContent>
				<CardContent
					sx={{
						margin: 0,
					}}
					className="card-album-id"
				>
					<Typography color="text.secondary">Album ID: {picture.albumId}</Typography>
				</CardContent>
			</Card>
		)
	}

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				flexWrap: 'wrap',
			}}
		>
			{currentData &&
				currentData.map((picture: Picture, index) => <CardItem key={index} picture={picture} />)}
		</Box>
	)
}

export default Cards
