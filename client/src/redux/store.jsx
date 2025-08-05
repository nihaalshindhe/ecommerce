import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'


const loadAuthState = () => {
    try {
        const serializedState = localStorage.getItem('auth')
        if (!serializedState) return undefined
        return { auth: JSON.parse(serializedState) }
    } catch (e) {
        return undefined
    }
}


const saveAuthState = state => {
    try {
        const serializedState = JSON.stringify(state.auth)
        localStorage.setItem('auth', serializedState)
    } catch (e) {
        
    }
}

const preloadedState = loadAuthState()

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer
    },
    preloadedState
})

store.subscribe(() => {
    saveAuthState(store.getState())
})

export default store
