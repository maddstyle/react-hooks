import React, { Component, useState, useEffect } from "react";

const App = () => {
  // state
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('react');
  const [url, setUrl] = useState('https://hn.algolia.com/api/v1/search?query=react');
  const [loading, setLoading] = useState(false);

  // fetch news
  const fetchNews = () => {
    // set loading to true
    setLoading(true)
    fetch(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
    .then(result => result.json())
    .then(data => (setNews(data.hits), setLoading(false)))
    .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchNews()
  }, [url]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };

  const showLoading = () => (loading ? <h2>Loading...</h2> : "");

  const searchForm = () => (
    <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange}/>
        <button>Search</button>
      </form>
  )

  const showNews = () => {
    return news.map((n, i) => (
      <p key={i}>{n.title}></p>
    ))
  }

  return (
    <div>
      <h2>News</h2>
      {showLoading()}
      {searchForm()}
      {showNews()} 
    </div>
  );
};

// class App extends Component {
//   state = {
//     count: 0
//   };

//   increment = () => {
//     this.setState({
//       count: this.state.count +1
//     });
//   };

//   componentDidMount() {
//     document.title = `Clicked ${this.state.count} times`;
//   }

//   componentDidUpdate() {
//     document.title = `Clicked ${this.state.count} times`;
//   }
  
//   render() {
//     return (
//       <div className="App">
//         <h2>Counter App</h2>
//         <button onClick={this.increment}>Clicked {this.state.count} times</button>
//       </div>
//     );
//   }
// }

// const App = () => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     document.title = `Clicked ${count} times`
//   });

//   const increment = () => {
//     setCount(count + 1);
//   };

//   return (
//     <div className="App">
//       <h2>Counter App</h2>
//       <button onClick={increment}>Clicked {count} times</button>
//     </div>
//   );
// }

export default App;
