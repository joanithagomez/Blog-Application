import ReCAPTCHA from 'react-google-recaptcha';


<ReCAPTCHA
   ref="recaptcha"
   sitekey="Your client site key"
   onChange={this.onChange.bind(this)}/>
onChange(response) {
this.setState({
'g-recaptcha-response': response
});
}
