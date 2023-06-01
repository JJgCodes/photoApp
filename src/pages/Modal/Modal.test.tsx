import Modal from './Modal'
import { Picture } from '../../services/api'
import { fireEvent, render, screen } from '@testing-library/react'

describe('Modal', () => {
	const testPicture: Picture = {
		albumId: 1,
		id: 1,
		title: 'Sample Picture',
		url: 'https://example.com/image.jpg',
		thumbnailUrl: 'https://example.com/thumbnail.jpg',
	}

	const onClose = jest.fn()
	const modalRender = () => render(<Modal picture={testPicture} onClose={onClose} />)

	test('Should render with no error', async () => {
		modalRender()
	})

	test('Should display Loading test when loading state is true', () => {
		modalRender()
		const loadingText = screen.getByText('Loading.....')
		expect(loadingText).toBeInTheDocument()
	})

	test('Should display error text when isError is true', () => {
		modalRender()
		fireEvent.error(screen.getByTestId('thumbnail-img'))
		const errorText = screen.getByText('Error loading image')
		expect(errorText).toBeInTheDocument()
	})

	test('Should display Close button when isLoading is false', () => {
		modalRender()
		const closeButton = screen.getByTestId('loaded-close-button')
		expect(closeButton).toBeInTheDocument()
	})
})
