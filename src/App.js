import React, { Component } from 'react';
import './App.scss';
import { FaUpload } from 'react-icons/fa';
import TreeRoot from './tree-root/tree-root'

class App extends Component {
  state = {
    data: null
  }

  handleFilterChange = (e) => {
    const val = e.target.value;
    console.log(val);
  }

  handleUploadChange = (e) => { 
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
      console.log(result);
    }
    fr.readAsText(files.item(0));
  }

  render(){
    return (
      <div className="jsonRenderer">
        <input type="text" onChange={this.handleFilterChange} className="jsonRenderer__filter" placeholder="type in your query..." />
        <div className="jsonRenderer__contentArea nice nice-scroll">
          <TreeRoot data={this.state.data} />
        </div>

        <label className="jsonRenderer__uploadBtn">
          <input onChange={this.handleUploadChange} type="file" required/>
          <span><FaUpload className="inline-icon" /> Upload File</span>
        </label>
      </div>
    );
  }
}

export default App;
