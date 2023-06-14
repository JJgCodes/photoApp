import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import Card from './Card'

describe('Card', () => {
	const mockPhotoData = [
		{
			albumId: 1,
			id: 1,
			title: 'photo1',
			thumbnailUrl: 'photo1.jpg',
			url: 'photo1.jpg',
		},
		{
			albumId: 2,
			id: 2,
			title: 'photo2',
			thumbnailUrl: 'photo2.jpg',
			url: 'photo2.jpg',
		},
		{
			albumId: 3,
			id: 3,
			title: 'photo3',
			thumbnailUrl: 'photo3.jpg',
			url: 'photo3.jpg',
		},
		{
			albumId: 4,
			id: 4,
			title: 'photo4',
			thumbnailUrl: 'photo4.jpg',
			url: 'photo4.jpg',
		},
		{
			albumId: 5,
			id: 5,
			title: 'photo5',
			thumbnailUrl: 'photo5.jpg',
			url: 'photo5.jpg',
		},
		{
			albumId: 6,
			id: 6,
			title: 'photo6',
			thumbnailUrl: 'photo6.jpg',
			url: 'photo6.jpg',
		},
		{
			albumId: 7,
			id: 7,
			title: 'photo7',
			thumbnailUrl: 'photo7.jpg',
			url: 'photo7.jpg',
		},
		{
			albumId: 8,
			id: 8,
			title: 'photo8',
			thumbnailUrl: 'photo8.jpg',
			url: 'photo8.jpg',
		},
		{
			albumId: 9,
			id: 9,
			title: 'photo9',
			thumbnailUrl: 'photo9.jpg',
			url: 'photo9.jpg',
		},
		{
			albumId: 10,
			id: 10,
			title: 'photo10',
			thumbnailUrl: 'photo10.jpg',
			url: 'photo10.jpg',
		},
		{
			albumId: 11,
			id: 11,
			title: 'photo11',
			thumbnailUrl: 'photo11.jpg',
			url: 'photo11.jpg',
		},
		{
			albumId: 12,
			id: 12,
			title: 'photo12',
			thumbnailUrl: 'photo12.jpg',
			url: 'photo12.jpg',
		},
		{
			albumId: 13,
			id: 13,
			title: 'photo13',
			thumbnailUrl: 'photo13.jpg',
			url: 'photo13.jpg',
		},
		{
			albumId: 14,
			id: 14,
			title: 'photo14',
			thumbnailUrl: 'photo14.jpg',
			url: 'photo14.jpg',
		},
		{
			albumId: 15,
			id: 15,
			title: 'photo15',
			thumbnailUrl: 'photo15.jpg',
			url: 'photo15.jpg',
		},
		{
			albumId: 16,
			id: 16,
			title: 'photo16',
			thumbnailUrl: 'photo16.jpg',
			url: 'photo16.jpg',
		},
		{
			albumId: 17,
			id: 17,
			title: 'photo17',
			thumbnailUrl: 'photo17.jpg',
			url: 'photo17.jpg',
		},
		{
			albumId: 18,
			id: 18,
			title: 'photo18',
			thumbnailUrl: 'photo18.jpg',
			url: 'photo18.jpg',
		},
		{
			albumId: 19,
			id: 19,
			title: 'photo19',
			thumbnailUrl: 'photo19.jpg',
			url: 'photo19.jpg',
		},
		{
			albumId: 20,
			id: 20,
			title: 'photo20',
			thumbnailUrl: 'photo20.jpg',
			url: 'photo20.jpg',
		},
	]

	// Create a mock store
	const mockStore = configureMockStore([])
	let storeMock: any

	beforeEach(() => {
		// Initialize the mock store
		storeMock = mockStore({
			photoData: {
				data: mockPhotoData,
				status: 'succeeded',
			},
			currentPage: {
				page: 1,
			},
		})
	})


	const renderCards = () => {
		render(
			<Provider store={storeMock}>
				<Card />
			</Provider>
		)
	}

	it('Should render without errors', () => {
		renderCards()
	})

	test('should display loading state when data is being fetched', () => {
		renderCards()
		const loadingTexts = screen.queryAllByText('Loading.....')
		expect(loadingTexts.length).toBeGreaterThan(0)
	})

	it('Should display error state for a specific card', () => {
		renderCards()
        const getImg = screen.getByAltText('photo1')
        fireEvent.error(getImg)
		const errorTextElements = screen.getByText('Error loading image')
		expect(errorTextElements).toBeInTheDocument()
	})

	it('Should call onClick function/modal when clicked', () => {
		const onClickMock = jest.fn() // Create a mock function
		renderCards()
		const cardElement = screen.getByAltText('photo1')
		cardElement.onclick = onClickMock
		fireEvent.click(cardElement)
		expect(onClickMock).toHaveBeenCalledTimes(1)
	})
})
