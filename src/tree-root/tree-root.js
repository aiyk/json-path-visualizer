import React, {Component} from 'react';
import './tree-root.scss';
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa';

class TreeRoot extends Component {
    state = {}

    // toArray = (obj) => {
    //     // let arr = Object.entries(obj);
    //     // this.setState({
    //     //     data: [...this.state.data, ...arr]
    //     // });

    //     for (const [key, value] of Object.entries(obj)) {
    //         console.log(`${key}: ${value}`);
    //         this.setState({
    //             data: [key, value]
    //         });
    //     } console.log('from the toArray', this.state);
    // }

    getNodes(object) {
        return Object
            .entries(object)
            .map(([key, value]) => value && typeof value === 'object'
                // ? { key, children: this.getNodes(value) }
                // : { key, value }
                ? (
                    <div className="hasChildren">
                        <div className="treeRoot">
                            <FaMinusSquare className="inline-icon" /> 
                            <span>{key}</span>
                        </div>
                        {this.getNodes(value)}
                    </div>
                )
                : (
                    <div className="hasChildren">
                        <div className="treeRoot">
                            <FaMinusSquare className="inline-icon" /> 
                            {typeof key === 'string' && isNaN(key) ?
                                <span>{key}: </span> : null
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