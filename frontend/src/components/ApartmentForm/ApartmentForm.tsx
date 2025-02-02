import { useEffect, useState } from 'react'
import './ApartmentForm.css'

const ApartmentForm = ({ onSubmit, apartment }) => {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		price: '',
		rooms: '',
	})

	useEffect(() => {
		if (apartment) setFormData(apartment)
	}, [apartment])

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	return (
		<form
			className='form'
			onSubmit={e => {
				e.preventDefault()
				onSubmit(formData)
			}}
		>
			<input
				name='title'
				value={formData.title}
				onChange={handleChange}
				placeholder='Title'
				required
			/>
			<input
				name='description'
				value={formData.description}
				onChange={handleChange}
				placeholder='Description'
				required
			/>
			<input
				name='price'
				type='number'
				value={formData.price}
				onChange={handleChange}
				placeholder='Price'
				required
			/>
			<select
				name='rooms'
				value={formData.rooms}
				onChange={handleChange}
				required
			>
				<option value=''>Select rooms</option>
				<option value='1'>1</option>
				<option value='2'>2</option>
				<option value='3'>3</option>
			</select>
			<button type='submit'>Submit</button>
		</form>
	)
}
export default ApartmentForm
