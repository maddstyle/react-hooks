import React, {Component} from 'react';
import axios from 'axios';
import Loading from './Loading';
import { throwStatement } from '@babel/types';


class App extends Component {
  constructor(props) {
    super(props)
    //state
    this.state = {
      users: [],
      loading: false,
    };
    //bind
    this.hangleSubmit = this.hangleSubmit.bind(this);
  }

  getUsers(){
    this.setState({
      loading: true
    })
    axios('https://api.randomuser.me/?nat=US&results=5')
    .then(response => this.setState({
      users: [...this.state.users, ...response.data.results],
      loading: false
    })
   );
  }

  hangleSubmit(e) {
    e.preventDefault();
    this.getUsers();
    console.log('more users loaded');
  }

  UNSAFE_componentWillMount() {
    this.getUsers();
  }

  render(){
    
    return (
    <div className="App">
     {!this.state.loading 
      ? this.state.users.map(user => (
        <div>
          <h3>{user.name.first}</h3>
          <p>{user.cell}</p>
          <p>{user.email}</p>
          <form onSubmit={this.handleSubmit}>
            <input type="submit" value="load users" />
          </form>
          <hr />
        </div>
       ))
      : <Loading message="one sec, your data is brewing"/>}
     </div>
     );
    }
  }

export default App;
