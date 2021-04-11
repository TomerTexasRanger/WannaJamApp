import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
const ProtectedRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => {
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          !isAuthenticated && !loading ? (
            <Redirect
              to={{ pathname: "/signin", state: { from: props.location } }}
            />
          ) : (
            <Component {...props} />
          )
        }
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
