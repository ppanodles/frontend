import React from 'react';
import ReactDOM from 'react-dom/client';
import 'resources/styles/index.css';
import {Provider} from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import routes from 'main/routes';
import reportWebVitals from './reportWebVitals';
import store from './main/rootReducer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			{/* add  fallbackElement */}
			<RouterProvider router={routes} />
		</Provider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
