import AppBottomNav from "../cmps/AppBottomNav"

type Props = {}

const GeneralIndex = (props: Props) => {
  return (
    <section className="general-index index">
      <main className="flex column gap16 justify-center">
        <h3>General</h3>
        <div className="top-content">
          <div className="item flex space-between">
            <div className="label">
              {/* ICON */}
              <span>Remove Advertisments</span>
            </div>
            <div className="price">
              <span>17.90</span>
            </div>
          </div>
          <div className="item">
            <div className="label">
              {/* ICON */}
              <span>Restore purchase</span>
            </div>
          </div>
        </div>
        <div className="bottom-content">
          <div className="item">
            <div className="label">
              {/* ICON */}
              <span>Rate us</span>
            </div>
          </div>
          <div className="item">
            <div className="label">
              {/* ICON */}
              <span>Share with friend</span>
            </div>
          </div>
          <div className="item">
            <div className="label">
              {/* ICON */}
              <span>Suggestions</span>
            </div>
          </div>
        </div>
      </main>
      <AppBottomNav/>
    </section>
  )
}

export default GeneralIndex