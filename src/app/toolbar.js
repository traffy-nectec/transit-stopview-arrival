import React from 'react'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more'
import RaisedButton from 'material-ui/lib/raised-button'
import MenuItem from 'material-ui/lib/menus/menu-item'
import TextField from 'material-ui/lib/text-field'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator'
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title'
import { blue600, orange700} from 'material-ui/lib/styles/colors'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ActionUpdate from 'material-ui/lib/svg-icons/action/update'
import LoadingSpinner from './loading'
import CircularProgress from 'material-ui/lib/circular-progress'
import MapsPlace from 'material-ui/lib/svg-icons/maps/place'
import SwipeableViews from 'react-swipeable-views'
import Pagination from './pagination/pagination'


const toolbarStyles = {

  toolbar: {
    height: 'auto',
    backgroundColor: blue600,
    color: '#ffffff',
    padding: 20,
    paddingBottom: 40,
  },

  toolbar2: {
    height: 'auto',
    backgroundColor: blue600,
    color: '#ffffff',
    padding: 20,
    paddingBottom: 40,
  },

  dot: {
    position: 'fixed',
    left: '50%',
    zIndex: 100,
  },

  groupLeft: {
    display: 'flex',
    flexDirection: 'row',
    verticalAlign: 'middle',
  },

  titleRow: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    flex: '5 100%',
  },

  titleCurrentStop: {
    fontSize: 35,
    fontWeight: 300,
    paddingTop: 20,
    lineHeight: 1,
  },

  icon: {
    textAlign: 'center',
    margin: 'auto',
    paddingRight: '0.7rem',
    minWidth: '3rem',
    flex: 1,
  },

  floatingButton: {
    margin: 0,
    top: 'auto',
    right: 40,
    bottom: 40,
    left: 'auto',
    position: 'fixed',
    zIndex: 10,
  },

  search: {
    color: 'white',
  },

};

class BusStopDetail extends React.Component {

  render() {

    let directionText = {
      in: 'สวนสยาม - สะพานพุทธ',
      out: 'สะพานพุทธ - สวนสยาม',
    }
    let name = ( (this.props.stop) ? this.props.stop.name : '' );
    return (
      <div>
        {/*<div>
          <TextField
            hintText="พิมชื่อป้ายรถเมล์"
            floatingLabelText="ค้นหาป้ายรถเมล์"
            floatingLabelStyle={toolbarStyles.search}
            underlineStyle={toolbarStyles.search}
          />
        </div>*/}
        <div style={toolbarStyles.groupLeft}>
          <div style={toolbarStyles.icon}>
            <i className="fa fa-map-marker fa-4x"></i>
          </div>
          <div style={toolbarStyles.titleRow}>
            <span style={toolbarStyles.titleBusDetail}>
              สาย 73ก {directionText[this.props.direction]} มุ่งหน้า
            </span>
            <span style={toolbarStyles.titleCurrentStop}>
              { name }
            </span>
          </div>
        </div>
      </div>
      )
  }
}

class ToolbarBusStop extends React.Component {

  state = {
    index: 0,
  };

  handleChangeIndex = (index) => {
    this.setState({
      index: index,
    });
    this.props.parentChangeIndex(index);
    console.log('switch handleChangeIndex');
  };

  handleChangeDot = (index) => {
    this.setState({
      index: index,
    });
    this.props.parentChangeIndex(index);
    console.log('switch handleChangeDot');
  }

  switchDirection() {
    console.log('switch directin');
  }

  render() {
    const { index } = this.state;
    let foundStop = false;
    if (this.props.stops) {
      foundStop = this.props.stops.length > 0;
    }
    let f = this.props.firstDirection

    let direction0 = ( f ? f : 'in' );
    let direction1 = ( (direction0 === 'in') ? 'out' : 'in' );
    let stop0 = this.props.stopNearBy[0];
    let stop1 = this.props.stopNearBy[1];

    return (
      <div>
        {/*<FloatingActionButton
            mini={true}
            disabled={this.props.interruptProcess || this.props.dblClickProtection}
            backgroundColor={orange700}
            style={toolbarStyles.floatingButton}
            onTouchTap={this.props.handleDirectionToggle}>
          <ActionUpdate />
        </FloatingActionButton>*/}

        <div style={toolbarStyles.dot}>
          <Pagination
            dots={2}
            index={index}
            onChangeIndex={this.handleChangeDot}
          />
        </div>

        <SwipeableViews
            index={index}
            onChangeIndex={this.handleChangeIndex}
            onSwitching={this.switchDirection.bind(this)}
            resistance={true}>
          <Toolbar style={toolbarStyles.toolbar}
              onTouchTap={this.props.showBusStopPicker}>
            <ToolbarGroup float="left">
              { foundStop ? <BusStopDetail
                              direction={direction0}
                              stop={stop0} /> :
                            <LoadingSpinner /> }
            </ToolbarGroup>
          </Toolbar>
          <Toolbar style={toolbarStyles.toolbar2}
              onTouchTap={this.props.showBusStopPicker}>
            <ToolbarGroup float="left">
              { foundStop ? <BusStopDetail
                              direction={direction1}
                              stop={stop1} /> :
                            <LoadingSpinner /> }
            </ToolbarGroup>
          </Toolbar>
        </SwipeableViews>

      </div>
    )
  }

}

export default ToolbarBusStop;
