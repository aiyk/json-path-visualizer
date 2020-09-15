import React, { Component } from 'react';
import './App.scss';
import { FaUpload } from 'react-icons/fa';

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
      }); console.log(this.state);
    }
    fr.readAsText(files.item(0));
  }

  render(){
    return (
      <div className="App">
        <label className="uploadBtn">
          <input onChange={this.handleChange} type="file" required/>
          <span><FaUpload /> Upload File</span>
        </label>
      </div>
    );
  }
}

export default App;
