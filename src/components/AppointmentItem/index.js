// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import './index.css'

const starImg =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
const filledStarImg =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

class AppointmentItem extends Component {
  onChangeStar = () => {
    const {appointment, starredFunction} = this.props
    const {id, title, date, starValue} = appointment
    starredFunction(id)
  }

  render() {
    const {appointment} = this.props
    const {id, title, date, starValue} = appointment
    const starImgUrl = starValue ? filledStarImg : starImg

    return (
      <li className="list-item">
        <div className="title-starred-container">
          <p className="title">{title}</p>
          <button
            testid="star"
            type="button"
            className="button-2"
            onClick={this.onChangeStar}
          >
            <img className="img-star" src={starImgUrl} alt="star" />
          </button>
        </div>
        <p className="date">
          Date {format(new Date(date), 'dd MMMM yyyy, EEEE')}
        </p>
      </li>
    )
  }
}

export default AppointmentItem
