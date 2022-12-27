import instance from "../api";

const getSchedule = async (stuID, lan) => {
    const {data} = await instance.get('/courseByUser', {
        params: {
            SId: stuID, 
        },
        headers: {
            lang: lan
        }
    });
    return data;
}

const addCourseByUser = async (stuID, CId) => {
    const {data} = await instance.post('/courseByUser',{
        body: {
            SId: stuID,
            CId: CId,
        }
    });
    return data;
}
const deleteCourseByUser = async(stuID, cid) => {
    const {data} = await instance.delete('/courseByUser',{
        params: {
            SId: stuID,
            CId: cid,
        }
    });
    return data;
}

export {getSchedule, addCourseByUser, deleteCourseByUser}