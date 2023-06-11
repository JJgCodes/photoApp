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
	},
})

export const { incrementPage, decrementPage } = pageSlice.actions
export default pageSlice.reducer
