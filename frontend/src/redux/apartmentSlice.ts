import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/apartments'

export const fetchApartments = createAsyncThunk(
	'apartments/fetchApartments',
	async () => {
		const response = await axios.get(API_URL)
		return response.data
	}
)

export const addApartment = createAsyncThunk(
	'apartments/addApartment',
	async (apartment: {
		_id: string
		name: string
		price: number
		rooms: number
	}) => {
		const response = await axios.post(API_URL, apartment)
		return response.data
	}
)

export const updateApartment = createAsyncThunk(
	'apartments/updateApartment',
	async (apartment: {
		_id: string
		name: string
		price: number
		rooms: number
	}) => {
		const response = await axios.put(`${API_URL}/${apartment._id}`, apartment)
		return response.data
	}
)

export const deleteApartment = createAsyncThunk(
	'apartments/deleteApartment',
	async (id: string) => {
		await axios.delete(`${API_URL}/${id}`)
		return id
	}
)

const apartmentSlice = createSlice({
	name: 'apartments',
	initialState: {
		apartments: [] as {
			_id: string
			name: string
			price: number
			rooms: number
		}[],
		filteredApartments: [] as {
			_id: string
			name: string
			price: number
			rooms: number
		}[],
		status: 'idle',
		error: null as string | null,
	},
	reducers: {
		filterApartments(state, action) {
			const { price, rooms } = action.payload
			state.filteredApartments = state.apartments.filter(
				(apartment: {
					_id: string
					name: string
					price: number
					rooms: number
				}) => {
					const isPriceMatch = price ? apartment.price <= price : true
					const isRoomsMatch = rooms ? apartment.rooms === Number(rooms) : true
					return isPriceMatch && isRoomsMatch
				}
			)
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchApartments.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchApartments.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.apartments = action.payload
				state.filteredApartments = action.payload
			})
			.addCase(fetchApartments.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message ?? 'Unknown error'
			})
			.addCase(addApartment.fulfilled, (state, action) => {
				state.apartments.push(action.payload)
				state.filteredApartments.push(action.payload)
			})
			.addCase(updateApartment.fulfilled, (state, action) => {
				const index = state.apartments.findIndex(
					apt => apt._id === action.payload._id
				)
				if (index !== -1) {
					state.apartments[index] = action.payload
					state.filteredApartments[index] = action.payload
				}
			})
			.addCase(deleteApartment.fulfilled, (state, action) => {
				state.apartments = state.apartments.filter(
					apt => apt._id !== action.payload
				)
				state.filteredApartments = state.filteredApartments.filter(
					apt => apt._id !== action.payload
				)
			})
	},
})

export const { filterApartments } = apartmentSlice.actions
export default apartmentSlice.reducer
