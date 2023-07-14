import { CURRENT_PAGE } from './actionTypes';


const INITIAL_STATE = {
  currentPage: "",
};

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default: return state;

  }

};

export default reducer;