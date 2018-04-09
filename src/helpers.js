import { normalize } from 'normalizr'
import { getJSON } from 'redux-api-middleware'
import merge from 'lodash/merge'
import mergeWith from 'lodash/mergeWith'
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
	const customizer = (objValue, srcValue) => {
		if (Array.isArray(srcValue)) {
			return srcValue
		}
	}
	let newQuery = mergeWith({}, currentQuery, newQueryParams, customizer)
	
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
	// prune null, undefined, and empty string values from search query
	newQuery = pickBy(newQuery, (value, key) => {
		return value !== null && typeof value !== 'undefined' && value !== ""
	})
	console.log(newQuery)
	return newQuery
}

export const convertObjectKeysToArrays = (obj) => {
	let object = merge({}, obj)
	keys(object).forEach(key => {
		const val = object[key]
		if (typeof val === 'object') {
			//turn keys into values in an array if val[key] is truthy
			const values = keys(val).filter(key => val[key])
			// merge into object
			object = merge({}, object, {[key]: values})
		}
	})
	return object
}

export const convertObjectArraysToKeys = (obj) => {
	let object = merge({}, obj)
	keys(object).forEach(key => {
		const val = object[key]
		if (Array.isArray(val)) {
			let mergedArrayKeys = {}
			val.forEach(value => {
				mergedArrayKeys = merge({}, {value: true})
			})
			object[key] = mergedArrayKeys
		}
	})
	return object
}