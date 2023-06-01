import paginate from './pagination'

describe('Paginate', () => {
	// mock data
	const photoData = [
		{
			albumId: 10,
			id: 1,
			title: 'photo1',
			thumbnailUrl: 'photo1.jpg',
			url: 'fullsizePhoto1.jp',
		},
		{
			albumId: 20,
			id: 2,
			title: 'photo2',
			thumbnailUrl: 'photo2.jpg',
			url: 'fullsizePhoto2.jp',
		},
		{
			albumId: 30,
			id: 3,
			title: 'photo3',
			thumbnailUrl: 'photo3.jpg',
			url: 'fullsizePhoto3.jp',
		},
		{
			albumId: 40,
			id: 4,
			title: 'photo4',
			thumbnailUrl: 'photo4.jpg',
			url: 'fullsizePhoto4.jp',
		},
		{
			albumId: 50,
			id: 5,
			title: 'photo5',
			thumbnailUrl: 'photo5.jpg',
			url: 'fullsizePhoto5.jp',
		},
	]

	test('Should return an array using default itemsPerPage of 18 in function', () => {
		const expectedPaginatedArray = [photoData]
		const result = paginate(photoData)
		expect(result).toEqual(expectedPaginatedArray)
	})

	test('Should handle the itemsPerPage argument in paginate function', () => {
		// show 2 items match the paginated array
		const testPhotoData = photoData.slice(0, 2)
		const expectedPaginatedArray = [photoData.slice(0, 2)]

		const result = paginate(testPhotoData, 4)
		expect(result).toEqual(expectedPaginatedArray)
	})

	test('Should handle empty Array', () => {
		const photoData: any = []
		const expectedPaginatedArray: any = []
		const result = paginate(photoData)
		expect(result).toEqual(expectedPaginatedArray)
	})
})
