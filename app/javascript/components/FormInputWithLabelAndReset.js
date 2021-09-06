import React from "react"
import PropTypes from "prop-types"
class FormInputWithLabelAndReset extends React.Component {
  render () {
    return (
      <div className="form-group">
        <label htmlFor={this.props.id} className="col-lg-2 control-label">{this.props.labelText}</label>
        <div className="col-lg-8">
          <div className="input-group">
            <input
              className="form-control"
              id={this.props.id}
              onChange={(event) => this.props.onChange(event.target.value)}
              placeholder={this.props.placeholder}
              value={this.props.value}
            />
            <span className="input-group-btn">
              <button
                className="btn btn-default"
                onClick={() => this.props.onChange(null)}
                type="button">
                <i className="fa fa-magic"></i>
              </button>
              <button
                className="btn btn-default"
                onClick={() => this.props.onChange('')}
                type="button"
              >
                <i className="fa fa-times-circle"></i>
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

FormInputWithLabelAndReset.defaultProps = { seoValue: '' };

export default FormInputWithLabelAndReset
