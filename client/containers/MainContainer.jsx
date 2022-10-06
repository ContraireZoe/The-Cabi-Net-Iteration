import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar.jsx';
import AddSpice from '../components/AddSpice.jsx';
import SpiceContainer from './SpiceContainer.jsx';
// import { updateSpiceActionCreator } from '../actions/actions.js';
import { connect, useDispatch } from 'react-redux';
import { updateSpice } from '../../server/controllers/spiceController.js';

const mapStateToProps = state => ({
  spiceRack: state.spices.spiceRack,
  username: state.spices.username
});

const mapDispatchToProps = dispatch => ({
  updateSpice : (spiceObj) => dispatch(/*function here*/{ type: 'UPDATE_SPICE', payload: spiceObj }),
});

const MainContainer = (props) => {
  const dispatch = useDispatch();
  const [ updateRack, toggleRack ] = useState(0);


  function handleGet(e) {
    console.log('Handle Get in Main Container', props.username);
    fetch(`/spice/${props.username}`, {
      method: 'GET',
        headers: {
          'Accept': "application/json, text/plain, */*",
          'Content-Type': 'application/json',
          },
        })
      .then((res) => res.json())
      .then((data) => {
        console.log('inside handleGet after request');
        return dispatch(/*on click function here*/{ type: 'GENERATE_SPICE', payload: data })
    })};
  
  function handlePost(spiceObj) {
    fetch(`/spice/${props.username}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: spiceObj.name,
        remaining: spiceObj.remaining,
        containersize: spiceObj.containersize,
      }),
    })
      .then((res) => {
        console.log('response in handlePost, main container: ', res)
        //this will update the state variable, updateRack, and increment it by 1
        //by doing this, it will proc the useEffect to re-render with updated spice
        toggleRack((rack) => rack + 1)
        return updateSpice(res.json());
      })
      .catch((err) => {
        console.log(err);
      })
  };
  
  useEffect(() => {
    if (props.username !== '') handleGet()
  }, [props.username, updateRack])


  return (
    <div>
      <Navbar logout={props.logout}/>
      <AddSpice createSpice={handlePost}/>
      <SpiceContainer />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);