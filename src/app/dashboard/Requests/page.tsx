'use client'
import HeaderInfo from '@/app/components/header_info';
import { RequestList } from '@/lib/getRequestListPersonal';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function Request() {
  const [cookies] = useCookies(['user']);
  const userID = cookies.user ? cookies.user.id : null;
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    // Perform any client-side actions or side effects here
    // This code will only run once when the component mounts
    // Add any necessary logic or additional requests if needed

    // Example: Fetch request list data and update state
    const fetchData = async () => {
      try {
        // Make API request to fetch request list data based on userID
        
        const data : any = RequestList(cookies);

        // Set the fetched request list data to the state
        setRequestList(data);
      } catch (error) {
        console.error('Error fetching request list:', error);
      }
    };

    // Call the fetchData function to fetch request list data
    fetchData();
  }, [cookies]);

  return (
    <section>
      <div>
        <HeaderInfo title={'Request'}/>
      </div>

      <div className='h-7 w-full p-6'>
        {requestList}
      </div>
    </section>
  );
}