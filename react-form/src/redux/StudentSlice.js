import { createSlice } from '@reduxjs/toolkit';
import { startTransition } from 'react';

const initialState = {
    studentList: [
        { id: '1', name: 'Nguyễn Văn A', phone: '0938111111', email: 'nguyenvana@gmail.com'},
        { id: '2', name: 'Nguyễn Văn B', phone: '0938222322', email: 'nguyenvanb@gmail.com'},
    ],
    studentEdit: null, // Sinh viên đang được chọn để chỉnh sửa
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        addStudent: (state, action) => {
            state.studentList.push(action.payload);
        },
        
        deleteStudent: (state, action) => {
            state.studentList = state.studentList.filter((sv) => sv.id !== action.payload);
        },

        startEditStudent: (state, action) => {
            state.studentEdit = action.payload; // Đẩy data lên form
        },

        updateStudent: (state, action) => {
            const index = state.studentList.findIndex((sv) => sv.id == action.payload.id);
            if (index !== -1) {
                state.studentList[index] = action.payload;
            }
            state.studentEdit = null; // Reset sau khi update xong
        },
    },
});

export const { addStudent, deleteStudent, startEditStudent, updateStudent } = studentSlice.actions;
export default studentSlice.reducer