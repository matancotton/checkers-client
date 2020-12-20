export const initialUserState={};

const loginReducer = (loginState, action)=>{
    switch (action.type) {
        case 'LOGIN_USER':
            return {user:{...action.user}, token: action.token};
        case 'LOGOUT_USER':
            return {user: null, token: ""};
        default:
            return {...loginState}
    }
}

export default loginReducer;