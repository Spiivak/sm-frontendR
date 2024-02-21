import { Provider } from 'react-redux'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { store } from './store/store'
import { ShiftIndex } from './pages/ShiftIndex'
import UpdateShift from './pages/UpdateShiftIndex'
import AppBottomNav from './cmps/AppBottomNav'
import NowIndex from './pages/NowIndex'
import GeneralIndex from './pages/GeneralIndex'
import WorkIndex from './pages/WorkIndex'

// import './App.css'

export function App() {

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<ShiftIndex />} />
            <Route path="/:shiftId/edit" element={<UpdateShift/>}/>
            <Route path="/now" element={<NowIndex />}/>
            <Route path="/work" element={<WorkIndex />}/>
            <Route path="/general" element={<GeneralIndex />}/>
          </Routes>
        </Router>
      </Provider>
    </>
  )
}

