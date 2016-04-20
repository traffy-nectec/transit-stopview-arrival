import React from 'react'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'


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
        ==== Geek Mode [v. 0.3.0] ====<br/>
        <label>
          <input type="checkbox"
            defaultChecked={this.props.customBusStop}
            onClick={this.props.handleCustomBusStopToggle} />
          custom location
        </label>
        <ul>{this.props.geekStats.map(this.renderEachLine)}</ul>
      </div>
    )

  }

}


export default GeekConsole;
