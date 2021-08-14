import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

const imgUrl =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png'

class Appointments extends Component {
  state = {title: '', date: '', isFilterActive: false, appointmentsList: []}

  onGetTitle = event => {
    const {title} = this.state
    this.setState({title: event.target.value})
  }

  onGetDate = event => {
    const {date} = this.state
    this.setState({date: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {title, date, appointmentsList} = this.state
    if (title !== '' && date !== '') {
      const newAppointment = {
        id: uuidv4(),
        title,
        date,
        starValue: false,
      }
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        title: '',
        date: '',
      }))
    }
  }

  onGetStarredId = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, starValue: !eachAppointment.starValue}
        }
        return eachAppointment
      }),
    }))
  }

  onFilterStarred = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive, starValue} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.starValue === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {title, date, appointmentsList, isFilterActive} = this.state
    const filteredAppointmentsList = this.getFilteredAppointmentsList()
    const buttonColor = isFilterActive ? 'yellow-color' : null

    return (
      <div className="bg-container">
        <div className="appointment-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="form-img-container">
            <form className="form" onSubmit={this.onSubmitForm}>
              <label htmlFor="title">TITLE</label>
              <br />
              <input
                className="input-title"
                type="text"
                id="title"
                placeholder="Title"
                value={title}
                onChange={this.onGetTitle}
              />
              <br />
              <label htmlFor="date">DATE</label>
              <br />
              <input
                className="input-date"
                type="date"
                id="date"
                value={date}
                onChange={this.onGetDate}
              />
              <br />
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <img className="appointments-img" src={imgUrl} alt="appointments" />
          </div>
          <hr className="hr-line" />
          <div className="heading-starred-container">
            <h1>Appointments</h1>
            <div className="container-center-starred">
              <button
                type="button"
                className={`starred-button ${buttonColor}`}
                onClick={this.onFilterStarred}
              >
                <p>Starred</p>
              </button>
            </div>
          </div>
          <ul className="ul-container">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointment={eachAppointment}
                starredFunction={this.onGetStarredId}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
