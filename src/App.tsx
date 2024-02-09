import { Provider } from 'react-redux'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { store } from './store/store'
import { HomeIndex } from './pages/HomeIndex'

// import './App.css'

export function App() {

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<HomeIndex />} />
          </Routes>
        </Router>
      </Provider>
    </>
  )
}

