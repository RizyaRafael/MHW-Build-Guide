import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from "./store/index.js"
import { Provider } from "react-redux"
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="1073277442116-tokk7948c35ktfdjd07jpplfs6np8r4f.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
)
