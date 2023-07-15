import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NotificationContextProvider } from './reducers/notification'

import App from './App'
import { UserContextProvider } from './reducers/user'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<UserContextProvider>
			<NotificationContextProvider>
				<App />
			</NotificationContextProvider>
		</UserContextProvider>
	</QueryClientProvider>
)
