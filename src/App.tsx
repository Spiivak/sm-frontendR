import { Provider } from 'react-redux'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { store } from './store/store'
import { ShiftIndex } from './pages/ShiftIndex'

// import './App.css'

export function App() {

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<ShiftIndex />} />
          </Routes>
        </Router>
      </Provider>
    </>
  )
}

