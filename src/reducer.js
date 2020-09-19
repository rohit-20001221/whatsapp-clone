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
    case "GOT_MESSAGE":
      const id_ = action.id;
      const message_ = action.message;
      const rooms__ = state.rooms.map((item) => {
        if (item._id === id_) {
          item.messages = [...item.messages, message_];
          return item;
        } else {
          return item;
        }
      });

      let current_room_ = state.currentRoom;
      if (current_room_._id === id_) {
        current_room_.messages = [...current_room_.messages, message_];
      }

      return { ...state, rooms: rooms__, currentRoom: current_room_ };
    default:
      return state;
  }
};

export default reducer;
