// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import ApartmentForm from './components/ApartmentForm/ApartmentForm.tsx'
import ApartmentList from './components/ApartmentList/ApartmentList.tsx'
import FilterBar from './components/FilterBar/FilterBar.tsx'
import Modal from './components/Modal/Modal.tsx'
import {
	addApartment,
	deleteApartment,
	fetchApartments,
	filterApartments,
	updateApartment,
} from './redux/apartmentSlice.ts'

const App = () => {
	const dispatch = useDispatch()
	const { filteredApartments } = useSelector(state => state.apartments)
	const [selectedApartment, setSelectedApartment] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	useEffect(() => {
		dispatch(fetchApartments())
	}, [dispatch])

	const handleAdd = apartment => {
		dispatch(addApartment(apartment))
		setIsModalOpen(false)
	}

	const handleEdit = apartment => {
		setSelectedApartment(apartment)
		setIsModalOpen(true)
	}

	const handleUpdate = updatedApartment => {
		dispatch(updateApartment(updatedApartment))
		setIsModalOpen(false)
	}

	const handleDelete = id => {
		dispatch(deleteApartment(id))
	}

	const handleFilter = filters => {
		dispatch(filterApartments(filters))
	}

	return (
		<div className='container'>
			<h1>Apartment Management</h1>
			<FilterBar onFilter={handleFilter} />
			<button onClick={() => setIsModalOpen(true)}>Add Apartment</button>
			<ApartmentList
				apartments={filteredApartments}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>
			{isModalOpen && (
				<Modal onClose={() => setIsModalOpen(false)}>
					<ApartmentForm
						onSubmit={selectedApartment ? handleUpdate : handleAdd}
						apartment={selectedApartment}
					/>
				</Modal>
			)}
		</div>
	)
}

export default App
