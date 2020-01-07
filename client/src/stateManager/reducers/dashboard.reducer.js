import type from "../types";


const initialState = {
  count: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    //store all running instance
    case type.INCREMENT:
      console.log("action",action);
      return {
        ...state,
        count: action.data
      };
    default:
      return state;
  }
};
