import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Signin } from "./components";
import { DashBoard, Registration } from "./components";

import "antd/dist/antd.css";

class App extends Component {
  state = {};
  componentDidMount() {}
  render() {
    return (
      <div >
        <Router>
          <Switch>
            <Route exact path={["/", "/Signin"]} component={Signin} />
            <Route path="/registration" component={Registration} />
            <Route path="/dashboard" component={DashBoard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
// const mapStateToProps = state => {
//   return {
//     user: state
//   };
// };

// export default connect(
//   mapStateToProps,
//   {}
// )(App);
