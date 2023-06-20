import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	page: 1,
}

const pageSlice = createSlice({
	name: 'currentPage',
	initialState,
	reducers: {
		setPage(state, action) {
			state.page = action.payload
		},
	},
})

export const { setPage } = pageSlice.actions
export default pageSlice.reducer
