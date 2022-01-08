import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteList, getListById, setListIdToDelete, setNotification } from '../store/actions'
import { RootState } from '../store/store'

interface DelteListModalProps {
	listId: string
}

const DeleteListModal: FC<DelteListModalProps> = ({ listId }) => {
	const dispatch = useDispatch()
	const list = useSelector((state: RootState) => state.list.listById)

	useEffect(() => {
		dispatch(getListById(listId))
	}, [dispatch, listId])

	const deleteListHandle = () => {
		dispatch(deleteList(listId))
		if (list) {
			dispatch(setNotification(`List ${list.name} deleted!`, 'danger'))
		}
	}

	const hideModalHandler = () => {
		dispatch(setListIdToDelete(''))
	}

	return (
		<div className='modal is-active'>
			<div className='modal-background' onClick={hideModalHandler}></div>
			<div className='modal-card'>
				<header className='modal-card-head has-text-centered'>
					<p className='modal-card-title'>
						Are you sure you want to delete this list ?{' '}
					</p>
				</header>
				<div className='modal-card-body'>
					<h2 className='is-size-5 has-text-centered'>
						All task related to this list will be delete
					</h2>
					<div className='content'>
						{
							list?.tasks.length === 0
								? <p className="has-text-centered pt-4 mb-0">No task in this list</p>
								: <ul>
									{list?.tasks.map(task => (
										<li key={task.id}>
											{task.name}
										</li>
									))}
								</ul>
						}
					</div>
				</div>
				<footer className="modal-card-foot">
					<button onClick={deleteListHandle} type="button" className='button is-danger'>Delete</button>
					<button onClick={hideModalHandler} type="button" className='button '>Cancel</button>
				</footer>
			</div>
		</div>
	)
}

export default DeleteListModal
