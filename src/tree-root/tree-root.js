import React, {Component} from 'react';
import './tree-root.scss';

class TreeRoot extends Component {

    handleCollapse = (e) => {
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

    generateKey = (knowns) => {
        return knowns +'_'+ Math.random();
    }

    getParentNode = (key, value, index) => {
        const { selectedValues } = this.props;
        let className = "hasChildren hasChildren--opened";

        if(selectedValues){
            for(var i = 0; i < selectedValues.length; i++) {
                if (selectedValues[i].key === key || selectedValues[i].value === value) {
                    className += ' highlightedNode hasChildren--opened';
                    break;
                }
            }
        }
        
        return (
            <div 
                onClick={this.handleCollapse} 
                id={this.generateKey(key + '_' + value[0] + '_' + index)} 
                key={this.generateKey(key + '_' + value[0] + '_' + index, true)} 
                className={className}>
                <div className="treeRoot">
                    <div className="minus"></div>
                    <span>{key}</span>
                </div>
                {this.getNodes(value)}
            </div>
        )
    }

    getChildNode = (key, value, index) => {
        const { selectedValues } = this.props;
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
            <div onClick={this.handleCollapse} id={this.generateKey(key + '_' + value[0] + '_' + index)} key={this.generateKey(key + '_' + value[0] + '_' + index, true)} className={className}>
                <div className="treeRoot">
                    {typeof key === 'string' && isNaN(key) ?
                        <span className="treeRoot__hasKey">{key}: </span> : null
                    }
                    <span>{value}</span>
                </div>
            </div>
        );
    }

    getNodes = (object) => {
        return Object
            .entries(object)
            .map(([key, value], index) => value && typeof value === 'object'
                ? this.getParentNode(key, value, index)
                : this.getChildNode(key, value, index)
            );
    }

    render(){
        const { data } = this.props;

        if(data){
            let nodes = this.getNodes(data);
            return nodes;
        }
        return null;
    }
}

export default TreeRoot;