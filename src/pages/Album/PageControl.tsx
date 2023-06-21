import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { setPage } from '../../state/pageSlice'
import { Pagination, Box } from '@mui/material'

const PageControl = () => {
	const { page } = useSelector((state: RootState) => state.currentPage)
	const { paginatedData } = useSelector((state: RootState) => state.paginatedData)

	const dispatch = useDispatch<AppDispatch>()

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		dispatch(setPage(value))
	}

	return (
		<Box display="flex" justifyContent="center" mt={5}>
			<Pagination
				count={paginatedData.length}
				variant="outlined"
				onChange={handlePageChange}
				page={page}
			/>
		</Box>
	)
}
export default PageControl
