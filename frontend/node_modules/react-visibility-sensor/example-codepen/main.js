"use strict";

import React from "react";
import ReactDOM from "react-dom";
import VisibilitySensor from "../visibility-sensor";

const lists = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      getElement: null
    };
  }

  componentDidMount() {
    this.setState(() => {
      return {
        getElement: document.getElementById("sample")
      };
    });
  }

  render() {
    var containmentDOMRect = this.state.getElement
      ? this.state.getElement
      : null;

    return (
      <div className="App">
        <p>
          Demo: Scrolling through a list, and activating items when they become
          visible
        </p>
        <div
          id="sample"
          style={{ height: 500, maxHeight: 500, overflowY: "scroll" }}
        >
          {lists.map(list => {
            return containmentDOMRect ? (
              <VisibilitySensor key={list} containment={containmentDOMRect}>
                {({ isVisible, sensorRef }) => {
                  return (
                    <div
                      ref={sensorRef}
                      style={{
                        height: 100,
                        lineHeight: "100px",
                        color: "white",
                        backgroundColor: isVisible ? "#593" : "#F33",
                        margin: 5
                      }}
                    >
                      I am #{list}
                    </div>
                  );
                }}
              </VisibilitySensor>
            ) : null;
          })}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
