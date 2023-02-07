import { createSlice, configureStore, applyMiddleware, combineReducers } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import ReduxPromise from 'redux-promise'

const initialState = { todos: [] };

const todoSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {
        todoAdded(state, action) {
            state.todos = action.payload;
        },
        todoEditing(state, action) {
            state.todos = action.payload;
        },
        todoEdited(state, action) {
            state.todos = action.payload;
        },
        todoDeleted(state, action) {
            state.todos = action.payload;
        },
        todosRepopulated(state, action) {
            state.todos = action.payload
        }
    }
})

const todo = todoSlice.reducer

const combineReducer = combineReducers({ todo })


const store = configureStore({
    reducer: combineReducer,
}, composeWithDevTools(applyMiddleware(ReduxPromise)));

export const todosActions = todoSlice.actions;

export default store;