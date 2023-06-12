import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { incrementPage, decrementPage } from '../../state/pageSlice'

const PageControl = () => {
	const { page: currentPage } = useSelector((state: RootState) => state.currentPage)
    const { paginatedData } = useSelector((state: RootState) => state.paginatedData)

	const dispatch = useDispatch<AppDispatch>()
	const nextPage = () => dispatch(incrementPage())
	const previousPage = () => dispatch(decrementPage())

	return (
		<div className="pagination">
			<button disabled={currentPage === 1} onClick={() => previousPage()}>
				Previous
			</button>
			<span>
				{currentPage} / {paginatedData.length}
			</span>
			<button disabled={currentPage === paginatedData.length} onClick={() => nextPage()}>
				Next
			</button>
		</div>
	)
}
export default PageControl
