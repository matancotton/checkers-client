export const loginAction = ({user, token})=>({
    type: 'LOGIN_USER',
    user,
    token
})
export const logoutAction = ()=>({
    type: 'LOGOUT_USER'

})