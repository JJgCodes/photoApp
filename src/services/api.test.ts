import fetchPhotoData from './api'
import { Picture } from '../pages/Album/Album'

describe('API', () => {
	it('Should return an array of Picture objects', async () => {
		const result = await fetchPhotoData()
		expect(Array.isArray(result.data)).toBe(true)
		expect(result.data.length).toBeGreaterThan(0)
		const firstPicture: Picture = result.data?.[0]
		expect(firstPicture.albumId).toBeDefined()
		expect(firstPicture.id).toBeDefined()
		expect(firstPicture.title).toBeDefined()
		expect(firstPicture.thumbnailUrl).toBeDefined()
		expect(firstPicture.url).toBeDefined()
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
		} as any as Response)
		const result = await fetchPhotoData()
		expect(result.error).toBe(error)
	})

	it('Should return an error message if data is empty', async () => {
		const error = 'Failed to fetch photo data'
		const emptyData: any = []
		jest.spyOn(global, 'fetch').mockResolvedValueOnce({
			json: jest.fn().mockResolvedValue(emptyData),
		} as any as Response)

		const result = await fetchPhotoData()
		expect(result.data).toEqual(emptyData)
		expect(result.error).toBe(error)
	})
})
