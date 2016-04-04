import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header'
import FlatButton from 'material-ui/lib/flat-button'
import CardText from 'material-ui/lib/card/card-text'


const styles = {
  cardBus: {
    padding: 20,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    color: '#555',
  },
  footer: {
    marginTop: '1em',
    textAlign: 'center',
  },
  stopInfo: {
    flex: 3,
  },
  timeInfo: {
    flex: 1,
    textAlign: 'right',
  },
  minuteBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    verticalAlign: 'top',
  },
  minuteInt: {
    fontSize: 50,
    fontWeight: 200,
  },
  muted: {
    color: '#aaa',
  },
  unstyledList: {
    listStyleType: 'none',
  },
  stopRelInfo: {
  },
  whereAt: {
    fontSize: 40,
    fontWeight: 200,
    paddingTop: 40,
    lineHeight: 1,
  },
};

class IncomingBusItem extends React.Component {

  render() {

    return (
      <Card>
        <div style={styles.cardBus}>
          <div style={styles.stopInfo}>
            <div style={styles.busInfo}>
              <i className="fa fa-bus"></i>
              &nbsp;
              {this.props.detail.bmta_id}
            </div>
            <div style={styles.whereAt}>
              {this.props.detail.current_stop_name}
            </div>
          </div>

          <div style={styles.timeInfo}>
            <ul style={styles.unstyledList}>
              <li style={styles.muted}>ถึงใน</li>
              <li style={styles.minuteBox}>
                <span style={styles.minuteInt}>
                  {this.props.detail.predict_time}
                </span>
                <span style={styles.muted}>นาที</span>
              </li>
              <li style={styles.stopRelInfo}>
                {this.props.detail.number_of_nexts} ป้าย
              </li>
            </ul>
          </div>
          </div>
      </Card>
    )
  }

}

export default IncomingBusItem;
