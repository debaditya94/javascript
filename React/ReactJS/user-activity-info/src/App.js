import React, { Component } from 'react';
import './App.css';
import User from './components/user/user';
import ActivityDetails from './components/activityDetails/activityDetails';

class App extends Component {
  state = {
    users: [],
    showModal: false,
    userDetails: null
  }
  componentDidMount() {
    this.fetchTasks();
  };

  
   handleClose = () => this.setState({showModal: false});
   handleShow = () => this.setState({showModal: true});

  fetchTasks() {
    fetch('../assets/userActivityList.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          const users = [...data.members];
          this.setState({ users: users });
        }
      });
  }

  viewActivity = (index) => {
    const userDetails = {...this.state.users[index]};
    this.setState({userDetails: userDetails});
    this.handleShow();
  }

  render() {
    let users = null;
    if(this.state.users.length > 0) {
      users = (this.state.users.map((user, index) => {
        return (
        <div
        className="user"
        key={user.id}>
            <User
            click = {() => this.viewActivity(index)}
            user={user}
            />
        </div>);
        }
    ));


    }

    return (
      <div className="App">
        <h1>User Activity Info</h1>
        <div className="users">
          {users}
        </div>
        <ActivityDetails
          details={this.state.userDetails}
          show={this.state.showModal}
          hide={this.handleClose}
          click={this.handleClose}
         />
      </div>
    );
  }
}

export default App;
