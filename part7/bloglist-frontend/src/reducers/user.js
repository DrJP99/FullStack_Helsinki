import { createContext, useReducer } from 'react'

// {
//     token: "sOmEtOkEn123",
//     username: "myuser",
//     name: "My Name"
// }

const userReducer = (state, action) => {
	console.log(action)
	switch (action.type) {
		case 'SET_USER':
			return action.payload
		case 'DEL_USER': {
			return null
		}
	}
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
	const [user, userDispatch] = useReducer(userReducer, null)

	return (
		<UserContext.Provider value={[user, userDispatch]}>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserContext
