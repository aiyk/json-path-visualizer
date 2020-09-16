import React, {Component} from 'react';
import './tree-root.scss';
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa';

class TreeRoot extends Component {
    state = {}

    getNodes(object) {
        return Object
            .entries(object)
            .map(([key, value], index) => value && typeof value === 'object'
                ? (
                    <div key={index} className="hasChildren">
                        <div className="treeRoot">
                            <FaMinusSquare className="inline-icon" /> 
                            <span>{key}</span>
                        </div>
                        {this.getNodes(value)}
                    </div>
                )
                : (
                    <div key={index} className="hasChildren">
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