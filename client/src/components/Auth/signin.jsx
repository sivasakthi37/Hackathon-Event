import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "antd";
import { connect } from "react-redux";
import { userdata } from "../../stateManager/actions";
import axios from "axios";

class Signin extends Component {
  state = { username: "", password: "" };
  componentDidMount() {}
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1> signin</h1>
        <label>user name</label>
        <div>
          <Input
            style={{ width: "17%" }}
            onChange={e => {
              this.setState({ username: e.target.value });
            }}
          ></Input>
        </div>
        <label>password</label>
        <div>
          <Input
            type="password"
            style={{ width: "17%" }}
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
          ></Input>
        </div>
        <Button
          onClick={() => {
            let data = {
              email: this.state.username,
              password: this.state.password
            };
            axios("/Login", {
              method: "POST",
              data: data
            })
              .then(res => {
                console.log("data", res.data);
                this.props.userdata(res.data);
                this.props.history.push('/dashboard')
              })
              .catch(err => {
                console.log("err");
              });
          }}
        >
          {" "}
          signin{" "}
        </Button>
        <Link to="/registration">
          {" "}
          <Button> Registration</Button>{" "}
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("state", state.user.user);

  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { userdata }
)(Signin);
