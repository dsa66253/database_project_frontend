import instance from "../api";

const postUser = async (stuID) => {
    console.log("postUser was called")
    
    try{
        const {data} = await instance.post('/user', {
            body: {
                SId: stuID, 
            },
            headers:{
                'Access-Control-Allow-Origin' : '*'
            }
        });
        console.log("data", data)
        return data
    }catch (e){
        throw e
    }
}
const getUser = async () =>{ 
    // for test usage
    console.log("getUser was called")
    try{
        const data = await instance.get('/user', {
            // body: {
            //     SId: stuID, 
            // },
            headers:{
                'Access-Control-Allow-Origin' : '*'
            }
        });
        console.log("data", data)
        return data;
    }catch (e){console.log("err", e)}

}

export {getUser, postUser};