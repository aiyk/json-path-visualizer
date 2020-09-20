import React from 'react';
import './App.scss';
import { FaUpload } from 'react-icons/fa';
import TreeRoot from './tree-root/tree-root'
import {JSONPath} from 'jsonpath-plus';
import { useOvermind } from './state'

const handleFilterChange = (e, state, actions) => {
  if(state.data){
    let timer;
    const val = e.target.value;
    let selected = [];
    clearTimeout(timer);
    timer = setTimeout(() => {
      JSONPath({path: val.trim(), json: state.data, callback: (val, key, payload)=> {
        selected.push({
          key: payload.parentProperty,
          value: val,
        })
      }});
      actions.selectedValuesUpdate(selected);
    }, 1000);
  }
}

const handleUploadChange = (e, actions) => {
  actions.setLoading(true);
  const files = e.target.files;   
  if (files.length <= 0) {
    actions.setLoading(false);
    return false;
  }

  const ext = 'json'
  const fileName = files[0].name;
  let file_ext = fileName.split('.');
  if (file_ext[file_ext.length - 1].toLowerCase() === ext.toLowerCase()) {
    const fr = new FileReader();
    fr.onload = (e) => {
      const result = JSON.parse(e.target.result);
      actions.loadJson(result);
      actions.error(false);
      actions.setLoading(false);
    }
    fr.onerror = (e) => { console.log(e);
      actions.loadJson({error: e});
      actions.error(false);
      actions.setLoading(false);
    }
    fr.readAsText(files.item(0));
  } else {
    actions.setLoading(false);
    actions.error(true);

    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => { actions.reset() }, 4000);
    
  }
}

const App = () => {
  const state = useOvermind().state;
  const actions = useOvermind().actions;

  return (
    <div className="jsonRenderer">
      {state.error?
        <div className="jsonRenderer__error">
          <div className="jsonRenderer__error__title">Wrong file format</div>
          kindly upload a json file instead!
        </div> : null
      }

      {state.isLoading ? <div className="loader"></div> : null}

      <input type="text" onChange={(e) => {handleFilterChange(e, state, actions)}} className="jsonRenderer__filter" placeholder="type in your query..." />
      <div className="jsonRenderer__contentArea nice nice-scroll">
        <TreeRoot selectedValues={state.selectedValues} data={state.data} />
      </div>

      <label className="jsonRenderer__uploadBtn">
        <input onChange={(e) => {handleUploadChange(e, actions)}} type="file" required/>
        <span><FaUpload className="inline-icon" /> Upload File</span>
      </label>
    </div>
  );
}

export default App;
