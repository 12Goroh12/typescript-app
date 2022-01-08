import React, { FC, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask, setNotification } from '../store/actions'
import { List } from '../store/types'

interface AddNewTaskProps {
	list: List
}

const AddNewTask: FC<AddNewTaskProps> = ({ list }) => {
	const [taskName, setTaskName] = useState('')
	const dispatch = useDispatch()

	const changeHandler = (e: FormEvent<HTMLInputElement>) => {
		setTaskName(e.currentTarget.value)
	}

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (taskName.trim() === '') {
			return alert('Task name is required!')
		}

		const newTask = {
			name: taskName,
			id: `task-${new Date().getTime()}`,
			completed: false
		}
		dispatch(addTask(newTask, list))
		dispatch(setNotification(`New task created("${newTask.name}")`))
		setTaskName('')
	}



	return (
		<section className='section'>
			<div className='is-size-4 has-text-centered'>Add new task to selected field</div>
			<form onSubmit={submitHandler}>
				<div className="field">
					<label className='label'>Task Name</label>
					<div className="control mb-3">
						<input
							type="text"
							className='input'
							placeholder='Add task'
							value={taskName}
							onChange={changeHandler}
						/>
					</div>
					<div className="control mb-3">
						<input type="submit" className='button is-primary' value='Add new task' />
					</div>
				</div>
			</form>
		</section>
	)
}

export default AddNewTask
