export const initialState = {
  user: null,
  token: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER":
      return { ...state, user: action.user, token: action.token };
    default:
      return state;
  }
};

export default reducer;
