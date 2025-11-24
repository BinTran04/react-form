import React from 'react';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import './App.css';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4 uppercase">
        Bài tập quản lý sinh viên - Redux
      </h1>
      <StudentForm />
      <StudentTable />
    </div>
  );
}

export default App;