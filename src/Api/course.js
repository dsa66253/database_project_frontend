import instance from "../api";

const getCourseInfo = async (courseID, lan) => {
    const {data} = await instance.get('/course',{
        params: {
            CId: courseID,
        },
        headers: {
            lang: lan
        }
    });
    return data;
}

export default getCourseInfo;