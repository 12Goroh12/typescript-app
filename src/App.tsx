import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import DeleteListModal from './components/DeleteListModal'

import './App.css'

import Header from './components/Header'
import Notification from './components/Notification'
import Sidebar from './components/Sidebar'
import { RootState } from './store/store'
import EditListModal from './components/EditListModal'
import MainContent from './components/MainContent'
import EditTaskModal from './components/EditTaskModal'
import DeleteTaskModal from './components/DeleteTaskModal'

const App: FC = () => {
	const NotificationMsg = useSelector((state: RootState) => state.notification.message)
	const listIdToDelete = useSelector((state: RootState) => state.list.listIdToDelete)
	const listToEdit = useSelector((state: RootState) => state.list.listToEdit)
	const taskToEdit = useSelector((state: RootState) => state.list.taskToEdit)
	const deleteTask = useSelector((state: RootState) => state.list.taskToDelete)

	return (
		<div className='App'>
			<Header title='Task List App' subtitle='Create some lists and add some task to each list' />
			<div className="contaner px-5">
				<div className="columns">
					<Sidebar />
					<MainContent />
				</div>
			</div>
			<Notification msg={NotificationMsg} />
			{listIdToDelete && <DeleteListModal listId={listIdToDelete} />}
			{listToEdit && <EditListModal list={listToEdit} />}
			{taskToEdit && <EditTaskModal taskToEdit={taskToEdit} />}
			{deleteTask && <DeleteTaskModal taskToDelete={deleteTask} />}
		</div>
	)
}

export default App

