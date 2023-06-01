import fetchPhotoData from './api'

describe('API', () => {
	it('Should return an array of Picture objects', async () => {
		const result = await fetchPhotoData()
		expect(Array.isArray(result.data)).toBe(true)
		expect(result.data?.length).toBeGreaterThan(0)
		expect(result.data?.[0]).toHaveProperty('albumId')
		expect(result.data?.[0]).toHaveProperty('id')
		expect(result.data?.[0]).toHaveProperty('title')
		expect(result.data?.[0]).toHaveProperty('thumbnailUrl')
		expect(result.data?.[0]).toHaveProperty('url')
	})

	it('Should return an error message on error', async () => {
		const error = 'Failed to fetch data'
		jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error(error))
		const result = await fetchPhotoData()
		expect(result.error).toBe(error)
	})

	it('Should return an error message if request not ok', async () => {
		const error = 'Failed to fetch photo data'
		jest.spyOn(global, 'fetch').mockResolvedValueOnce({
			ok: false,
			json: jest.fn(),
		} as any)
		const result = await fetchPhotoData()
		expect(result.error).toBe(error)
	})

	it('Should return an error message if data is empty', async () => {
		const error = 'Failed to fetch photo data'
		const emptyData: any = []
		jest.spyOn(global, 'fetch').mockResolvedValueOnce({
			ok: true,
			json: jest.fn().mockResolvedValue(emptyData),
		} as any)

		const result = await fetchPhotoData()
		expect(result.data).toEqual(emptyData)
		expect(result.error).toBe(error)
	})
})
