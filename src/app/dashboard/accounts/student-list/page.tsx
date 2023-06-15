'use client'
import { useState, useEffect, useCallback } from 'react';
import { getFirestore, collection, query, limit, getDocs, deleteDoc, doc } from 'firebase/firestore';

function StudentListPage() {
  const [students, setStudents] = useState<{ ID: string; first_name: string; last_name: string; course: string; year: string; }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{ ID: string; first_name: string; last_name: string; course: string; year: string; } | null>(null);

  const fetchStudents = useCallback(async () => {
    const firestore = getFirestore();
    const studentsCollection = collection(firestore, 'students');
    const studentsQuery = query(studentsCollection, limit(studentsPerPage));
    const studentsSnapshot = await getDocs(studentsQuery);
    const studentsData = studentsSnapshot.docs.map((doc) => doc.data() as { ID: string; first_name: string; last_name: string; course: string; year: string; });
    setStudents(studentsData);
  
    const totalStudents = studentsSnapshot.size;
    setTotalPages(Math.ceil(totalStudents / studentsPerPage));
  }, [studentsPerPage]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const goToPage = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
    await fetchStudents();
  };

  const handleDelete = async (student: { ID: string; first_name: string; last_name: string; course: string; year: string; }) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleModalConfirm = async () => {
    setShowModal(false);
    if (selectedStudent) {
      const firestore = getFirestore();
      const studentDoc = doc(firestore, 'students', selectedStudent.ID);
      await deleteDoc(studentDoc);
      setSelectedStudent(null);
      fetchStudents();
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`px-2 py-1 mx-1 rounded ${
            currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-200'
          }`}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }
    return <div className="mt-4 flex justify-end">{pages}</div>;
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>
      <table className="w-full bg-white border border-gray-200">
        <thead>
          <tr className="text-left bg-gray-100 text-black">
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Course</th>
            <th className="px-4 py-2">Year</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.ID} className="border-b border-gray-200 text-black hover:bg-slate-400">
              <td className="px-4 py-2">{student.first_name}</td>
              <td className="px-4 py-2">{student.last_name}</td>
              <td className="px-4 py-2">{student.course}</td>
              <td className="px-4 py-2">{student.year}</td>
              <td className="px-4 py-2">
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded" onClick={() => handleDelete(student)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderPagination()}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div
            className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                    Delete Student
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete the student: {selectedStudent?.first_name}{' '}
                      {selectedStudent?.last_name}?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleModalConfirm}
              >
                Delete
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={handleModalCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentListPage;