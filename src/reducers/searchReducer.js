export const searchReducer = (state = { text: '' }, action) => {
    switch (action.type) {
        case "SEARCH_QUERY":          // Type
            return { ...state, ...action.payload };      // Payload
        default:
            return state;
    }
}