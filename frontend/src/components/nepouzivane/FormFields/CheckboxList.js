import React, { Component } from "react";

class CheckboxList extends Component {
  render() {
    let { label, name, data } = this.props;

    return (
      <div class="checkbox">
        <p><strong>{label}</strong></p>
          {data.map(entry => {
            return (
              <label>
                <input type="checkbox" name={name} value={entry.value} inline />
                {entry.label}
              </label>
            );
          })}
      </div>
    );
  }
}

export default CheckboxList;
