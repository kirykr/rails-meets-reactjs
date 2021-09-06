import React from "react"
import PropTypes from "prop-types"
class Start extends React.Component {
  render () {
    return (
      <React.Fragment>
        Greeting: {this.props.greeting}
      </React.Fragment>
    );
  }
}

Start.propTypes = {
  greeting: PropTypes.string
};
export default Start
