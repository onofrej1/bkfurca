import React, { Component } from "react";

class RadioList extends Component {
  render() {
    let { label, name, data } = this.props;

    return (
      <div class="radio">
        <span>{label}</span>
          {data.map(entry => {
            return (
              <label>
                <input type="radio" name={name} value={entry.value} inline />
                {entry.label}
              </label>
            );
          })}
      </div>
    );
  }
}

export default RadioList;
