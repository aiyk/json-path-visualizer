import React, { Component } from 'react';
import './App.scss';
import { FaUpload } from 'react-icons/fa';
import TreeRoot from './tree-root/tree-root'

class App extends Component {
  state = {
    data: null,
    error: false
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

    const ext = 'json'
    const fileName = files[0].name;
    let file_ext = fileName.split('.');
    if (file_ext[file_ext.length - 1].toLowerCase() === ext.toLowerCase()) {
      const fr = new FileReader();
      fr.onload = (e) => {
        const result = JSON.parse(e.target.result);
        this.setState({
          data: result,
          error: false
        });
      }
      fr.readAsText(files.item(0));
    } else {
      this.setState({
        data: null,
        error: true
      });

      let timer;
      let _self = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        _self.setState({
          data: null,
          error: false
        });
      }, 4000);
      
    }
  }

  render(){
    return (
      <div className="jsonRenderer">
        {this.state.error?
          <div className="jsonRenderer__error">
            <div className="jsonRenderer__error__title">Wrong file format</div>
            kindly upload a json file instead!
          </div> : null
        }

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
