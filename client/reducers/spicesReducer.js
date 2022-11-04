import * as types from '../constants/actionTypes';

const initialState = {
  spiceRack: [],
  loggedIn: false,
  username: '',
};

const spicesReducer = (state = initialState, action) => {
  switch(action.type){
    case types.LOG_OUT: {
      return initialState;
      };

    case types.LOGGED_IN: {
      return {
        ...state,
        loggedIn: true ? false: true,
      };
    };

    case types.USER: { 
      console.log('inside USER reducer');
      const currUser = action.payload;
      return {
        ...state,
        username: currUser,
      };
    };

    case types.GENERATE_SPICE: {
      console.log('Generate Spice Reducer');
      const spiceList = action.payload;
      return {
        ...state,
        spiceRack: spiceList,
      };
    };

    case types.UPDATE_SPICE: {
      for (let i = 0; i < state.spiceRack.length; i++) {
        if (state.spiceRack[i] == action.payload.id){
          console.log('update reducer when id = existing id');
          return {...state, spiceRack: (state.spiceRack[i].remaining = action.payload.remaining)};      
      } else if (action.payload.name){
            const spice = action.payload;
            return {
              ...state,
              spiceRack: state.spiceRack.push(spice),
            }}}
    };

    case types.DELETE_SPICE: {
      console.log('Delete Spice Reducer');
      let updatedSpiceRack = state.spiceRack;
      updatedSpiceRack = updatedSpiceRack.filter(spice => spice.id !== action.payload);
      return {
        ...state,
        spiceRack: updatedSpiceRack,
      };
    };

    default: {
      return state
    };
    
  };
};

export default spicesReducer;