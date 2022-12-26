import instance from "../api";

const getCourseInfo = async (courseID) => {
    const {data} = await instance.get('/course',{
        params: {
            CId: courseID,
        },
        headers: {
            lang: 'ch'
        }
    });
    return data;
}

export default getCourseInfo;