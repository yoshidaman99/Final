'use client'
import { getFirestore, query, getDocs, collection, where, limit, startAfter, orderBy } from 'firebase/firestore';
import { initFirebase } from '@/firebase/firebaseApp';
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const ITEMS_PER_PAGE = 10; // Number of items to display per page

export function RequestList() {
  const chartCanvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [startAfterDoc, setStartAfterDoc] = useState<any>(null); // Keep track of the last document snapshot

  useEffect(() => {
    const fetchData = async () => {
      try {
        initFirebase();
        const firestore = getFirestore();

        const todosCollection = collection(firestore, 'todos');
        let todosQuery = query(
          todosCollection,
          where('archive', '==', false)
        );

        if (startAfterDoc) {
          // Set the startAfter clause using the last document snapshot
          todosQuery = query(todosQuery, startAfter(startAfterDoc));
        }

        // Get the snapshot of the query result
        const snapshot = await getDocs(todosQuery);

        if (!snapshot.empty) {
          // Group todos by status and count the number of todos for each status
          const todosByStatus: Record<string, number> = {};

          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            const status = data.status;

            if (status) {
              if (todosByStatus[status]) {
                todosByStatus[status]++;
              } else {
                todosByStatus[status] = 1;
              }
            }
          });

          const statuses = Object.keys(todosByStatus);
          const todoCounts = Object.values(todosByStatus);

          const chartData = {
            labels: statuses,
            datasets: [
              {
                label: 'Todo Status',
                data: todoCounts,
                backgroundColor: [
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                ],
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
        
        throw error;
      }
    };

    fetchData();
  }, [currentPage, startAfterDoc]);

  return (
    <div>
      <div className="flex justify-center">
        <canvas ref={chartCanvasRef}></canvas>
      </div>
    </div>
  );
}