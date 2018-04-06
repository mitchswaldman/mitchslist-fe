import * as ActionTypes from '../actions'
import { combineReducers } from 'redux'
import paginate from './paginate'
import merge from 'lodash/merge'
import qs from 'qs'

// I looooove the internet: https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript
function list_to_tree(list) {
    var map = {}, node, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
        map[list[i].short_name] = i; // initialize the map
        list[i].children = []; // initialize the children
    }
    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parent_category !== null) {
            // if you have dangling branches check that map[node.parentId] exists
            list[map[node.parent_category]].children.push(node);
        } else {
            roots.push(node);
        }
    }
    return roots;
}

export const getCategoryRelationTree = (() => {
	let cache = undefined
	let cachedCategories = undefined
	const getCached = ({ entities: { categories = {} } = {} }) => {
		if (!cache || cachedCategories !== categories) {
			cache = list_to_tree(Object.keys(categories).map(key => categories[key]))
			cachedCategories = categories
		}
		return cache
	}
	return getCached
})()


export const getSearchResultsForQuery = (state, query) => {
	const { pagination: { search: { [qs.stringify(query)] : pageResults = {}  } = {} } = {} } = state 
	const { entities: { posts }} = state
	if (!pageResults.ids) {
		return {}
	}
	const filteredPosts = pageResults.ids.filter(id => posts[id]).map(id => posts[id])
	return {
		...pageResults,
		posts: filteredPosts
	}
}

const entities = (state={posts: {}, categories: {}}, action) => {
	if (action.payload && action.payload.entities) {
		return merge({}, state, action.payload.entities)
	}
	return state
}

const pagination = combineReducers({
	search: paginate({
		mapActionToKey: action => {
			//Grab query string from post endpoint
			const query = merge({}, action.meta.query)
			return qs.stringify(query)
		},
		types:[
			ActionTypes.SEARCH_REQUEST,
			ActionTypes.SEARCH_SUCCESS,
			ActionTypes.SEARCH_FAILURE
		]
	})
})

export default combineReducers({
	entities,
	pagination
})