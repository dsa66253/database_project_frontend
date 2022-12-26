import instance from "../api";

const getUser = async (stuID) => {
    const {
        data: { messages, data },
    } = await instance.post('/user', {
        body: {
            SId: stuID, 
        },
    });
    return;
}

export default getUser;