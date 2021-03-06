import React from 'react'
import PaginationDot from './paginationdot'

const styles = {
  root: {
    position: 'relative',
    top: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
  },
};

export default class Pagination extends React.Component {
  static propTypes = {
    dots: React.PropTypes.number.isRequired,
    index: React.PropTypes.number.isRequired,
    onChangeIndex: React.PropTypes.func.isRequired,
  };

  handleClick = (event, index) => {
    this.props.onChangeIndex(index);
  };

  render() {
    const {
      index,
      dots,
    } = this.props;

    const children = [];

    for (let i = 0; i < dots; i++) {
      children.push(
        <PaginationDot
          key={i}
          index={i}
          active={i === index}
          onClick={this.handleClick}
        />
      );
    }

    return (
      <div style={styles.root}>
        {children}
      </div>
    );
  }
}
