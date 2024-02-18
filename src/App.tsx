import { Provider } from 'react-redux'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { store } from './store/store'
import { ShiftIndex } from './pages/ShiftIndex'
import UpdateShift from './pages/UpdateShiftIndex'
import AppBottomNav from './cmps/AppBottomNav'

// import './App.css'

export function App() {

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<ShiftIndex />} />
            <Route path="/:shiftId/edit" element={<UpdateShift/>}/>
          </Routes>
        </Router>
      </Provider>
    </>
  )
}

