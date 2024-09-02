import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routing from './routing'
import './styles/main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routing />
  </StrictMode>
)
