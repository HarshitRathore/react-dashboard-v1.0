import React, { Component } from "react";

class ButtonRows extends React.Component {
  render() {
    return (
      <button type="button" className="btn btn-light d-flex">
        {this.props.data}
      </button>
    );
  }
}

export default ButtonRows;
