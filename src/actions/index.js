import { RSAA } from 'redux-api-middleware'
import { apiEndpoint, TOTAL_CATEGORIES } from '../constants'
import { schema } from 'normalizr'
import qs from 'qs'
import { parseResponse } from '../helpers'

const postSchema = new schema.Entity('posts')
const categorySchema = new schema.Entity('categories', {}, {idAttribute: 'short_name'})
export const Schemas = {
	POST: postSchema,
	POST_ARRAY: [postSchema],
	CATEGORY: categorySchema,
	CATEGORY_ARRAY: [categorySchema]
}

export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'SEARCH_FAILURE'
export const search = (query) => {
	const queryString = qs.stringify(query, { indices: false })
	const meta = {query}
	return {
		[RSAA]: {
			endpoint: `${apiEndpoint}/api/search/?${queryString}`,
			method: 'GET',
			types: [
				{
					type: SEARCH_REQUEST,
					meta
				}, 
				{
					type: SEARCH_SUCCESS,
					meta,
					payload: parseResponse(Schemas.POST_ARRAY)
				}, 
				{
					type: SEARCH_FAILURE,
					meta
				}],
			bailout: ({pagination}) => {
				return pagination.search[queryString] || false
			}
		}
	}
}

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST'
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS'
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE'
export const getCategories = (fieldsNeeded = ['name', 'short_name', 'parent_category']) => ({
	[RSAA]: {
		endpoint: `${apiEndpoint}/api/categories/?${qs.stringify({ fields: fieldsNeeded }, { indices: false })}`,
		method: 'GET',
		types: [
			GET_CATEGORIES_REQUEST, 
			{
				type: GET_CATEGORIES_SUCCESS,
				payload: parseResponse(Schemas.CATEGORY_ARRAY)
			}, 
			GET_CATEGORIES_FAILURE],
		bailout: ({ entities: { categories = {} } = {} }) => {
			return Object.keys(categories).length >= TOTAL_CATEGORIES
		}
	}
})

export const GET_CATEGORY_REQUEST = 'GET_CATEGORY_REQUEST'
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS'
export const GET_CATEGORY_FAILURE = 'GET_CATEGORY_FAILURE'
export const getCategory = (category = 'sss', fieldsNeeded = ['name', 'short_name', 'attributes', 'parent_category']) => ({
	[RSAA]: {
		endpoint: `${apiEndpoint}/api/categories/${category}/?${qs.stringify({ fields: fieldsNeeded}, { indices: false })}`,
		method: 'GET',
		types: [
			GET_CATEGORY_REQUEST,
			{
				type: GET_CATEGORY_SUCCESS,
				payload: parseResponse(Schemas.CATEGORY)
			},
			GET_CATEGORY_FAILURE
		],
		bailout: ({ entities: { categories = {} } = {} }) => {
			const cat = categories[category]
			return cat && fieldsNeeded.every(key => cat.hasOwnProperty(key))
		}
	}
})

export const GET_POST_REQUEST = 'GET_POST_REQUEST'
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
export const GET_POST_FAILURE = 'GET_CATEGORIES_FAILURE'
export const getPost = (postId) => ({
	[RSAA]: {
		endpoint: `${apiEndpoint}/api/posts/${postId}`,
		method: 'GET',
		types: [
			GET_POST_REQUEST,
			{
				type: GET_POST_SUCCESS,
				payload: parseResponse(Schemas.POST)
			},
			GET_POST_FAILURE
		],
		bailout: ({ entities: { posts = {} } = {} }) => {
			const allFields = ['detail', 'title', 'category', 'attributes', 'photos', 'id', 'create_date', 'poster']
			const post = posts[postId]
			return post && allFields.every(key => post.hasOwnProperty(key))
		}
	}
})