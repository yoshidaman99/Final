'use client'
import { getFirestore, query, getDocs, collection, where } from 'firebase/firestore';
import { initFirebase } from '@/firebase/firebaseApp';
import { useState, useEffect } from 'react';

function RequestList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataColumn, setDataColumn] = useState<{ startDate: any; endDate: any; totalDays: number; }[]>([]);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchRequestList() {
      try {
        initFirebase();
        const firestore = getFirestore();

        const newLocal = "todos";
        // Create a query to retrieve the user document with the matching ID
        const usersCollection = collection(firestore, newLocal);
        const userQuery = query(usersCollection, where('archive', '==', false));

        // Get the snapshot of the query result
        const snapshot = await getDocs(userQuery);

        if (!snapshot.empty) {

          const document = snapshot.docs.map((doc) => {
            const data = doc.data();
            const startDate = data.startDate?.toDate(); // Convert startDate to Date object
            const endDate = data.completedAt?.toDate(); // Convert endDate to Date object
            const totalDays = calculateTotalDays(startDate, endDate); // Calculate total days
          
            return {
              id: doc.id, // Include the id property
              ...data,
              startDate: startDate?.toLocaleDateString(), // Convert startDate to formatted string
              endDate: endDate?.toLocaleDateString(), // Convert endDate to formatted string
              totalDays,
            };
          });

          setDataColumn(document);
        }
      } catch (error) {
        throw error;
      }
    }

    fetchRequestList();
  }, []);

  function calculateTotalDays(startDate: Date | undefined, endDate: Date | undefined): number {
    if (startDate && endDate) {
      const diffInMilliseconds = endDate.getTime() - startDate.getTime();
      let diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
      if(diffInDays == 0)
       diffInDays = 1;
      return diffInDays;
    }
    return 0;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataColumn.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataColumn.length / itemsPerPage);



  const handleChangePage = (page : number) => {
    setCurrentPage(page);
  };

  const columns: string[] = ["id", "name", "title", "type_Request", "startDate", "endDate", "status", "totalDays"];

  return (
    <>
      <table className="min-w-full divide-y divide-slate-800">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="font-bold px-6 py-3 text-left text-lg text-gray-500 uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item : any) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td
                  key={column}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {item[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6.707 7.293a1 1 0 010 1.414L3.414 12H16a1 1 0 110 2H3.414l3.293 3.293a1 1 0 11-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-4 pt-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M13.293 12.707a1 1 0 010-1.414L16.586 8H4a1 1 0 110-2h12.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className='px-2'>
            <p className="text-sm text-gray-700 mt-2">
              Showing
              <span className="font-medium mx-1">{indexOfFirstItem + 1}</span>
              to
              <span className="font-medium mx-1">{indexOfLastItem}</span>
              of
              <span className="font-medium mx-1">{dataColumn.length}</span>
              results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => handleChangePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.707 7.293a1 1 0 010 1.414L3.414 12H16a1 1 0 110 2H3.414l3.293 3.293a1 1 0 11-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {Array.from(Array(totalPages).keys()).map((page) => (
                <button
                  key={page + 1}
                  onClick={() => handleChangePage(page + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === page + 1
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={() => handleChangePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-4 pt-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.293 12.707a1 1 0 010-1.414L16.586 8H4a1 1 0 110-2h12.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </nav>
    </>
  );
}

export default RequestList;