const userData = {
    user: [
        { id: 1, name: 'John', age: 30 },
    ],
    userInfo:{}
}
export default function userReducer(state = userData, action) {
    console.log(action);
    switch (action.type) {
        case 'INITUSER':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}