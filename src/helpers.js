import { normalize } from 'normalizr'
import { getJSON } from 'redux-api-middleware'

export const addAuthorizationHeader = (headers = {}) => (store) => {
	const jwt = store.getState().access //This property will probably change sometime
	if (jwt) {
		return {
			...headers,
			'Authorization': `Bearer ${jwt}`
		}
	}
	return headers
}

export const parseResponse = (schema) => (action, state, response) => {
	return getJSON(response).then((json) => {
		const parsePaginatedjson = (responseJson) => {
			const normalized = normalize(responseJson.results, schema)
			return {
				...responseJson,
				...normalized
			}
		}

		if (json.count) {
			return parsePaginatedjson(json)
		}
		return {
			...json,
			...normalize(json, schema)
		}
	})
}