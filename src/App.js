import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    data: null
  }

  handleChange = (e) => {
    const files = e.target.files;   
    if (files.length <= 0) {
      return false;
    }

    const fr = new FileReader();
    fr.onload = (e) => {
      const result = JSON.parse(e.target.result);
      this.setState({
        data: result
      });
    }
    fr.readAsText(files.item(0));
  }

  render(){
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} type="file" />
          <button>Upload</button>
        </form>
      </div>
    );
  }
}

export default App;
