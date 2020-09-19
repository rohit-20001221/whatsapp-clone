export const initialState = {
  user: null,
  token: "",
  rooms: [],
  currentRoom: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER":
      return { ...state, user: action.user, token: action.token };
    case "FETCH_ROOMS":
      return { ...state, rooms: action.rooms };
    case "CHANGE_ROOM":
      const id = action.id;
      let currentRoom = state.rooms.filter((i) => i?._id === id)[0];
      return { ...state, currentRoom: currentRoom };
    case "ADD_MESSAGE":
      let room = state.currentRoom;
      room.messages = [...room.messages, action.message];
      return { ...state, currentRoom: room };
    case "LOGOUT":
      return {
        user: null,
        token: "",
        rooms: [],
        currentRoom: null,
      };
    default:
      return state;
  }
};

export default reducer;
