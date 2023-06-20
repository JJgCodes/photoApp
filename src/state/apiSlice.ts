import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import fetchPhotoData from '../services/api'
import { Picture } from '../pages/Album/Album'

export enum Status {
	Loading = 'loading',
	Succeeded = 'succeeded',
	Failed = 'failed',
}

interface apiState {
	data: Picture[]
	error: string
	status: Status
}

const initialState: apiState = {
	data: [],
	error: '',
	status: Status.Loading,
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
				state.status = Status.Loading
			})
			.addCase(getPhotoData.fulfilled, (state, action) => {
				state.status = Status.Succeeded
				state.data = action.payload
			})
			.addCase(getPhotoData.rejected, (state, action) => {
				state.status = Status.Failed
				state.error = action.error.message || 'An error occurred'
			})
	},
})

export default apiSlice.reducer
