import React from "react"
import PropTypes from "prop-types"
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

function monthName(monthNumberStartingFromZero) {
  return [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ][monthNumberStartingFromZero];
}

function dayName(date) {
  const dayNameStartingWithSundayZero = date.getDay();
  return [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ][dayNameStartingWithSundayZero];
}

class DateWithLabel extends React.Component {
  constructor(props) {
    super(props);
    this.onYearChange = this.onYearChange.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(event) {
    const newDate = new Date(
      this.props.date.getFullYear(),
      this.props.date.getMonth(),
      event.target.value
    );
    this.props.onChange(newDate);
  }

  onMonthChange(event) {
    const newDate = new Date(
      this.props.date.getFullYear(),
      event.target.value,
      this.props.date.getDate()
    );
    this.props.onChange(newDate);
  }

  onYearChange(event) {
    const newDate = new Date(
      event.target.value,
      this.props.date.getMonth(),
      this.props.date.getDate()
    );
    this.props.onChange(newDate);
  }

  render() {
    let year;
    let options = [];
    let monthOptions = [];
    let dayOptions = [];
    for (year = 2015; year < 2022; year ++) {
      options.push(<option key={year} value={year}>{year}</option>);
    }

    for (let month = 0; month < 12; month ++) {
      monthOptions.push(
        <option key={`month-${month}`} value={month}>
          {month + 1}-{monthName(month)}
        </option>
      );
    }

    for (let day = 1; day <= 31; day++) {
      const date = new Date(
      this.props.date.getFullYear(),
      this.props.date.getMonth(),
        day
      );
      dayOptions.push(
        <option key={`day-${day}`} value={day}>
          {day}-{dayName(date)}
        </option>
      )
    }

    return (
      <div className="form-group">
        <label className="col-lg-2 control-label">Date</label>
        <div className="col-lg-2">
          <select
            className="form-control"
            onChange={this.onYearChange}
            value={this.props.date.getFullYear()}
          >{options}</select>
        </div>
        <div className="col-lg-3">
          <select
            className="form-control"
            onChange={this.onMonthChange}
            value={this.props.date.getMonth()}
          >{monthOptions}</select>
        </div>
        <div className="col-lg-2">
          <select
            className="form-control"
            onChange={this.onDateChange}
            value={this.props.date.getDate()}
          >{dayOptions}</select>
        </div>
      </div>
    );
  }
}
DateWithLabel.defaultProps = { date: new Date() };
export default DateWithLabel
