import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Login from './Login';
import RegisterLogin from './RegisterLogin';
// import Home from './Home';

 
const App = () => (
  <MuiThemeProvider>
    <RegisterLogin />
  </MuiThemeProvider>
);


export default App;
