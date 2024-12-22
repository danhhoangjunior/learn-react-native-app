import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const chapter_data = [
    {
        "course": {
            "seName": "react-native",
            "id": "SizLRhxzjMW85zueQvCn",
            "title": "React Native"
        },
        "created_at": {
            "seconds": 1647509041,
            "nanoseconds": 994000000
        },
        "skillId": "",
        "courseId": "",
        "image": "https://storage.googleapis.com/programminghub/course_icons/andriod/036.png",
        "topicId": "",
        "title": "React Native - The Native Touch",
        "id": "3635c73f-d651-4350-b479-2440263cd56c",
        "seName": "react_native_-_the_native_touch"
    },
    {
        "id": "561fe5cc-8765-4e62-a9e6-ec77c9ce53c1",
        "skillId": "",
        "course": {
            "id": "SizLRhxzjMW85zueQvCn",
            "title": "React Native",
            "seName": "react-native"
        },
        "image": "https://storage.googleapis.com/programminghub/course_icons/andriod/003.png",
        "created_at": {
            "seconds": 1647509068,
            "nanoseconds": 450000000
        },
        "topicId": "",
        "courseId": "",
        "seName": "environment_setup",
        "title": "Environment Setup"
    },
    {
        "image": "https://storage.googleapis.com/programminghub/course_icons/andriod/002.png",
        "topicId": "",
        "created_at": {
            "seconds": 1647509077,
            "nanoseconds": 317000000
        },
        "courseId": "",
        "skillId": "",
        "id": "30000ebb-fab2-4704-b7a6-13fdd8923eba",
        "course": {
            "id": "SizLRhxzjMW85zueQvCn",
            "seName": "react-native",
            "title": "React Native"
        },
        "title": "Our First Application",
        "seName": "our_first_application"
    },
    {
        "courseId": "",
        "skillId": "",
        "created_at": {
            "seconds": 1647509091,
            "nanoseconds": 761000000
        },
        "title": "The Design Process",
        "course": {
            "id": "SizLRhxzjMW85zueQvCn",
            "title": "React Native",
            "seName": "react-native"
        },
        "id": "95d195e2-af91-4184-9bde-1cfbf45413df",
        "topicId": "",
        "image": "https://storage.googleapis.com/programminghub/course_icons/andriod/104.png",
        "seName": "the_design_process"
    },
    {
        "topicId": "",
        "courseId": "",
        "course": {
            "id": "SizLRhxzjMW85zueQvCn",
            "title": "React Native",
            "seName": "react-native"
        },
        "seName": "images_in_react_native",
        "created_at": {
            "seconds": 1647509098,
            "nanoseconds": 532000000
        },
        "title": "Images in React Native",
        "id": "b36b070d-e9e4-4baf-b51c-8b2457f06bde",
        "image": "https://storage.googleapis.com/programminghub/course_icons/andriod/065.png",
        "skillId": ""
    },
    {
        "created_at": {
            "seconds": 1647509108,
            "nanoseconds": 434000000
        },
        "courseId": "",
        "id": "14316de2-16e9-44ab-9e37-35df0ad62576",
        "image": "https://storage.googleapis.com/programminghub/course_icons/andriod/124.png",
        "course": {
            "seName": "react-native",
            "id": "SizLRhxzjMW85zueQvCn",
            "title": "React Native"
        },
        "title": "The Component Library",
        "seName": "the_component_library",
        "topicId": "",
        "skillId": ""
    },
    {
        "topicId": "",
        "seName": "user_interaction",
        "title": "User Interaction",
        "course": {
            "title": "React Native",
            "seName": "react-native",
            "id": "SizLRhxzjMW85zueQvCn"
        },
        "image": "https://storage.googleapis.com/programminghub/course_icons/andriod/043.png",
        "courseId": "",
        "id": "ccfbba48-adbf-48cd-9894-ab231713963b",
        "created_at": {
            "seconds": 1647509115,
            "nanoseconds": 136000000
        },
        "skillId": ""
    },
    {
        "image": "https://storage.googleapis.com/programminghub/course_icons/andriod/031.png",
        "courseId": "",
        "skillId": "",
        "seName": "understanding_navigation",
        "title": "Understanding Navigation",
        "created_at": {
            "seconds": 1647509122,
            "nanoseconds": 0
        },
        "id": "a359abe5-ca7b-4ce0-be20-cba29a2dbc7e",
        "course": {
            "id": "SizLRhxzjMW85zueQvCn",
            "title": "React Native",
            "seName": "react-native"
        },
        "topicId": "",
    }
]

interface Topic {
    id: string;
    title: string;
    content: string;
}

interface TopicsState {
    chapters: object[];
    topics: Topic[];
    isLoading: boolean;
}

const initialState: TopicsState = {
    chapters: [],
    topics: [],
    isLoading: false,
};

const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        setTopics(state, action: PayloadAction<Topic[]>) {
            state.chapters = chapter_data.map(chapter => ({
                ...chapter,
                topics: action.payload.filter(topic => topic.chapterId === chapter.seName)
            }));
            state.topics = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
});

export const {setTopics, setLoading} = topicsSlice.actions;
export default topicsSlice.reducer;
