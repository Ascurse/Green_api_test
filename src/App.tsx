import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {AuthProvider} from './store/AuthStore';
import Home from './pages/Home/Home';
import Chat from './pages/Chat/Chat';

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/chat' element={<Chat />} />
			</Routes>
		</AuthProvider>
	);
}

export default App;
