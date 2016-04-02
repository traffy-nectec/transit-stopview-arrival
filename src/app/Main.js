import React from 'react'
import RaisedButton from 'material-ui/lib/raised-button'
import Dialog from 'material-ui/lib/dialog'
import { blue600 } from 'material-ui/lib/styles/colors'
import {default as raf} from 'raf'
import FlatButton from 'material-ui/lib/flat-button'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider'
import ToolbarBusStop from './toolbar'
import IncomingBusItem from './item'
import LoadingSpinner from './loading'
import Card from 'material-ui/lib/card/card';
import request from 'reqwest'
import when from 'when'


const geolocation = (
  navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure("Your browser doesn't support geolocation.");
    },
  }
);

const styles = {
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'left',
    maxWidth: 780,
  },
  footer: {
    marginTop: '1em',
    textAlign: 'center',
  },
  middleItem: {
    padding: 30,
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
};


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue600,
  },
});


class Main extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: false,
      incomingBus: undefined,
    };
  }

  componentDidMount () {
    this.getCurrentLocation();
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        coords: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
        content: "Location found using HTML5.",
      });
      const tick = () => {
        this.setState({ radius: Math.max(this.state.radius - 20, 0) });

        if (this.state.radius > 200) {
          raf(tick);
        }
      };
      raf(tick);
      this.getBusStopNearby();

    }, (reason) => {
      this.setState({
        coords: {
          lat: 13.747271,
          lon: 100.540467,
        },
        content: `Error: The Geolocation service failed (${ reason }).`,
      });
      this.getBusStopNearby();
    });
  }

  getBusStopNearby() {
    let url = 'http://traffy.dev/stop/';
    let app = this;

    when(request({
      // url: BUS_LOCATION_URL + '?t=' + Date.now(),
      url: `${url}`,
      method: 'GET',
      type: 'json',
      data: {
        bus: '73ก',
        range: 1000,
        limit: 2,
        near: `${app.state.coords.lat},${app.state.coords.lon}`,
      },
    }).then(function(response) {
      app.setState({
        stops: response.results,
      });
      app.getBusArrivalTime()
    }));
  }

  getBusArrivalTime() {

    let baseUrl = 'http://traffy.dev/stop/';
    let app = this;
    let currentStop = app.state.stops[0];
    let url = `${baseUrl}${currentStop.id}/incoming_bus/`;

    when(request({
      url: `${url}`,
      method: 'GET',
      type: 'json',
    }).then(function(response) {
      let busList = response.bus_list;
      app.setState({
        incomingBus: busList.map((ele) => (ele.bmta_id ? ele : null)),
      });
    }));

  }

  renderBus(key) {
    return (
      <IncomingBusItem key={key} index={key}
        details={this.state.incomingBus[key]} />
    )
  }

  renderNoBus() {
    return (
      <Card style={styles.middleItem}>
          <div><p>ยังไม่มีรถออกจากอู่</p></div>
      </Card>
    )
  }

  renderBusLoading() {
    return (
      <Card style={styles.middleItem}>
          <LoadingSpinner />
          <div><p>&nbsp;</p></div>
      </Card>
    )
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Okey"
        secondary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <ToolbarBusStop stops={this.state.stops} />

          { this.state.incomingBus === undefined ? this.renderBusLoading() :
              this.state.incomingBus.length === 0 ? this.renderNoBus() :
                Object.keys(this.state.incomingBus).map(this.renderBus) }

          <div style={styles.footer}>
            <Dialog
              open={this.state.open}
              title="Super Secret Password"
              actions={standardActions}
              onRequestClose={this.handleRequestClose}
            >
              1-2-3-4-5
            </Dialog>
            <RaisedButton
              label="เสนอแนะ / ติชม"
              primary={true}
              onTouchTap={this.handleTouchTap}
            />
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
