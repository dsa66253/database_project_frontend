import { useState } from "react";
import { Input } from "antd";
import { Lesson } from "./Lesson";

const Header = () => {
    const [addLesson, setaddLesson] = useState();
    const [searchLesson, setSearchLesson] = useState();
    const {addCourse, getCourseInfo, courseInfo} = Lesson();
    return (
        <div>
            <h1>Lesson Table</h1>
            <Input.Search
                value={addLesson}
                onChange={(e) => setaddLesson(e.target.value)}
                enterButton="Add Course"
                placeholder="Enter a lesson ID."
                onSearch={(addLesson) => {
                    if(!addLesson) {
                        return;
                    }
                    addCourse(addLesson);
                }}
            />
            <Input.Search
                value={searchLesson}
                onChange={(e) => setSearchLesson(e.target.value)}
                enterButton="Add Course"
                placeholder="Enter a lesson ID."
                onSearch={(searchLesson) => {
                    if(!searchLesson) {
                        return;
                    }
                    getCourseInfo(searchLesson);
                }}
            />
            {/* 印出 course Info */}
        </div>
    );
}

export default Header;