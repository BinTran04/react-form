import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, updateStudent } from '../redux/StudentSlice';

const StudentForm = () => {
  const dispatch = useDispatch();
  const { studentEdit, studentList } = useSelector((state) => state.student);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState({});

  // SỬ DỤNG LIFECYCLE CHO CHỨC NĂNG CHỈNH SỬA
  // useEffect ở đây tương đương với componentDidUpdate
  // Khi studentEdit trên Redux thay đổi, form sẽ tự điền dữ liệu
  useEffect(() => {
    if (studentEdit) {
      setFormData(studentEdit);
    } else {
      // Reset form nếu không có user cần edit
      setFormData({ id: '', name: '', phone: '', email: '' });
    }
  }, [studentEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // FORM VALIDATION
  const validate = () => {
    let newErrors = {};
    let isValid = true;

    // Validate Mã SV
    if (!formData.id.trim()) {
      newErrors.id = 'Mã SV không được để trống';
      isValid = false;
    } else if (!studentEdit && studentList.some((sv) => sv.id === formData.id)) {
        // Kiểm tra trùng ID khi thêm mới
        newErrors.id = 'Mã SV đã tồn tại';
        isValid = false;
    }

    // Validate Tên
    if (!formData.name.trim()) {
      newErrors.name = 'Tên không được để trống';
      isValid = false;
    } else if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(formData.name)) {
       newErrors.name = 'Tên phải là chữ';
       isValid = false;
    }

    // Validate Số điện thoại
    if (!formData.phone.trim()) {
      newErrors.phone = 'SĐT không được để trống';
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email không đúng định dạng';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (studentEdit) {
        // Logic Update
        dispatch(updateStudent(formData));
      } else {
        // Logic Add
        dispatch(addStudent(formData));
      }
      // Reset form
      setFormData({ id: '', name: '', phone: '', email: '' });
      setErrors({});
    }
  };

  return (
    <div className="p-4 border rounded shadow-lg mb-8">
      <div className="bg-gray-800 text-white p-2 mb-4 font-bold text-xl">
        Thông tin sinh viên
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Mã SV</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            disabled={!!studentEdit} // Không cho sửa ID khi đang edit
            className={`w-full border p-2 rounded ${errors.id ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.id && <span className="text-red-500 text-sm">{errors.id}</span>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Họ tên</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
           {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
           {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        <div className="col-span-2 mt-2">
          <button
            type="submit"
            className={`px-4 py-2 text-white font-bold rounded ${
              studentEdit ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {studentEdit ? 'Cập nhật sinh viên' : 'Thêm sinh viên'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;