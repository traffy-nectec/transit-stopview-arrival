import React from 'react'
import Dialog from 'material-ui/lib/dialog'
import RaisedButton from 'material-ui/lib/raised-button'

const styles = {

  footer: {
    textAlign: 'center',
  },
  button: {
    margin: 10,
  },

};

const Footer = () => (

  <div style={styles.footer}>

    <a href="http://goo.gl/forms/e7GYDPC0CK">
      <RaisedButton
        style={styles.button}
        label="เสนอแนะ / ติชม"
        primary={true}
      />
    </a>


    <a href="https://www.facebook.com/traffy.in.th">
      <RaisedButton
        style={styles.button}
        label="พูดคุยกันที่ Facebook"
        secondary={false}
      />
    </a>

  </div>

);

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