import { Route, Redirect } from "react-router-dom";
const AuthenticatedRoute = (props) => {
    if (localStorage && localStorage.userData) {
        return <Route {...props} />
    } else {
        return <Redirect to={'/login?state=' + window.location.pathname} />
    }

}
export default AuthenticatedRoute;