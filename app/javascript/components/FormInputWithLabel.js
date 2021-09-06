import React from "react"
import PropTypes from "prop-types"

class FormInputWithLabel extends React.Component {
  constructor(props) {
    super(props);
    this.tagType = this.tagType.bind(this);
    this.warning = this.warning.bind(this);
  }

  warning() {
    if (!this.props.warning) {
      return null;
    }
    return (
      <label className="control-label alert-warning" htmlFor={this.props.id}>
        {this.props.warning}
      </label>);
  }

  tagType() {
    return ({
      input: this.props.inputType,
      textarea: null
    }[this.props.elementType]);
  }

  render() {
    const Tag = this.props.elementType;
    const warningClass = {
      true: 'has-warning is-invalid',
      false: ''
    }[!!this.props.warning];

    return (
      <div className="form-group">
      <label
        htmlFor={this.props.id}
        className="col-lg-2 control-label">
        {this.props.labelText}
      </label>
      <div className={`col-lg-10 ${warningClass}`}>
        {this.warning()}
        <Tag
          className={`form-control ${warningClass}`}
          placeholder={this.props.placeholder}
          id={this.props.id}
          type={this.tagType()}
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    </div>);
  }
}

FormInputWithLabel.defaultProps = { elementType: 'input', inputType: 'text' };

export default FormInputWithLabel
