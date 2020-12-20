import Axios from 'axios';
const SERVER_URL = 'https://cotton-checkers-server.herokuapp.com'
export const subscribeToDB = async (user)=>{
    try {
        const result = await Axios.post(`${SERVER_URL}/users/add`,{...user})
        return {
            user: result.data.user,
            token: result.data.token
        }
    } catch (err) {
        throw new Error(err.message)
    }
    

}

export const loginToSite = async (username, password) => {
    try {
        const res = await Axios.post(
            `${SERVER_URL}/users/login`,
            { username, password}
        );

        return {
            token: res.data.token,
            user: res.data.user
        };
    } catch (err) {
        throw new Error('username or password are invalid!!!')
    }
};

export const logoutFromSite = async (userState)=>{
    try {
            await Axios.post(`${SERVER_URL}/users/logout`,userState.user,{
                headers: {
                    Authorization: 'Bearer ' + userState.token
                }
            })
    } catch(err) {
        console.log(err)
    }
}