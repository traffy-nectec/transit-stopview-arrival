import React from 'react'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import HardwareVideogameAsset from 'material-ui/lib/svg-icons/hardware/videogame-asset'
import { grey500 } from 'material-ui/lib/styles/colors'
import Toggle from 'material-ui/lib/toggle'
import RaisedButton from 'material-ui/lib/raised-button'

const styles = {

  footer: {
    textAlign: 'center',
  },
  geek: {
    textAlign: 'right',
    color: '#aaa',
  },
  button: {
    margin: 10,
  },
  iconStyles: {
    marginRight: 1,
    color: '#aaa',
  },
  toggle: {
    marginBottom: 16,
    width: 0,
    left: 0,
  },
  sponsorImage: {
    width: '15%',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },

};

const sponsorTiles = [
  {
    img: 'http://bus.traffy.xyz/build/css/images/bmta_logo.png',
    title: 'BMTA',
  },
  {
    img: 'http://bus.traffy.xyz/build/css/images/ais_logo.png',
    title: 'AIS',
  },
  {
    img: 'http://bus.traffy.xyz/build/css/images/traffy_logo.png',
    title: 'Traffy',
  },
  {
    img: 'http://bus.traffy.xyz/build/css/images/nectec_logo.png',
    title: 'NECTEC',
  },
  {
    img: 'http://bus.traffy.xyz/build/css/images/nstda_logo.png',
    title: 'NSTDA',
  },
]

class Footer extends React.Component {

  render() {
    return (
      <div style={styles.footer}>

        <RaisedButton
          style={styles.button}
          linkButton={true}
          href="http://goo.gl/forms/e7GYDPC0CK"
          label="เสนอแนะ / ติชม"
          primary={true}
        />

        <RaisedButton
          style={styles.button}
          linkButton={true}
          href="https://www.facebook.com/traffy.in.th"
          label="พูดคุยกันที่ Facebook"
          secondary={false}
        />

        <div style={styles.sponsor}>
        { sponsorTiles.map(tile => (
            <img key={tile.title} src={tile.img} style={styles.sponsorImage} /> ) ) }
        </div>

        <div style={styles.geek}>
          <Toggle
            label={<HardwareVideogameAsset style={styles.iconStyles} />}
            defaultToggled={this.props.geekMode}
            onToggle={this.props.geekModeToggle}
            labelPosition="left"
            style={styles.toggle}
          />
        </div>

      </div>
    )
  }

}

export default Footer;

/*
<Dialog
  open={this.state.open}
  title="Super Secret Password"
  actions={standardActions}
  onRequestClose={this.handleRequestClose}
>
  1-2-3-4-5
</Dialog>
*/