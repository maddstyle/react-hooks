import React, {Component} from 'react';
import axios from 'axios';
// import { thisExpression } from '@babel/types';
// import { response } from 'express';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Recap
//         </a>
//       </header>
//     </div>
//   );
// }


class App extends Component {
  constructor(props) {
    super(props)
    //state
    this.state = {
      users: []
    }
  }

  getUsers(){
    axios('https://api.randomuser.me/?nat=US&results=5')
    .then(response => this.setState({
      users: response.data.results
    })
   );
  }

  UNSAFE_componentWillMount() {
    this.getUsers();
  }

  render(){
    return <div className="App">{this.state.users.map(user => 
    <div>
      <h3>{user.name.first}</h3>
      <p>{user.cell}</p>
      <p>{user.email}</p>
      <hr />
    </div>
    )}</div>;
  }
}

export default App;
