import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import fetchPhotoData from '../services/api'
import { Picture } from '../pages/Album/Album'

interface apiState {
	data: Picture[]
	error: string
	status: 'loading' | 'succeeded' | 'failed'
}

const initialState: apiState = {
	data: [],
	error: '',
	status: 'loading',
}

export const getPhotoData = createAsyncThunk('photoData/getData', async () => {
	try {
		const response = await fetchPhotoData()
		if (response.error) {
			throw new Error(response.error)
		}
		return response.data
	} catch (error) {
		throw error
	}
})

const apiSlice = createSlice({
	name: 'photoData',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getPhotoData.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getPhotoData.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.data = action.payload
			})
			.addCase(getPhotoData.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message || 'An error occurred'
			})
	},
})

export default apiSlice.reducer
