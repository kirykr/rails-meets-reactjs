import React from "react"
import PropTypes from "prop-types"
class Separator extends React.Component {
  render() {
    const children = [];
    this.props.children.forEach((child, index) => {
      children.push(child);
      if (index < (this.props.children.length - 1)) {
        children.push(
          <div
          key={`separator-${index}`}
          className="col-lg-offset-2 col-lg-10"
          >
          <hr className="form-input-separator" />
          </div>
          );
      }
    });
    return (<div> {children} </div>);
  }
}

export default Separator
