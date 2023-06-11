import { createSlice } from '@reduxjs/toolkit'
import { Picture } from '../pages/Album/Album'

interface ModalState {
	picture: Picture
	isOpen: boolean
}

const initialState: ModalState = {
	picture: {
		albumId: 0,
		id: 0,
		title: '',
		thumbnailUrl: '',
		url: '',
	},
	isOpen: false,
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setModalPicture: (state, action) => {
			state.picture = action.payload
		},

		setModalOpen: (state, action) => {
			state.isOpen = action.payload
		},
	},
})

export const { setModalOpen, setModalPicture } = modalSlice.actions

export default modalSlice.reducer
