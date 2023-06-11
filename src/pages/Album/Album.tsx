import './Album.css'
import Cards from '../../components/Card/Card'
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
	const currentPage = useSelector((state: RootState) => state.currentPage.page) // Access the state from Redux
	const { isOpen } = useSelector((state: RootState) => state.modal)
	
	useEffect(() => {
		dispatch(getPhotoData())
	}, [dispatch])

	return (
		<div className="album">
			<h1>Photo Album Viewer</h1>
			{status === 'failed' && <p className="error-message">{error}</p>}
			{/* Cards */}
			{status === 'succeeded' && paginatedData && <Cards />}
			<div className="pagination">
				<button disabled={currentPage === 1} onClick={() => dispatch(decrementPage())}>
					Previous
				</button>
				<span>
					{currentPage} / {paginatedData.length}
				</span>
				<button
					disabled={currentPage === paginatedData.length}
					onClick={() => dispatch(incrementPage())}
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
