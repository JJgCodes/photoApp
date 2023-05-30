/*
    1. Test Modal Renders correctly
    2. Test the Loading state
    3. Test the error state
    4. Test Modal close
    5. Test image is correctly loaded?
*/

import Modal from './Modal'
import { Picture } from '../../services/api'
import { fireEvent, render, screen } from '@testing-library/react'

const testPicture: Picture = {
	albumId: 1,
	id: 1,
	title: 'Sample Picture',
	url: 'https://example.com/image.jpg',
	thumbnailUrl: 'https://example.com/thumbnail.jpg',
}

// 1.
test('Should render the Modal with no error', async () => {
	const onClose = jest.fn()
	render(<Modal picture={testPicture} onClose={onClose} />)
})

// 2.
test('Should display Loading test when loading state is true', () => {
	const onClose = jest.fn()
	render(<Modal picture={testPicture} onClose={onClose} />)
	const loadingText = screen.getByText('Loading.....')
	expect(loadingText).toBeInTheDocument()
})

// 3. - had trouble trying to select by element, gave img data-testid attribute as a work around data-testid="thumbnail-img"
test('Should display error text when isError is true', () => {
	const onClose = jest.fn()
	render(<Modal picture={testPicture} onClose={onClose} />)
	fireEvent.error(screen.getByTestId('thumbnail-img'))
	const errorText = screen.getByText('Error loading image')
	expect(errorText).toBeInTheDocument()
})

// 4. close buttons exsist , tested with data-testid - *loaded-close-button*
test('Close button is displayed when isLoading is false', () => {
	const onClose = jest.fn()
	render(<Modal picture={testPicture} onClose={onClose} />)
	const closeButton = screen.getByTestId('loaded-close-button')
	expect(closeButton).toBeInTheDocument()
})

// 5.