import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

// I think prop drilling the props down from SpiceContainer will be better than mappingstate and dispatch to props here..
// then once onSubmit is invoked, we can go up the chain into SpiceContainer and send the info to actions.js

const mapStateToProps = state => ({
  username: state.spices.username
});

const AddSpice = (props) => {

  const handleClick = () => {
    const name = document.getElementById('name').value
    const containerSize = document.getElementById('containerSize').value
    const remaining = document.getElementById('remaining').value
    const spiceObj = {
      name: name,
      containersize: containerSize,
      remaining: remaining
    }
    console.log('this is the spiceInfo ', spiceObj, )
    props.createSpice(spiceObj);
  }

  return (
    <div className="add-spice-container">
      <p><strong className='add-bar'>Add to your Cabi.net!</strong></p>
      <input type="text" placeholder="item name" id="name"></input>
      <input type="text" placeholder="container size"id="containerSize"></input>
      <input type="number" placeholder="% left" id="remaining"></input>
      <button className="addBtn" type="submit" onClick={handleClick}>Add!</button>
    </div>
  )
}

export default connect(mapStateToProps)(AddSpice)