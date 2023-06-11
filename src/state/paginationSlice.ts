import { createSlice } from '@reduxjs/toolkit'

interface PaginationState {
	paginatedData: []
}

const initialState: PaginationState = {
	paginatedData: [],
}

const paginationSlice = createSlice({
	name: 'pagination',
	initialState,
	reducers: {
		setPaginatedData: (state, action) => {
			state.paginatedData = action.payload
		},
	},
})

export const { setPaginatedData } = paginationSlice.actions

export default paginationSlice.reducer
