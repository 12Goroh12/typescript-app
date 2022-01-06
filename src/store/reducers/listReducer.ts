import {
	ADD_LIST,
	DELETE_LIST,
	GET_LISTS,
	GET_LIST_BY_ID,
	Lists,
	ListsAction,
	ListState,
	SET_LISTID_TO_DELETE,
	SET_LIST_TO_EDIT,
	UPDATE_LIST,
} from '../types'

const initialState: ListState = {
	lists: {},
	listIdToDelete: '',
	listToEdit: null,
	listById: null,
	selectedList: null,
	taskToDelete: null,
	taskToEdit: null,
}

//Helper function
const getListsFromLS = () => {
	if (localStorage.getItem('task__list')) {
		return JSON.parse(localStorage.getItem('task__list') || '{}')
	}

	return {}
}

const saveListsToLS = (lists: Lists) => {
	localStorage.setItem('task__list', JSON.stringify(lists))
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: ListsAction): ListState => {
	const listsFromLS = getListsFromLS()

	switch (action.type) {
		case ADD_LIST:
			const clonedListFromLS = { ...listsFromLS }
			clonedListFromLS[action.payload.id] = action.payload
			saveListsToLS(clonedListFromLS)
			return {
				...state,
				lists: clonedListFromLS,
			}

		case GET_LISTS:
			return {
				...state,
				lists: listsFromLS,
			}
		case GET_LIST_BY_ID:
			const list = listsFromLS[action.payload]
			return {
				...state,
				listById: list,
			}
		case SET_LISTID_TO_DELETE:
			return {
				...state,
				listIdToDelete: action.payload,
			}
		case SET_LIST_TO_EDIT:
			const listToEdit = listsFromLS[action.payload]
			return {
				...state,
				listToEdit,
			}
		case DELETE_LIST:
			const clonedListFromLS2 = { ...listsFromLS }
			const listId = clonedListFromLS2[action.payload].id
			delete clonedListFromLS2[action.payload]
			saveListsToLS(clonedListFromLS2)
			return {
				...state,
				lists: clonedListFromLS2,
				listIdToDelete: '',
				listById: null,
				selectedList:
					state.selectedList && listId === state.selectedList.id
						? null
						: state.selectedList,
			}
		case UPDATE_LIST:
			const clonedListFromLS3 = { ...listsFromLS }
			clonedListFromLS3[action.payload.id].name = action.payload.name
			saveListsToLS(clonedListFromLS3)
			return {
				...state,
				lists: clonedListFromLS3,
				listToEdit: null,
			}

		default:
			return state
	}
}
