import Cards from '../../components/Card/Card'
import Modal from '../Modal/Modal'
import { useEffect } from 'react'
import { getPhotoData, Status } from '../../state/apiSlice'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import PageControl from './PageControl'
import { Container, Typography, Box } from '@mui/material'
import './Album.css'



export interface Picture {
	albumId: number
	id: number
	title: string
	thumbnailUrl: string
	url: string
}

const Album = () => {
	// redux state
	const dispatch = useDispatch<AppDispatch>()
	const { error, status } = useSelector((state: RootState) => state.photoData)

	useEffect(() => {
		dispatch(getPhotoData())
	}, [dispatch])

	const renderedOptions = () => {
		switch (status) {
			case Status.Loading:
				return <Typography className="loading-message">Loading....</Typography>
			case Status.Failed:
				return <Typography className="error-message">{error}</Typography>
			case Status.Succeeded:
				return (
					<Container>
						<Cards />
						<PageControl />
						<Modal />
					</Container>
				)
			default:
				return <p className="error-message">Error Loading Data</p>
		}
	}

	return (
		<Box sx={{
			textAlign: 'center',
			marginBottom: 5
		}}>
			<Typography variant="h3" gutterBottom fontFamily='Source Code Pro'>
				Photo Album Viewer
			</Typography>
			{/* render the status/outcome */}
			{renderedOptions()}
		</Box>
	)
}

export default Album
