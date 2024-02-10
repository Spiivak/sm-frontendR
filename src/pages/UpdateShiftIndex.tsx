import NewShift from '../cmps/UpdateShift/NewShift'
import UpdateShiftHeader from '../cmps/UpdateShift/UpdateShiftHeader'

export default function UpdateShift() {
  return (
    <section className='update-shift-index index'>
      <UpdateShiftHeader/>
      <main>
        <NewShift/>
      </main>
    </section>
  )
}
