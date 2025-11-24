import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteStudent, startEditStudent } from '../redux/StudentSlice';

const StudentTable = () => {
  const { studentList } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  // TÌM KIẾM DỰA TRÊN .FILTER CỦA MẢNG
  const filteredList = studentList.filter((sv) =>
    sv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-4">
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          className="border p-2 rounded w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Mã SV</th>
            <th className="py-2 px-4 text-left">Họ tên</th>
            <th className="py-2 px-4 text-left">Số điện thoại</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.length > 0 ? (
            filteredList.map((sv) => (
              <tr key={sv.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{sv.id}</td>
                <td className="py-2 px-4">{sv.name}</td>
                <td className="py-2 px-4">{sv.phone}</td>
                <td className="py-2 px-4">{sv.email}</td>
                <td className="py-2 px-4 text-center gap-2 flex justify-center">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                    onClick={() => dispatch(startEditStudent(sv))}
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => dispatch(deleteStudent(sv.id))}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                Không tìm thấy sinh viên nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;