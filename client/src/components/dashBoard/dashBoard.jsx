import React, { Component } from "react";
import { Select, Table, Layout, Menu, Icon } from "antd";
import { connect } from "react-redux";
import { increment, api } from "../../stateManager/actions/index";
import axios from "axios";
const { Option } = Select;
const { Header, Sider, Content } = Layout;
class DashBoard extends Component {
  state = {
    userName: [],
    finaldata: [],
    table: false,
    collapsed: false,
    Trackuser: true,
    apidata: [],
    columns: [
      {
        title: "User Name",
        dataIndex: "userName",
        key: "userName"
      },
      {
        title: "Application Name",
        dataIndex: "sessionName",
        key: "sessionName"
      },
      {
        title: "Usage Time",
        dataIndex: "usageTime",
        key: "usageTime"
      }
    ],
    column: [
      {
        title: "User Name",
        dataIndex: "userName",
        key: "userName"
      },
      {
        title: "Application Name",
        dataIndex: "sessionName",
        key: "sessionName"
      },
      {
        title: "Usage Time",
        dataIndex: "usageTime",
        key: "usageTime"
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "StartTime",
        dataIndex: "startTime",
        key: "startTime"
      },
      {
        title: "EndTime",
        dataIndex: "endTime",
        key: "endTime"
      }
    ]
  };
  componentDidMount() {
    axios("/getanalizedata", {
      method: "get"
    })
      .then(data => {
        let dataresult = [];
        console.log("data", data);
        data.data.result.forEach(element => {
          if (!dataresult.includes(element.userName)) {
            dataresult.push(element.userName);
          }
        });
        console.log("dataresult", dataresult);
        this.setState({ userName: dataresult, apidata: data.data.result });
      })
      .catch(err => {
        console.log("err");
      });
  }
  handleonChange = e => {
    axios(`/getanalizedata?userName=${e}`, {
      method: "get"
    })
      .then(async data => {
        console.log("data", data);
        let uniquesessionName = [];
        await data.data.result.forEach(element => {
          if (!uniquesessionName.includes(element.sessionName)) {
            uniquesessionName.push(element.sessionName);
          }
        });
        console.log("uniquesessionName", uniquesessionName);
        let browserdatas = {};
        await uniquesessionName.forEach(unique => {
          data.data.result.forEach(element => {
            if (data.data.result.keylogged !== "") {
              if (element.sessionName === unique) {
                browserdatas[unique] = browserdatas[unique]
                  ? Number(browserdatas[unique]) + Number(element.usageTime)
                  : Number(element.usageTime);
              }
            }
          });
        });
        let finaldata = [];
        for (const key in browserdatas) {
          finaldata.push({
            sessionName: key,
            usageTime: this.secondsToHms(browserdatas[key]),
            userName: e
          });
        }
        this.setState({ finaldata: finaldata, table: true });
      })
      .catch(err => {
        console.log("err", err);
      });
  };
  secondsToHms = d => {
    d = Number(d);

    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    return (
      ("0" + h).slice(-2) +
      ":" +
      ("0" + m).slice(-2) +
      ":" +
      ("0" + s).slice(-2)
    );
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  handlealluserdata = () => {
    this.setState({ Trackuser: !this.state.Trackuser });
  };

  render() {
    return (
      <div>
        <Layout style={{ height: "1000px" }}>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item
                key="1"
                onClick={() => {
                  this.setState({ Trackuser: !this.state.Trackuser });
                }}
              >
                <Icon type="user" />
                <span>Track User</span>
              </Menu.Item>{" "}
              <Menu.Item key="2" onClick={this.handlealluserdata}>
                <Icon type="user" />
                <span>All User data</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{
                background: "#fff",
                padding: "0px"
              }}
            >
              <div>
                <Icon
                  style={{ paddingLeft: "17px", paddingRight: "50%" }}
                  className="trigger"
                  type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                  onClick={this.toggle}
                />
                Welcome {this.props.user.username}
              </div>
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              {this.state.Trackuser ? (
                <div>
                  <div style={{ paddingBottom: 12 }}>
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Select a person"
                      optionFilterProp="children"
                      onChange={e => {
                        this.handleonChange(e);
                      }}
                    >
                      {this.state.userName.map((user, key) => {
                        return (
                          <Option key={key} value={user}>
                            {user}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                  {this.state.table && (
                    <div style={{ border: "1px solid #80808045" }}>
                      <Table
                        columns={this.state.columns}
                        dataSource={this.state.finaldata}
                        pagination={{ position: "top" }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ border: "1px solid #80808045" }}>
                  <Table
                    columns={this.state.column}
                    dataSource={this.state.apidata}
                    pagination={{ position: "top" }}
                  />
                </div>
              )}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    dashboard: state.dashboard.count,
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  {
    increment,
    api
  }
)(DashBoard);
