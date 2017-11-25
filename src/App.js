import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Login from './Login';
import Register from './Register';
// import Home from './Home';

 
const App = () => (
  <MuiThemeProvider>
    <Register />
  </MuiThemeProvider>
);


export default App;
