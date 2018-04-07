import union from 'lodash/union'

const paginate = ({types, mapActionToKey}) => {
	const [requestType, successType, failureType] = types
	
	const updatePagination = (state={
		isFetching: false,
		total: 0,
		ids: [],
		next: undefined,
		previous: undefined
	}, action) => {
		switch (action.type) {
			case requestType:
				return {
					...state,
					isFetching: true
				}
			case successType:
				const {count, result, next, previous, ...rest} = action.payload
				return {
					...state,
					...rest,
					isFetching: false,
					total: count,
					ids: union(state.ids,result),
					next: next,
					previous: previous

				}
			case failureType:
				return {
					...state,
					isFetching: false
				}
			default:
				return state
		}
	}

	return (state={}, action) => {
		switch(action.type) {
			case requestType:
			case successType:
			case failureType:
				const key = mapActionToKey(action)
				return {
					...state,
					[key]: updatePagination(state[key], action)
				}
			default:
				return state
		}
	}
}

export default paginate