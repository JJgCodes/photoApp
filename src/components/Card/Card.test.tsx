import { fireEvent, render, screen } from '@testing-library/react'
import Card from './Card'

describe('Card', () => {
	const picture = {
		albumId: 10,
		id: 1,
		title: 'photo1',
		thumbnailUrl: '',
		url: '',
	}
	const onClickMock = jest.fn()
	const cardRender = () => render(<Card picture={picture} onClick={onClickMock} />)

	test('Should render without errors', () => {
		cardRender()
	})

	test('Should display loading state', () => {
		cardRender()
		const loadingText = screen.getByText('Loading.....')
		expect(loadingText).toBeInTheDocument()
	})

	// test('Should display error state', () => {

	// })

	test('Should call onClick function/modal when clicked', () => {
		cardRender()
		const cardElement = screen.getByTestId('card')
		fireEvent.click(cardElement)
		expect(onClickMock).toHaveBeenCalledTimes(1)
	})
})
