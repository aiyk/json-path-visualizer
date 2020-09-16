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
                ? { title: key, key, children: this.getNodes(value) }
                : { title: key, key, value }
            );
    }

    render(){
        if(this.props.data){
            console.log(this.getNodes(this.props.data));
            this.getNodes(this.props.data);
        }
        
        const { data } = this.props;
        let entries;

        if(data){
            entries = Object.entries(data);
            entries = entries[0];
            let rootItem = [];
            for (let [index, item] in entries[1]) {
                if (data.hasOwnProperty(item)) {
                    let itemKey = Object.keys(item);
                    rootItem.push(
                        <div key={index}>{itemKey[0]}</div>
                    );
                }
            }
            return(
                <div className="treeRoot">
                    <FaMinusSquare className="inline-icon" /> 
                    <span>{entries[0]}</span>
                </div>
            );
        }
        return null;
    }
}

export default TreeRoot;