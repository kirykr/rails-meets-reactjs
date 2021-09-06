import React from "react"
import PropTypes from "prop-types"
import FormInputWithLabel from "./FormInputWithLabel"
import DateWithLabel from "./DateWithLabel";
import FormInputWithLabelAndReset from "./FormInputWithLabelAndReset";
import Separator from "./Separator"

class CreateNewMeetupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetup: {
        title: '',
        description: '',
        meeting_date: new Date(),
        seoText: null,
        technology: this.props.technologies[0].name,
        guests: ['']
      },
      warnings: {
        title: null
      }
    };
    this.titleChanged = this.titleChanged.bind(this);
    this.descriptionChanged = this.descriptionChanged.bind(this);
    this.formSubmitted = this.formSubmitted.bind(this)
    this.dateChanged = this.dateChanged.bind(this);
    this.seoChanged = this.seoChanged.bind(this)
    this.guestEmailChanged = this.guestEmailChanged.bind(this);
    this.technologyChanged = this.technologyChanged.bind(this);
  }

  titleChanged(event) {
    this.state.meetup.title = event.target.value;
    this.validateTitle();
    this.forceUpdate();
  }

  validateTitle() {
    this.state.warnings.title = /\S/.test(this.state.meetup.title) ? null : 'Cannot be blank';
  }

  descriptionChanged(event) {
    this.state.meetup.description = event.target.value;
    this.forceUpdate();
  }

  dateChanged(newDate) {
    this.state.meetup.date = newDate;
    this.forceUpdate();
  }

  seoChanged(seoText) {
    this.state.meetup.seoText = seoText || "";
    this.forceUpdate();
  }

  computeDefaultSeoText() {
    const words = this.state.meetup.title.toLowerCase().split(/\s+/);
    words.push(monthName(this.state.meetup.date.getMonth()));
    words.push(this.state.meetup.date.getFullYear().toString());
    return words.filter(
      (string) => string.trim().length > 0
    ).join('-').toLowerCase();
  }

  guestEmailChanged(number, event) {
    const guests = this.state.meetup.guests;
    guests[number] = event.target.value;

    const lastEmail = guests[guests.length - 1];
    const penultimateEmail = guests[guests.length - 2];

    if (lastEmail !== '') {
      guests.push('');
    }
    if (guests.length >= 2 && lastEmail === '' && penultimateEmail === '') {
      guests.pop();
    }
    this.forceUpdate();
  }

  technologyChanged(event) {
    this.state.meetup.technology = event.target.value;
    this.forceUpdate();
  }

  formSubmitted(event) {
    event.preventDefault();
    const meetup = this.state.meetup;

    this.validateTitle();
    this.forceUpdate();

    for (const key of Object.keys(meetup)) {
      if (this.state.warnings[key]) {
        return null;
      }
    }

    $.ajax({
      url: '/meetups.json',
      type: 'POST',
      dataType: 'JSON',
      contentType: 'application/json',
      processData: false,
      seo: this.state.meetup.seoText || this.computeDefaultSeoText(),
      data: JSON.stringify({
        meetup: {
          title: meetup.title,
          description: meetup.description,
          guests: this.state.meetup.guests,
          seo: this.state.meetup.seoText || this.computeDefaultSeoText(),
          technology: this.state.meetup.technology,
          meeting_date: `${meetup.date.getFullYear()}-${meetup.date.getMonth() + 1}-${meetup.date.getDate()}`
        }
      })
    });
  }

  render() {
    let seoText = (this.state.meetup.seoText) ? this.state.meetup.seoText : this.computeDefaultSeoText
    const guests = this.state.meetup.guests.map(function (guest, index) {
      return (
        <FormInputWithLabel
          id="email"
          key={`guest-${index}`}
          labelText="Email"
          onChange={(event) => this.guestEmailChanged(index, event)}
          placeholder="Email address of an invitee"
          value={guest}
        />
      );
    }, this);
    return (
      <form className="form-horizontal" onSubmit={this.formSubmitted}>
        <fieldset>
          <legend>New Meetup</legend>
          <FormInputWithLabel
            id="title"
            value={this.state.meetup.title}
            onChange={this.titleChanged}
            placeholder="Meetup title"
            labelText="Title"
            warning={this.state.warnings.title}
          />
          <FormInputWithLabel
            id="description"
            value={this.state.meetup.description}
            onChange={this.descriptionChanged}
            placeholder="Meetup description"
            labelText="Description"
            elementType="textarea"
          />
          <DateWithLabel
            onChange={this.dateChanged}
            date={this.state.meetup.date}
          />

          <div className="form-group">
            <label className="col-lg-2 control-label" htmlFor="technology">
              Technology
            </label>
            <div className="col-lg-10">
              <select
                className="form-control"
                onChange={this.technologyChanged}
                value={this.state.meetup.technology}
              >
                {
                  this.props.technologies.map(function (tech) {
                    return (<option value={tech.name} key={tech.id}> {tech.name} </option>);
                  })
                }
              </select>
            </div>
          </div>

          <FormInputWithLabelAndReset
            id={this.seo}
            value={ seoText }
            onChange={this.seoChanged}
            placeholder="SEO text"
            labelText="seo"
          />
        </fieldset>
        <fieldset>
          <legend>Guests</legend>
          <Separator>
            {guests}
          </Separator>
          <div className="col-lg-10 col-lg-offset-2">
            <button className="btn btn-primary" type="submit">Save</button>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default CreateNewMeetupForm
