import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import './App.css'

import Header from './components/Header'
import Notification from './components/Notification'
import Sidebar from './components/Sidebar'
import { RootState } from './store/store'

const App: FC = () => {
	const NotificationMsg = useSelector((state: RootState) => state.notification.message)

	return (
		<div className='App'>
			<Header title='Task List App' subtitle='Create some lists and add some task to each list' />

			<div className="contaner px-5">
				<div className="columns">
					<Sidebar />
				</div>
			</div>

			<Notification msg={NotificationMsg} />
		</div>
	)
}

export default App

