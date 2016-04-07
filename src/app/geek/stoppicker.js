import React from 'react'
import Dialog from 'material-ui/lib/dialog'


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

class GeekStopPicker extends React.Component {

  renderEachLine(value, ind) {
    let k = `geek-${ind}`;
    return <li key={k}>{value}</li>
  }

  render() {

    return (
      <Dialog
        title="Dialog With Actions"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.handleClose}
      >
        The actions in this window were passed in as an array of React objects.
      </Dialog>
    )

  }

}


export default GeekStopPicker;
