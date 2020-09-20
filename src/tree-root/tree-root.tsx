import React from 'react';
import './tree-root.scss';
import { useOvermind } from '../state'

const handleCollapse = (e:any) => {
    e.persist();
    e.stopPropagation();
    if(e.currentTarget.className.includes('--opened')){
        e.currentTarget.className = ' hasChildren';
    } else {
        e.currentTarget.className += ' hasChildren--opened';
    }
    
    let plusIcon = e.currentTarget.querySelector('.plus');
    let minusIcon = e.currentTarget.querySelector('.minus');

    if(plusIcon){
        plusIcon.className = 'minus';
    }
    if(minusIcon){
        minusIcon.className = 'plus';
    }
    
}

const generateKey = (knowns:string) => {
    return knowns +'_'+ Math.random();
}

const getParentNode = (key:any, val:any, index:any, state:any) => {
    const selectedValues:any = state.selectedValues;
    let className = "hasChildren hasChildren--opened";

    if(selectedValues.length > 0){ 
        for(var i = 0; i < selectedValues.length; i++) {
            if (selectedValues[i].key === key || selectedValues[i].value === val) { 
                className += ' highlightedNode';
                break;
            }
        }
    }
    
    return (
        <div 
            onClick={handleCollapse} 
            id={generateKey(key + '_' + index)} 
            key={generateKey(key + '_'+ index)} 
            className={className}>
            <div className="treeRoot">
                <div className="minus"></div>
                <span>{key}</span>
            </div>
            {getNodes(val, state)}
        </div>
    )
}

const getChildNode = (key:any, value:any, index:any, state:any) => {
    const { selectedValues }:any = state;
    let className = 'hasChildren lastNode hasChildren--opened';

    if(selectedValues){
        for(var i = 0; i < selectedValues.length; i++) {
            if (selectedValues[i].key === key || selectedValues[i].value === value) {
                className += ' highlightedNode';
                break;
            }
        }
    }

    return(
        <div onClick={handleCollapse} id={generateKey(key + '_'+ index)} key={generateKey(key + '_'+ index)} className={className}>
            <div className="treeRoot">
                {typeof key === 'string'  ?
                    <span className="treeRoot__hasKey">{key}: </span> : null
                }
                <span>{value}</span>
            </div>
        </div>
    );
}

const getNodes = (data:any, state: any) => {
    return Object
        .entries(data)
        .map(([key, value], index) => value && typeof value === 'object'
            ? getParentNode(key, value, index, state)
            : getChildNode(key, value, index, state)
        );
}

const TreeRoot = () => {
    const state = useOvermind().state;

    if(state.data){
        let nodes = getNodes(state.data, state);
        return nodes;
    }
    return null;
}

export default TreeRoot;