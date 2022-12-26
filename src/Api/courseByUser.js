import instance from "../api";

const getSchedule = async (stuID) => {
    const {
        data: { messages, data },
    } = await instance.get('/courseByUser', {
        body: {
            SId: stuID, 
        },
    });
    if(messages) {
        return data;
    } 
}

const addCourse = async (stuID, CId) => {
    const {
        data: { messages, data },
    } = await instance.post('/courseByUser',{
        body: {
            SId: stuID,
            CId: CId,
        }
    });
    if(messages) {
        return data;
    }
}
const deleteCourse = async(stuID, cid) => {
    const {
        data: { messages, data },
    } = await instance.delete('/courseByUser',{
        body: {
            SId: stuID,
            CId: cid,
        }
    });
    return data;
}

export {getSchedule, addCourse, deleteCourse}