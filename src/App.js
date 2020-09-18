import React, { Component } from 'react';
import './App.scss';
import { FaUpload } from 'react-icons/fa';
import TreeRoot from './tree-root/tree-root'
import {JSONPath} from 'jsonpath-plus';

class App extends Component {
  state = {
    data: null,
    selectedValues: null,
    isLoading: false,
    error: false
  }

  handleFilterChange = (e) => {
    this.setState({isLoading: true});
    const val = e.target.value;
    let selectedValues = [];
    JSONPath({path: val.trim(), json: this.state.data, callback: (val, key, payload)=> {
      selectedValues.push({
        key: key,
        value: val
      })
    }});
    this.setState({selectedValues: selectedValues});
    this.setState({isLoading: false});
  }

  handleUploadChange = (e) => { 
    this.setState({isLoading: true});
    const files = e.target.files;   
    if (files.length <= 0) {
      this.setState({isLoading: false});
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
          isLoading: false,
          error: false
        });
      }
      fr.readAsText(files.item(0));
    } else {
      this.setState({
        data: null,
        isLoading: false,
        error: true
      });

      let timer;
      let _self = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        _self.setState({
          data: null,
          isLoading: false,
          error: false
        });
      }, 4000);
      
    }
  }

  isLoading = (state) => {
    this.setState({
      isLoading: state
    });
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

        {this.state.isLoading ? <div className="loader"></div> : null}

        <input type="text" onChange={this.handleFilterChange} className="jsonRenderer__filter" placeholder="type in your query..." />
        <div className="jsonRenderer__contentArea nice nice-scroll">
          <TreeRoot isLoading={this.isLoading} selectedValues={this.state.selectedValues} data={this.state.data} />
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
