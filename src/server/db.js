import Axios from 'axios';
const SERVER_URL = 'https://cotton-checkers-server.herokuapp.com/';

export const getPlayersFromDB = async(id,token)=>{
    try {
        const result = await Axios.get(`${SERVER_URL}/users`,{
        data: {id}
        ,headers:{
            Authorization: `Bearer ${token}`
        }})
        return result.data
    } catch(err) {
        console.log(err.message)
    }
}