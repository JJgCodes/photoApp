import './App.css'
import Album from './pages/Album/Album'
import store from './store'
import { Provider } from 'react-redux'

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<Album />
			</div>
		</Provider>
	)
}

export default App
