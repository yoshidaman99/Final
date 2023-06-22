'use client'
import { getFirestore, query, getDocs, collection, where, limit, startAfter, orderBy } from 'firebase/firestore';
import { initFirebase } from '@/firebase/firebaseApp';
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const ITEMS_PER_PAGE = 10; // Number of items to display per page

export function RequestListInProgress() {
  const chartCanvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [startAfterDoc, setStartAfterDoc] = useState<any>(null); // Keep track of the last document snapshot

  useEffect(() => {
    const fetchData = async () => {
      try {
        initFirebase();
        const firestore = getFirestore();

        const newLocal = 'todos';
        // Create a query to retrieve the user document with the matching ID
        const usersCollection = collection(firestore, newLocal);
        let userQuery = query(
          usersCollection,
          where('status', '==', 'inprogress'),
          limit(ITEMS_PER_PAGE) // Limit the number of items per page
        );

        if (startAfterDoc) {
          // Set the startAfter clause using the last document snapshot
          userQuery = query(userQuery, startAfter(startAfterDoc));
        }

        // Get the snapshot of the query result
        const snapshot = await getDocs(userQuery);

        if (!snapshot.empty) {
          // Group requests by date and count the number of requests per day
          const requestsByDate: Record<string, number> = {};

          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            const startDate = data.startDate?.toDate(); // Convert startDate to Date object
            const formattedDate = startDate?.toLocaleDateString();

            if (startDate) {
              if (requestsByDate[formattedDate]) {
                requestsByDate[formattedDate]++;
              } else {
                requestsByDate[formattedDate] = 1;
              }
            }
          });

          const dates = Object.keys(requestsByDate);
          const requestCounts = Object.values(requestsByDate);

          const chartData = {
            labels: dates,
            datasets: [
              {
                label: 'Request In Progress Count',
                data: requestCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
              },
            ],
          };

          const chartOptions = {
            indexAxis: 'y' as const, // Set indexAxis to 'y'
            scales: {
              x: {
                beginAtZero: true,
                precision: 0,
                stepSize: 1,
              },
              y: {
                beginAtZero: true,
                precision: 0,
                stepSize: 1,
              },
            },
          };

          if (chartCanvasRef.current) {
            new Chart(chartCanvasRef.current, {
              type: 'bar',
              data: chartData,
              options: chartOptions as any, // Type assertion to bypass the type checking error
            });
          }

          // Update the startAfterDoc with the last document snapshot
          const lastDoc = snapshot.docs[snapshot.docs.length - 1];
          setStartAfterDoc(lastDoc);
        } else {
          
        }
      } catch (error) {
        alert('Error retrieving data');
        throw error;
      }
    };

    fetchData();
  }, [currentPage, startAfterDoc]);

  return (
    <div>
      <div className="flex justify-center mt-5">
        <canvas ref={chartCanvasRef}></canvas>
      </div>
      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, onPageChange }: PaginationProps) {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center mt-5 mb-20">
    <button
      className={`px-4 py-2 border border-gray-300 rounded-l-md ${
        currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-100'
      }`}
      onClick={handlePrevPage}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <span className="px-4 py-2 border-t border-b border-gray-300 bg-white">{currentPage}</span>
    <button
      className="px-4 py-2 border border-gray-300 rounded-r-md bg-white hover:bg-gray-100"
      onClick={handleNextPage}
    >
      Next
    </button>
  </div>
  );
}