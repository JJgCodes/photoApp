import Modal from './Modal'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { setModalOpen, setModalPicture } from '../../state/modalSlice'

describe('Modal', () => {
	// Create a mock store
	const mockStore = configureStore([])
	const store = mockStore({ modal: { picture: { url: 'test-url', title: 'test-title' } } })

	const modalRender = () =>
		render(
			<Provider store={store}>
				<Modal />
			</Provider>
		)

	it('Should render with no error', async () => {
		modalRender()
		const modalObj = screen.getByText('Loading.....')
		expect(modalObj).toBeInTheDocument()
	})

	it('Should display error text when isError is true', () => {
		modalRender()
		fireEvent.error(screen.getByTestId('thumbnail-img'))
		const errorText = screen.getByText('Error loading image')
		expect(errorText).toBeInTheDocument()
	})

	it('Should display Close button when isLoading is false', () => {
		modalRender()
		const closeButton = screen.getByTestId('loaded-close-button')
		expect(closeButton).toBeInTheDocument()
	})
	it('Should close modal when the close button is clicked', () => {
		modalRender()
		const closeButton = screen.getByTestId('loaded-close-button')
		fireEvent.click(closeButton)
		// Mock the event actions of the close button click
		const actions = store.getActions()
		expect(actions).toContainEqual(setModalOpen(false))
		expect(actions).toContainEqual(setModalPicture([]))
	})
})
