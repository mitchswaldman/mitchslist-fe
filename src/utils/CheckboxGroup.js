import React, {Component} from 'react';
import {Field} from "redux-form";
import PropTypes from 'prop-types';

export default class CheckboxGroup extends Component {
  //https://github.com/erikras/redux-form/issues/1037
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
      value: PropTypes.string.isRequired
    })).isRequired,
    invert: PropTypes.bool
  };

  field = ({input, meta, options, invert = false}) => {

    const {name, onChange} = input;
    const {touched, error} = meta;
    const inputValue = input.value;

    const checkboxes = options.map(({label, value}, index) => {

      const handleChange = (event) => {
        const arr = [...inputValue];
        if ((!invert && event.target.checked) || (invert && !event.target.checked)) {
          arr.push(value);
        }
        else {
          arr.splice(arr.indexOf(value), 1);
        }
        return onChange(arr);
      };
      const checked = inputValue.includes(value);
      return (
        <label key={`checkbox-${index}`}>
          <input type="checkbox" name={`${name}[${index}]`} value={value} checked={invert ? !checked : checked} onChange={handleChange} />
          <span>{typeof label === 'function' ? label() : label}</span>
        </label>
      );
    });

    return (
      <div>
        <div>{checkboxes}</div>
        {touched && error && <p className="error">{error}</p>}
      </div>
    );
  };

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />;
  }
}