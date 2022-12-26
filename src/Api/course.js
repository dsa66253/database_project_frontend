import instance from "../api";

const getCourseInfo = async (courseID) => {
    const {
        data: { messages, data },
    } = await instance.get('/course',{
        body: {
            CId: courseID,
        }
    });
    return data;
}

export default getCourseInfo;