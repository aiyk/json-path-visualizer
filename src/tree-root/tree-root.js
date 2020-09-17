import React, {Component} from 'react';
import './tree-root.scss';
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa';

class TreeRoot extends Component {

    handleCollapse = (e) => {
        e.persist();
        e.stopPropagation();
        if(e.currentTarget.className.includes('--opened')){
            e.currentTarget.className = ' hasChildren';
        } else {
            e.currentTarget.className += ' hasChildren--opened';
        }
    }

    generateKey = (knowns) => {
        return knowns +'_'+ Math.random();
    }

    getNodes(object) {
        return Object
            .entries(object)
            .map(([key, value], index) => value && typeof value === 'object'
                ? (
                    <div 
                        onClick={this.handleCollapse} 
                        id={this.generateKey(key + '_' + value[0] + '_' + index)} 
                        key={this.generateKey(key + '_' + value[0] + '_' + index, true)} 
                        className="hasChildren">
                        <div className="treeRoot">
                            <FaMinusSquare className="inline-icon" /> 
                            <span>{key}</span>
                        </div>
                        {this.getNodes(value)}
                    </div>
                )
                : (
                    <div onClick={this.handleCollapse} id={this.generateKey(key + '_' + value[0] + '_' + index)} key={this.generateKey(key + '_' + value[0] + '_' + index, true)} className="hasChildren">
                        <div className="treeRoot">
                            <FaMinusSquare className="inline-icon" /> 
                            {typeof key === 'string' && isNaN(key) ?
                                <span className="treeRoot__hasKey">{key}: </span> : null
                            }
                            <span>{value}</span>
                        </div>
                    </div>
                )
            );
    }

    render(){
        const { data } = this.props;

        if(data){
            let nodes = this.getNodes(this.props.data);
            return nodes;
        }
        return null;
    }
}

export default TreeRoot;