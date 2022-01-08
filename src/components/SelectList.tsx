import React, { FC, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedList } from '../store/actions'
import { RootState } from '../store/store'
import { List } from '../store/types'


const SelectList: FC = () => {
	const dispatch = useDispatch()
	const lists = useSelector((state: RootState) => state.list.lists)


	const selectedChangeHandler = (e: FormEvent<HTMLSelectElement>) => {
		dispatch(setSelectedList(e.currentTarget.value))
	}

	return (
		<section>
			<h2 className='is-size-4 has-text-centered mb-4'>Chose a list</h2>
			<div className='field mb-5'>
				<div className='control has-icons-left'>
					<div className='select fullwidth'>
						<select className='fullwidth' onChange={selectedChangeHandler}>
							<option value=''>Select List</option>
							{
								Object.keys(lists).length > 0 &&
								Object.values(lists).map((list: List) => (
									<option key={list.id} value={list.id}>{list.name}</option>
								))
							}
						</select>
					</div>
					<div className='icon is-small is-left'>
						<i className='fas fa-list'></i>
					</div>
				</div>
			</div>
		</section>
	)
}

export default SelectList
