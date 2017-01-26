import { Grid } from 'react-bootstrap';

import HeaderContainer from './layout/Header';

const App = ({ children }) => (
  <Grid id="container">
    <HeaderContainer />
    {
      children
    }
  </Grid>
);

App.propTypes = {
  children: React.PropTypes.shape({}).isRequired
};

export default App;
