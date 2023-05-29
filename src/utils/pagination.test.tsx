import paginate from './pagination'

test('Should return a paginated array using default itemsPerPage of 18 in function', () => {
	// sample test data based on default of 18 itemsPerPage.
	const photoData = [
		{ albumId: 10, id: 1, title: 'photo1', thumbnailUrl: 'photo1.jpg', url: 'fullsizePhoto1.jp' },
		{ albumId: 20, id: 2, title: 'photo2', thumbnailUrl: 'photo2.jpg', url: 'fullsizePhoto2.jp' },
		{ albumId: 30, id: 3, title: 'photo3', thumbnailUrl: 'photo3.jpg', url: 'fullsizePhoto3.jp' },
		{ albumId: 40, id: 4, title: 'photo4', thumbnailUrl: 'photo4.jpg', url: 'fullsizePhoto4.jp' },
		{ albumId: 50, id: 5, title: 'photo5', thumbnailUrl: 'photo5.jpg', url: 'fullsizePhoto5.jp' },
	]
	const expectedPaginatedArray = [
		[
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
		],
	]

	const result = paginate(photoData)
	expect(result).toEqual(expectedPaginatedArray)
})

test('Should handle the itemsPerPage argument in paginate function', () => {
	// sample test data.
	const photoData = [
		{ albumId: 10, id: 1, title: 'photo1', thumbnailUrl: 'photo1.jpg', url: 'fullsizePhoto1.jp' },
		{ albumId: 20, id: 2, title: 'photo2', thumbnailUrl: 'photo2.jpg', url: 'fullsizePhoto2.jp' },
	]
	const expectedPaginatedArray = [
		[
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
		],
	]
	// passing argument of 4. (itemsPerPage)
	const result = paginate(photoData, 4)
	expect(result).toEqual(expectedPaginatedArray)
})

test('Should handle empty Array', () => {
	const photoData: any = []
	const expectedPaginatedArray: any = []
	const result = paginate(photoData)
	expect(result).toEqual(expectedPaginatedArray)
})
