import React, { Component } from 'react';
import { sortable } from 'react-sortable';


class Item extends React.Component {
  render() {
    return (
      <li {...this.props}>
        {this.props.children}
      </li>
    )
  }
}

var SortableItem = sortable(Item);


class SortableList extends React.Component {
 
  state = {
    items: this.props.items
  };
 
  onSortItems = (items) => {
    this.setState({
      items: items
    });
  }
 
  render() {
    const { items } = this.state;
    var listItems = items.map((item, i) => {
      return (
        <SortableItem
          key={i}
          onSortItems={this.onSortItems}
          items={items}
          sortId={i}>{item}</SortableItem>
      );
    });
 
    return (
      <ul className='sortable-list'>
        {listItems}
      </ul>
    )
  }
};

class SortableItemList extends Component{
  constructor(props){
    super(props);
    this.state={
      items : [
        "Gold",
        "Crimson",
        "Hotpink",
        "Blueviolet",
        "Cornflowerblue",
        "Skyblue",
        "Lightblue",
        "Aquamarine",
        "Burlywood"
      ]
    }
  }


  render(){
    const {items} = this.state;
    return(

      <SortableList items={items} />
    )
  }
}

export default SortableItemList;