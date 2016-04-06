import React from 'react'

const geekStyles = {

  console: {
    margin: 0,
    top: 0,
    right: 0,
    bottom: 'auto',
    left: 'auto',
    position: 'fixed',
    zIndex: 100,
    padding: 5,
  },

};

class GeekConsole extends React.Component {

  renderEachLine(value, ind) {
    let k = `geek-${ind}`;
    return <li key={k}>{value}</li>
  }

  render() {

    return (
      <div style={geekStyles.console} className="geekConsole">
        ==== Geek Mode [v. 0.1.2b] ====<br/>
        <ul>{this.props.geekStats.map(this.renderEachLine)}</ul>
      </div>
    )

  }

}


export default GeekConsole;
