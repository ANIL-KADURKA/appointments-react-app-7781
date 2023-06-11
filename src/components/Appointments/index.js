// Write your code here
import {Component} from 'react'

import './index.css'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    name: '',
    date: '',
    appointments: [],
    isStar: false,
    original: [],
  }

  onClickText = event => {
    this.setState({
      name: event.target.value,
    })
  }

  onClickDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  onStar = id => {
    this.setState(prevState => ({
      appointments: prevState.appointments.map(eachAppoint => {
        if (eachAppoint.id === id) {
          return {...eachAppoint, isFavorite: !eachAppoint.isFavorite}
        }
        return eachAppoint
      }),
    }))
  }

  onClickStarButton = () => {
    const {appointments, isStar} = this.state
    if (isStar === false) {
      this.setState({
        original: [...appointments],
      })

      const FilteredAppoint = appointments.filter(
        eachAppoint => eachAppoint.isFavorite === true,
      )
      this.setState({
        appointments: [...FilteredAppoint],
        isStar: true,
      })
    } else {
      const {original} = this.state
      this.setState({
        appointments: [...original],
        isStar: false,
      })
    }
  }

  onAdd = event => {
    event.preventDefault()
    const {name, date} = this.state

    const newAppointment = {
      name,
      date,
      id: uuidv4(),
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointments: [...prevState.appointments, newAppointment],
      name: '',
      date: '',
    }))
  }

  render() {
    const {name, date, appointments} = this.state
    return (
      <div className="appoint-app">
        <div className="card-op">
          <div className="card">
            <div className="name-cont">
              <h1 className="head">Add Appointment</h1>
              <form>
                <div>
                  <label htmlFor="name">Title</label>
                  <input
                    type="text"
                    className="form-control input-element"
                    id="name"
                    value={name}
                    onChange={this.onClickText}
                  />
                </div>
                <div>
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    className="form-control input-element"
                    id="date"
                    value={date}
                    onChange={this.onClickDate}
                  />
                </div>
              </form>
              <button className="button" onClick={this.onAdd} type="submit">
                Add
              </button>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              className="image-icon"
              alt="appointments"
            />
          </div>
          <hr className="horizontal" />
          <div className="appointed-co">
            <h1 className="para">Appointments</h1>
            <button
              className="p-button"
              type="button"
              onClick={this.onClickStarButton}
            >
              Starred
            </button>
          </div>
          <ul className="app-container">
            {appointments.map(eachAppoint => (
              <AppointmentItem
                AppointmentEachItem={eachAppoint}
                key={eachAppoint.id}
                onStar={this.onStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
