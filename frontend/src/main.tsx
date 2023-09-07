import React from 'react'
import ReactDOM from 'react-dom/client'
import Hello from './Index/Index'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Hello message='HOLA'/>
  </React.StrictMode>,
)
