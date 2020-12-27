import Axios from 'axios';
const SERVER_URL = 'https://cotton-checkers-server.herokuapp.com'
// const SERVER_URL = 'http://localhost:4000'

// export const getPlayersFromDB = async(id,token)=>{
//     try {
//         const result = await Axios.get(`${SERVER_URL}/users`,{
//         data: {id}
//         ,headers:{
//             Authorization: `Bearer ${token}`
//         }})
//         return result.data
//     } catch(err) {
//         console.log(err.message)
//     }
// }

export const getScoresFromDB = async(token)=>{
    try {
        const result = await Axios.get(`${SERVER_URL}/game-points`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return result.data
    } catch(err) {
        throw new Error('error')
    }
}

export const addScoreToDB = async (token,score)=>{
    try {
        await Axios.patch(`${SERVER_URL}/game-points`, {
             score
        },{headers: {
            Authorization: `Bearer ${token}`
        }})

        return
    } catch(err) {
        throw err
    }
}