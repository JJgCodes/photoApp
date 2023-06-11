import Modal from './Modal'
import { Picture } from '../../pages/Album/Album'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../store'

describe('Modal', () => {
	const testPicture: Picture = {
		albumId: 1,
		id: 1,
		title: 'Sample Picture',
		url: 'https://example.com/image.jpg',
		thumbnailUrl: 'https://example.com/thumbnail.jpg',
	}

	const modalRender = () =>
		render(
			<Provider store={store}>
				<Modal />
			</Provider>
		)

	it('Should render with no error', () => {
		modalRender()
	})

	it('Should display Loading test when loading state is true', () => {
		modalRender()
		const loadingText = screen.getByText('Loading.....')
		expect(loadingText).toBeInTheDocument()
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
})
