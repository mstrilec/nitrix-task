import './Modal.css'

import { MouseEventHandler, ReactNode } from 'react'

interface ModalProps {
	children: ReactNode
	onClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement>
}

const Modal = ({ children, onClose }: ModalProps) => {
	return (
		<div className='modal-overlay' onClick={onClose}>
			<div className='modal-content' onClick={e => e.stopPropagation()}>
				<button className='modal-close' onClick={onClose}>
					X
				</button>
				{children}
			</div>
		</div>
	)
}

export default Modal
