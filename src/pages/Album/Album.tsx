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

const Album = () => {
	// redux state
	const dispatch = useDispatch<AppDispatch>()
	const { error, status } = useSelector((state: RootState) => state.photoData)
	const { isOpen } = useSelector((state: RootState) => state.modal)

	useEffect(() => {
		dispatch(getPhotoData())
	}, [dispatch])

	return (
		<div className="album">
			<h1>Photo Album Viewer</h1>
			{status === 'failed' && <p className="error-message">{error}</p>}
			{/* Cards */}
			{status === 'succeeded' && (
				<div>
					<Cards />
					<PageControl />
				</div>
			)}
			{/* Modal */}
			{isOpen && <Modal />}
		</div>
	)
}

export default Album
