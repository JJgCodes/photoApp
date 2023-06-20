import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { setPage } from '../../state/pageSlice'
import Pagination from '@mui/material/Pagination'

const PageControl = () => {
	const { page } = useSelector((state: RootState) => state.currentPage)
	const { paginatedData } = useSelector((state: RootState) => state.paginatedData)

	const dispatch = useDispatch<AppDispatch>()
	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		dispatch(setPage(value))
	}

	return (
		<div className="pagination">
			<Pagination
				count={paginatedData.length}
				variant="outlined"
				onChange={handlePageChange}
				page={page}
			/>
		</div>
	)
}
export default PageControl
