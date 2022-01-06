import React, { FC } from 'react'
import CreateNewLists from './CreateNewLists'
import Lists from './Lists'

interface Props {

}

const Sidebar: FC = (props: Props) => {
	return (
		<div className="column is-3">
			<CreateNewLists />
			<Lists />
		</div>
	)
}

export default Sidebar
