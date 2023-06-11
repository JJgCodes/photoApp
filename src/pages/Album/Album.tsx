import './Album.css'
import Card from '../../components/Card/Card'
import Modal from '../Modal/Modal'
import { useEffect } from 'react'
import { getPhotoData } from '../../state/apiSlice'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { incrementPage, decrementPage } from '../../state/pageSlice'

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
	const { error, status } = useSelector((state: RootState) => state.photoData) // Access the state from Redux
	const { paginatedData } = useSelector((state: RootState) => state.paginatedData)
	const { page } = useSelector((state: RootState) => state.currentPage) // Access the state from Redux
	const { isOpen } = useSelector((state: RootState) => state.modal)

	// useEffect load data on mount
	useEffect(() => {
		dispatch(getPhotoData())
	}, [dispatch])

	return (
		<div className="album">
			<h1>Photo Album Viewer</h1>
			{status === 'failed' && <p className="error-message">{error}</p>}
			{/* Cards */}
			{status === 'succeeded' && paginatedData && <Card />}
			<div className="pagination">
				<button disabled={page === 1} onClick={() => dispatch(decrementPage())}>
					Previous
				</button>
				<span>
					{page} / {paginatedData.length}
				</span>
				<button
					onClick={() => dispatch(incrementPage())}
					disabled={page === paginatedData.length -1 }
				>
					Next
				</button>
			</div>
			{/* Modal */}
			{isOpen && <Modal />}
		</div>
	)
}

export default Album
