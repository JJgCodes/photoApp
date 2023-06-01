import { fireEvent, render, screen } from '@testing-library/react'
import Card from './Card'

describe('Card', () => {
	const picture = {
		albumId: 10,
		id: 1,
		title: 'photo1',
		thumbnailUrl: 'photo1.jpg',
		url: 'photo1.jpg',
	}
	const onClickMock = jest.fn()
	const cardRender = () => render(<Card picture={picture} onClick={onClickMock} />)

	it('Should render without errors', () => {
		cardRender()
	})

	it('Should display loading state', () => {
		cardRender()
		const loadingText = screen.getByText('Loading.....')
		expect(loadingText).toBeInTheDocument()
	})

	it('Should display error state', () => {
		cardRender()
		const image = screen.getByAltText(picture.title)
		fireEvent.error(image)
		const errorText = screen.getByText('Error loading image')
		expect(errorText).toBeInTheDocument()
	})

	it('Should call onClick function/modal when clicked', () => {
		cardRender()
		const cardElement = screen.getByTestId('card')
		fireEvent.click(cardElement)
		expect(onClickMock).toHaveBeenCalledTimes(1)
	})
})
