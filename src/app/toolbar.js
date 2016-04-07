import React from 'react'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more'
import RaisedButton from 'material-ui/lib/raised-button'
import MenuItem from 'material-ui/lib/menus/menu-item'
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

const toolbarStyles = {

  toolbar: {
    height: 'auto',
    backgroundColor: blue600,
    color: '#ffffff',
    padding: 20,
    paddingBottom: 40,
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
  },

  titleCurrentStop: {
    fontSize: 35,
    fontWeight: 300,
    paddingTop: 20,
    lineHeight: 1,
  },

  icon: {
    verticalAlign: 'middle',
    marginLeft: 10,
    marginRight: 20,
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

};

class BusStopDetail extends React.Component {

  render() {

    let directionText = {
      in: 'สวนสยาม - สะพานพุทธ',
      out: 'สะพานพุทธ - สวนสยาม',
    }
    return (
      <div style={toolbarStyles.groupLeft}>
        <div style={toolbarStyles.icon}>
          <i className="fa fa-map-marker fa-4x"></i>
        </div>
        <div style={toolbarStyles.titleRow}>
          <span style={toolbarStyles.titleBusDetail}>
            สาย 73ก {directionText[this.props.direction]} มุ่งหน้า
          </span>
          <span style={toolbarStyles.titleCurrentStop}>
            {this.props.stop.name}
          </span>
        </div>
      </div>
      )
  }
}

class ToolbarBusStop extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let foundStop = false;
    if (this.props.stops) {
      foundStop = this.props.stops.length > 0;
    }

    return (
      <div>

      <FloatingActionButton
          mini={true}
          disabled={this.props.interruptProcess || this.props.dblClickProtection}
          backgroundColor={orange700}
          style={toolbarStyles.floatingButton}
          onTouchTap={this.props.handleDirectionToggle}>
        <ActionUpdate />
      </FloatingActionButton>

      <Toolbar style={toolbarStyles.toolbar}
          onTouchTap={this.props.showBusStopPicker}>
        <ToolbarGroup float="left">
          { foundStop ? <BusStopDetail
                          direction={this.props.direction}
                          stop={this.props.stops[0]} /> :
                        <LoadingSpinner /> }
        </ToolbarGroup>
        {/*<ToolbarGroup float="right">
          <FontIcon className="muidocs-icon-custom-sort" />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="ขาไป/ขากลับ" />
            <MenuItem primaryText="Map" />
          </IconMenu>
        </ToolbarGroup>*/}
      </Toolbar>
      </div>
    )
  }

}

export default ToolbarBusStop;
