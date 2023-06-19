import './Album.css'
import Cards from '../../components/Card/Card'
import Modal from '../Modal/Modal'
import { useEffect } from 'react'
import { getPhotoData } from '../../state/apiSlice'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import PageControl from './PageControl'

export interface Picture {
	albumId: number
	id: number
	title: string
	thumbnailUrl: string
	url: string
}

enum Status {
	Loading = 'loading',
	Succeeded = 'succeeded',
	Failed = 'failed',
}
const Album = () => {
	// redux state
	const dispatch = useDispatch<AppDispatch>()
	const { error, status } = useSelector((state: RootState) => state.photoData)
	const { isOpen } = useSelector((state: RootState) => state.modal)

	useEffect(() => {
		dispatch(getPhotoData())
	}, [dispatch])

	const renderedOptions = () => {
		switch (status) {
			case Status.Loading:
				return <p className="loading-message">Loading....</p>
			case Status.Failed:
				return <p className="error-message">{error}</p>
			case Status.Succeeded:
				return (
					<div>
						<Cards />
						<PageControl />
						{isOpen && <Modal />}
					</div>
				)
			default:
				return <p className="error-message">Error Loading Data</p>
		}
	}

	return (
		<div className="album">
			<h1>Photo Album Viewer</h1>
			{renderedOptions()}
		</div>
	)
}

export default Album
