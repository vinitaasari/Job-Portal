import { ADD_ONE } from 'actions';

const initialState = {
    token: 1277777
  };
  
  function reducer(state = initialState, action) {
  switch(action.type) { 
    case ADD_ONE:
      return {
        token: 1111111
      };  
    default:
      return state;
    }
  }
  
  export default reducer;