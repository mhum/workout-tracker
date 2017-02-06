import Welcome from './Welcome';

const Home = ({ session }) => {
  const loggedIn = session.auth.loggedIn;
  return (
    <div>
      {!loggedIn &&
        <Welcome />
      }
    </div>
  );
};

Home.propTypes = {
  session: React.PropTypes.shape({})
};

Home.defaultProps = {
  session: {
    auth: {
      loggedIn: false
    }
  }
};

export default Home;
