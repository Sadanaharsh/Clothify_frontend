export const drawerReducer = (state = false, action) => {
    switch (action.type) {
        case "SET_VISIBLE":          // Type
            return action.payload;      // Payload
        default:
            return state;
    }
}