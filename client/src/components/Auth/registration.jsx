import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "antd";
import axios from "axios";

class Registration extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };
  componentDidMount() {}
  Registration = () => {
    let data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      profilepic: "",
      password: this.state.password
    };
    axios("/Register", {
      method: "POST",
      data: data
    })
      .then(data => {
        console.log("data", data);
        this.props.history.push("/Signin")
      })
      .catch(err => {
        console.log("err");
      });
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1> Registration</h1>
        <label>first name</label>
        <div>
          <Input
            style={{ width: "17%" }}
            onChange={e => {
              this.setState({ firstname: e.target.value });
            }}
          ></Input>
        </div>
        <label>last name</label>
        <div>
          <Input
            style={{ width: "17%" }}
            onChange={e => {
              this.setState({ lastname: e.target.value });
            }}
          ></Input>
        </div>
        <label>Email</label>
        <div>
          <Input
            style={{ width: "17%" }}
            onChange={e => {
              this.setState({ email: e.target.value });
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
        <Button onClick={this.Registration}> register </Button>
        <Link to="/signin">
          <Button> signin</Button>
        </Link>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     user: state
//   };
// };

// export default connect(
//   mapStateToProps,
//   {}
// )(Signin);
export default Registration;
