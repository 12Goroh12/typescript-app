import {
	ADD_LIST,
	ADD_TASK,
	DELETE_LIST,
	DELETE_TASK,
	GET_LISTS,
	GET_LIST_BY_ID,
	Lists,
	ListsAction,
	ListState,
	SET_LISTID_TO_DELETE,
	SET_LIST_TO_EDIT,
	SET_SELECTED_LIST,
	SET_TASK_TO_DELETE,
	SET_TASK_TO_EDIT,
	UNSET_TASK_TO_DELETE,
	UNSET_TASK_TO_EDIT,
	UPDATE_LIST,
	UPDATE_TASK,
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
		case SET_SELECTED_LIST:
			const selectedList = getListsFromLS()[action.payload]

			return {
				...state,
				selectedList: selectedList,
			}
		case ADD_TASK:
			const clonedListFromLS4 = { ...listsFromLS }
			clonedListFromLS4[action.payload.list.id].tasks.push(
				action.payload.task,
			)
			saveListsToLS(clonedListFromLS4)
			return {
				...state,
				lists: clonedListFromLS4,
				selectedList: clonedListFromLS4[action.payload.list.id],
			}
		case SET_TASK_TO_DELETE:
			return {
				...state,
				taskToDelete: {
					task: action.payload.task,
					list: action.payload.list,
				},
			}
		case UNSET_TASK_TO_DELETE:
			return {
				...state,
				taskToDelete: null,
			}
		case DELETE_TASK:
			const clonedListFromLS5 = { ...listsFromLS }
			const clonedTask = [
				...clonedListFromLS5[state.taskToDelete!.list.id].tasks,
			]
			const task = clonedTask.find(
				(task) => task.id === state.taskToDelete!.task.id,
			)
			clonedTask.splice(clonedTask.indexOf(task!), 1)
			clonedListFromLS5[state.taskToDelete!.list.id].tasks = clonedTask
			saveListsToLS(clonedListFromLS5)
			return {
				...state,
				lists: clonedListFromLS5,
				selectedList: clonedListFromLS5[state.taskToDelete!.list.id],
				taskToDelete: null,
			}
		case SET_TASK_TO_EDIT:
			return {
				...state,
				taskToEdit: {
					task: action.payload.task,
					list: action.payload.list,
				},
			}
		case UNSET_TASK_TO_EDIT:
			return {
				...state,
				taskToEdit: null,
			}

		case UPDATE_TASK:
			const clonedListFromLS6 = { ...listsFromLS }
			const clonedList = clonedListFromLS6[action.payload.list.id]
			const clonedTask2 = [...clonedList.tasks]
			const task2 = clonedTask2.find(
				(task) => task.id === action.payload.taskId,
			)
			const clonedTask3 = { ...task2! }
			clonedTask3.name = action.payload.taskName
			clonedTask3.completed = action.payload.taskState
			const updateTask = clonedTask2.map((task) =>
				task.id === clonedTask3.id ? clonedTask3 : task,
			)
			clonedList.tasks = updateTask
			clonedListFromLS6[clonedList.id] = clonedList
			saveListsToLS(clonedListFromLS6)

			return {
				...state,
				lists: clonedListFromLS6,
				selectedList: clonedList,
				taskToEdit: null,
			}

		default:
			return state
	}
}
