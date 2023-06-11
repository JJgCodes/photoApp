import { configureStore } from '@reduxjs/toolkit'
import apiSlice from './state/apiSlice'
import pageSlice from './state/pageSlice'
import paginationSlice from './state/paginationSlice'
import modalSlice from './state/modalSlice'

const store = configureStore({
	reducer: {
		photoData: apiSlice,
		currentPage: pageSlice,
		paginatedData: paginationSlice,
		modal: modalSlice,
	},
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
