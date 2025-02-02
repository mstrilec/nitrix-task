import { useState } from 'react'
import './FilterBar.css'

const FilterBar = ({ onFilter }) => {
	const [filters, setFilters] = useState({ price: '', rooms: '' })

	const handleChange = e => {
		setFilters({ ...filters, [e.target.name]: e.target.value })
	}

	return (
		<div className='filter-bar'>
			<input
				name='price'
				type='number'
				value={filters.price}
				onChange={handleChange}
				placeholder='Max Price'
			/>
			<select name='rooms' value={filters.rooms} onChange={handleChange}>
				<option value=''>All rooms</option>
				<option value='1'>1</option>
				<option value='2'>2</option>
				<option value='3'>3</option>
			</select>
			<button onClick={() => onFilter(filters)}>Filter</button>
		</div>
	)
}

export default FilterBar
