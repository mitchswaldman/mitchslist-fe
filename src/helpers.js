import { normalize } from 'normalizr'
import { getJSON } from 'redux-api-middleware'
import merge from 'lodash/merge'
import pickBy from  'lodash/pickBy'
import pick from 'lodash/pick'
import keys from 'lodash/keys'
import xor from 'lodash/xor'

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

		if (json.hasOwnProperty('count')) {
			return parsePaginatedjson(json)
		}
		return {
			...json,
			...normalize(json, schema)
		}
	})
}

export const pushSearchQuery = (currentQuery = {}, newQueryParams = {}, options = {}) => {
	let newQuery = merge({}, currentQuery, newQueryParams)
	
	if (options.removeFields) {
		const allKeys = keys(newQuery)
		if (typeof options.removeFields === 'function') {
			const keysToRemove = options.removeFields(allKeys)
			const keysToKeep = xor(allKeys, keysToRemove)
			newQuery = pick(newQuery, keysToKeep)
		} else if (typeof options.removeFields === 'array') {
			newQuery = pick(newQuery, xor(allKeys, options.removeFields))
		}
	}

	return newQuery
}