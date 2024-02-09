import { ArrowLeftIcon, ArrowRightIcon, PlusIcon, ShareIcon } from './Icons'

export default function AppHeader() {
  return (
    <header className='app-header'>
      <nav className="flex space-between">
        <div className="flex align-center gap16">

          <button className='btn-icon medium-transparent share-icon'><ShareIcon /></button>
          <button className="btn-txt medium-transparent">Edit</button>
        </div>
        <div className="flex align-center">
          <button className='btn-icon medium-sec add-shift'><PlusIcon /></button>
        </div>
      </nav>

      <div className="job-preview flex align-center space-between">
        <button className="btn-icon medium-primary"><ArrowLeftIcon /></button>
        <div className="job-details flex column align-center">
          <h2>Job 1</h2>
          <p>February 2024</p>
        </div>
        <button className="btn-icon medium-sec"><ArrowRightIcon /></button>
      </div>
    </header>
  )
}
