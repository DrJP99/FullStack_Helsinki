import ReactDOM from 'react-dom/client'
import './index.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App-redux'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<App />
	</Provider>
)
