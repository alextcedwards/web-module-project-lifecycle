import axios from "axios";
import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    user: [],
    followers: [],
    userinput: [],
  };

  componentDidMount() {
    Promise.all([
      axios.get(`https://api.github.com/users/alextcedwards`),
      axios.get("https://api.github.com/users/alextcedwards/followers"),
    ])
      .then(([res1, res2]) => {
        this.setState({
          user: res1.data,
          followers: res2.data,
        });
      })
      .catch(([err1, err2]) => {
        console.log(err1, err2);
      });
  }
  handleChange = (event) => {
    this.setState({
      userinput: event.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.userinput}`)
      .then((res) => this.setState({ user: res.data }))
      .catch((err) => console.log(err));

    axios
      .get(`https://api.github.com/users/${this.state.userinput}/followers`)
      .then((res) => this.setState({ user: res.data }))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="main">
        <form onSubmit={this.onSubmit}>
          <input
            placeholder="Search Users"
            text="type"
            value={this.state.userinput}
            onChange={this.handleChange}
          />
          <button>Search Users</button>
        </form>
        <div className="card">
          <img src={this.state.user.avatar_url} alt="" />
          <div className="cardinfo">
            <span>Name:</span> {this.state.user.name} <br />
            <span>UserName:</span> {this.state.user.login}
            <br />
            <span>Location:</span> {this.state.user.location}
            <br />
            <span>Bio:</span> {this.state.user.bio}
            <br />
          </div>
        </div>

        {this.state.followers.map((item) => {
          console.log(item);
          return (
            <div className="card">
              <img src={item.avatar_url} alt="" />
              <div className="cardinfo">
                <span>Name:</span> {item.name} <br />
                <span>UserName:</span>
                {item.login}
                <br />
                <span>Location:</span> {item.location}
                <br />
                <span>Bio:</span> {item.bio}
                <br />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
