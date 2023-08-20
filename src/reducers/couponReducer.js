export const couponrReducer = (state = false, action) => {
    switch (action.type) {
        case "COUPON_APPLIED":          // Type
            return action.payload;      // Payload
        default:
            return state;
    }
}