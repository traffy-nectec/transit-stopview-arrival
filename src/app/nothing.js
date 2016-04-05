import React from 'react';
import SwipeableViews from 'react-swipeable-views';


const styles = {
  slide: {
    padding: 30,
    height: 220,
    color: '#777',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontWeight: 30,
    fontSize: 22,
    lineHeight: 1,
  },
  slide1: {
    background: '#FFF',
  },
  slide2: {
    background: '#FFF',
  },
};


const NoUpdate = () => (
  <SwipeableViews>
    <div style={Object.assign({}, styles.slide, styles.slide1)}>
      <p>ข้อมูลไม่อัพเดท</p>
      <h3>≪≪ เลื่อนเพื่ออัพเดท ≪≪</h3>
    </div>
    <div className="unstyleLink" style={Object.assign({}, styles.slide, styles.slide2)}>
      <h1>ติดต่อคุณศรันย์ <br/>
        <a href="http://www.mastertech.co.th/" target="_blank">MasterTech</a>
      </h1>
      <p><a href="tel:02-952-7280">02-952-7280</a></p>
      <p>ด้วยความเคารพ _/\_</p>
    </div>
  </SwipeableViews>
)

export default NoUpdate;