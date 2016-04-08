import React from 'react'
import { blue600 } from 'material-ui/lib/styles/colors'
import {default as raf} from 'raf'
import Catalyst from 'react-catalyst'
import reactMixin from 'react-mixin'
import FlatButton from 'material-ui/lib/flat-button'
import Dialog from 'material-ui/lib/dialog'
import Snackbar from 'material-ui/lib/snackbar'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider'
import ToolbarBusStop from './toolbar'
import IncomingBusItem from './item'
import LoadingSpinner from './loading'
import Footer from './footer'
import Card from 'material-ui/lib/card/card'
import request from 'reqwest'
import when from 'when'
import constants, { STOP_URL } from './constants'
import ga from 'react-ga'
import NoUpdate from './nothing'
import GeekConsole from './geek/console'


ga.initialize(constants.GA_TRACKING_ID);

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
  middleItem: {
    padding: 30,
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  muted: {
    color: '#666',
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
    this.renderBus = this.renderBus.bind(this);
    this.handleDirectionToggle = this.handleDirectionToggle.bind(this);
    this.handleGeekModeToggle = this.handleGeekModeToggle.bind(this);
    this.handleCustomBusStopToggle = this.handleCustomBusStopToggle.bind(this);
    this.handleBusStopPickerTap = this.handleBusStopPickerTap.bind(this);
    this.handleBusStopPickerClose = this.handleBusStopPickerClose.bind(this);

    this.cancelDblClickProtection = this.cancelDblClickProtection.bind(this);

    this.reload = this.reload.bind(this);

    this.state = {
      loading: true,
      snackBarShow: true,
      snackBarText: 'กำลังค้นหาตำแหน่งของคุณ...',
      snackBarDuration: 10000,
      open: false,
      incomingBus: undefined,
      direction: undefined,
      intervalCount: 0,
      stops: [],
      interruptProcess: false,  // skip interval 'til interrupt process is done
      dblClickProtection: false,
      geekMode: false,
      customBusStop: false,
      openBusStopPicker: false,
      debugLines: [],
    };

    let initState = this.getInitStateFromLocalStorage();
    for (let k in initState) {
      this.state[k] = initState[k];
    }

  }

  reload() {
    if (this.state.interruptProcess)
      return;

    let intervalCount = this.state.intervalCount;

    if (intervalCount % 7 === 0) {
      this.getCurrentLocation();
      if (this.state.coords !== undefined) {
        intervalCount = 0;
      }

    } else if (this.state.stops.length > 0) {
      this.getBusArrivalTime(this.state.stops[0].id);
    }
    intervalCount++;
    this.setState({ intervalCount });
  }

  getInitStateFromLocalStorage() {

    let localStorageGeekMode = localStorage.getItem('geekMode') || false;
    let initState = {
      geekMode : JSON.parse(localStorageGeekMode),
    };
    let localStorageLocation = localStorage.getItem('coords')
    if (localStorageLocation) {
      initState['coords'] = JSON.parse(localStorageLocation);
      initState['debugLines'] = [
        `[INIT] ${initState.coords.lat},${initState.coords.lon}`,
      ];
    }
    return initState;
  }

  componentDidMount () {
    if (this.state.coords) {
      this.getBusStopNearby(this.state.direction);
    } else {
      this.reload();
    }
    ga.pageview('/bus/');
    setInterval(this.reload, 12000);
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

  handleGeekModeToggle() {
    localStorage.setItem('geekMode', JSON.stringify(!this.state.geekMode));
    this.setState({
      geekMode: !this.state.geekMode,
    })
  }

  handleBusStopPickerTap() {
    if (!this.state.customBusStop)
      return;
    let newState = {
      openBusStopPicker: true,
    };
    if (this.state.direction === undefined)
      newState['direction'] = 'in';
    this.setState(newState);
  }

  handleBusStopPickerClose() {
    this.setState({
      openBusStopPicker: false,
    })
  }

  handleCustomBusStopToggle() {
    this.setState({
      customBusStop: !this.state.customBusStop,
    })
  }

  handleDirectionToggle() {

    ga.event( { category: 'route',
                action: 'Switch route direction' } );
    let newDirection = ( this.state.direction === "in" ? "out" : "in" );
    // TODO: this setState won't change app state,
    //       only refer this to the calling one -- not desirable
    this.setState({
      direction: newDirection,
      loading: true,
      interruptProcess: true,
      dblClickProtection: true,
    });
    this.getBusStopNearby(newDirection);
    setTimeout(this.cancelDblClickProtection, 2000);
  }

  cancelDblClickProtection() {
    this.setState({
      dblClickProtection: false,
    })
  }

  addDebugConsole(data) {
    let newdebug = this.state.debugLines.concat(data);
    if (newdebug.length > constants.CONSOLE_LINE)
      newdebug = newdebug.slice(newdebug.length - constants.CONSOLE_LINE);
    return newdebug;
  }

  getCurrentLocation() {
    this.setState({
      snackBarShow: true,
      snackBarText: 'กำลังค้นหาตำแหน่งของคุณ...',
      snackBarDuration: 10000,
    });
    navigator.geolocation.getCurrentPosition((position) => {
      let debugData =
        `[FOUND] ${position.coords.latitude},${position.coords.longitude}`;
      let newState = {
        coords: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
        snackBarShow: false,
        debugLines: this.addDebugConsole(debugData),
      }
      this.setState(newState);
      localStorage.setItem('coords', JSON.stringify(newState.coords));

      const tick = () => {
        this.setState({ radius: Math.max(this.state.radius - 20, 0) });

        if (this.state.radius > 200) {
          raf(tick);
        }
      };
      raf(tick);
      this.getBusStopNearby(this.state.direction);

    }, (reason) => {
      // we don't care setting prefix if we do have one
      if (this.state.coords !== undefined)
        return;
      // set default value if not set
      let debugData = [
        `[Error]: The Geolocation service failed (${ reason }).`,
        "[NOTFOUND] Location set to around Central World",
      ];
      this.setState({
        coords: {
          lat: 13.747271,
          lon: 100.540467,
        },
        snackBarShow: false,
        debugLines: this.addDebugConsole(debugData),
      });
      this.getBusStopNearby(this.state.direction);
    });
  }

  getBusStopNearby(direction) {
    let app = this;

    if (app.state.customBusStop && app.state.stops.length > 0) {
      // not getting any new stop
      app.getBusArrivalTime(app.state.stops[0].id)
      return;
    }
    this.setState({
      snackBarShow: true,
      snackBarText: 'ค้นหาข้อมูลรถเมล์...',
      snackBarDuration: 1000,
    });

    let dataParam = {
      bus: '73ก',
      range: 1000,
      limit: 1,
      near: `${app.state.coords.lat},${app.state.coords.lon}`,
    };
    if (direction !== undefined)
      dataParam['direction'] = direction;

    when(request({
      url: constants.STOP_URL,
      method: 'GET',
      type: 'json',
      data: dataParam,
    }).then(function(response) {
      // always return value anyhow
      let direction = dataParam['direction'];
      let stops = response.results;

      response.results[0].routes.some((ele) => {
        direction = ele['direction'];
        return ele['name'].indexOf('73ก') >= 0
      });

      app.setState({
        stops,
        direction,
      });
      app.getBusArrivalTime(stops[0].id)
    }));
  }

  getBusArrivalTime(stopId) {
    let stop_url = constants.STOP_URL;
    let url_suffix = constants.INCOMING_BUS_SUFFIX;
    let app = this;
    let currentStopId = stopId || app.state.stops[0].id;
    let url = `${stop_url}${currentStopId}/${url_suffix}`;

    when(request({
      url: `${url}`,
      method: 'GET',
      type: 'json',
    }).then(function(response) {
      let busList = response.bus_list;
      let onlyValid = busList.filter(
          ele => ele.bmta_id && ele.predict_time !== "NA"
        );
      onlyValid.sort( (a, b) => ( +a.number_of_nexts > +b.number_of_nexts) );
      app.setState({
        incomingBus: onlyValid,
        loading: false,
        interruptProcess: false,
      });
    }));

  }

  renderBus(key) {
    return (
      <IncomingBusItem key={key} index={key}
        detail={this.state.incomingBus[key]} />
    )
  }

  renderNoBus() {
    /*
    <Card style={styles.middleItem}>
      <div style={styles.muted}><h3>ข้อมูลไม่อัพเดท</h3></div>
    </Card>
    */
    return <NoUpdate />
  }

  renderBusLoading() {
    return (
      <Card style={styles.middleItem}>
          <LoadingSpinner />
          <div><p>&nbsp;</p></div>
      </Card>
    )
  }

  renderGeekMode() {
    if (this.state.geekMode)
      return (
        <GeekConsole
          geekStats={this.state.debugLines}
          customBusStop={this.state.customBusStop}
          handleCustomBusStopToggle={this.handleCustomBusStopToggle} />
      )
    return <span />
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
          { this.renderGeekMode() }
          <ToolbarBusStop
            stops={this.state.stops}
            direction={this.state.direction}
            handleDirectionToggle={this.handleDirectionToggle}
            interruptProcess={this.state.interruptProcess}
            dblClickProtection={this.state.dblClickProtection}
            showBusStopPicker={this.handleBusStopPickerTap} />

          { this.state.loading ? this.renderBusLoading() :
              this.state.incomingBus.length === 0 ? this.renderNoBus() :
                Object.keys(this.state.incomingBus).map(this.renderBus) }

          <Footer
            geekMode={this.state.geekMode}
            geekModeToggle={this.handleGeekModeToggle} />
          <Snackbar
            open={this.state.snackBarShow}
            message={this.state.snackBarText}
            autoHideDuration={this.state.snackBarDuration}
          />

        </div>
      </MuiThemeProvider>
    );
  }

}

reactMixin.onClass(Main, Catalyst.LinkedStateMixin)

export default Main;
