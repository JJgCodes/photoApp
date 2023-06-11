import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	page: 1,
}

const pageSlice = createSlice({
	name: 'currentPage',
	initialState,
	reducers: {
		incrementPage(state) {
			state.page += 1
		},
		decrementPage(state) {
			state.page -= 1
		},
		setPage(state, action) {
			state.page = action.payload
		},
	},
})

export const { incrementPage, decrementPage, setPage } = pageSlice.actions
export default pageSlice.reducer
