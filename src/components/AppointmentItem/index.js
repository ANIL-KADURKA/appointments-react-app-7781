// Write your code here
import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {AppointmentEachItem, onStar} = props
  const {id, name, date, isFavorite} = AppointmentEachItem

  console.log(id)

  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const highlight = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    onStar(id)
  }

  return (
    <li className="list-element">
      <div className="hey">
        <p className="name">{name}</p>
        <button
          className="B-Button"
          type="button"
          data-testid="star"
          onClick={onClickStar}
        >
          <img src={highlight} alt="star" className="image-star" />
        </button>
      </div>
      <p className="name">Date :{formattedDate}</p>
    </li>
  )
}

export default AppointmentItem
