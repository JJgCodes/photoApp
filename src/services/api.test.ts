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

	it('Should return an error message', async () => {
		const error = 'Failed to fetch data'
		jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error(error))
		const result = await fetchPhotoData()
		expect(result.error).toBe(error)
		jest.spyOn(global, 'fetch').mockRestore()
	})
})
