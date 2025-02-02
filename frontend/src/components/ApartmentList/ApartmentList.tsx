import './ApartmentList.css'

const ApartmentList = ({ apartments, onEdit, onDelete }) => (
	<div className='card-container'>
		{apartments.map(apartment => (
			<div className='card' key={apartment._id}>
				<h3 className='card-title'>{apartment.title}</h3>
				<p className='card-description'>{apartment.description}</p>
				<p className='card-price'>Price: {apartment.price}</p>
				<p className='card-rooms'>Rooms: {apartment.rooms}</p>
				<div className='card-btn-container'>
					<button className='card-btn' onClick={() => onEdit(apartment)}>
						Edit
					</button>
					<button className='card-btn' onClick={() => onDelete(apartment._id)}>
						Delete
					</button>
				</div>
			</div>
		))}
	</div>
)
export default ApartmentList
