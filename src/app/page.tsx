'use client'
import Nav from '@/app/components/home_nav';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { initFirebase } from '@/firebase/firebaseApp';

interface Post {
  id: string;
  title: string;
  message: string;
  imageUrl: string;
}

interface Course {
  id: string;
  title: string;
  message: string;
}

export default function Home() {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [course, setCourse] = useState<Course[]>([]);
  initFirebase();

  useEffect(() => {
    // Fetch the latest posts from Firestore
    const fetchLatestPosts = async () => {
      const firestore = getFirestore();
      const postsCollectionRef = collection(firestore, 'news');
      const postsQuery = query(postsCollectionRef, orderBy('date', 'desc'), limit(2));

      try {
        const querySnapshot = await getDocs(postsQuery);
        const posts: Post[] = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() } as Post;
        });
        setLatestPosts(posts);
      } catch (error) {
        console.log('Error fetching latest posts:', error);
      }
    };

        // Fetch the latest posts from Firestore
        const fetchCourse = async () => {
          const firestore = getFirestore();
          const postsCollectionRef = collection(firestore, 'course');
          const postsQuery = query(postsCollectionRef, orderBy('date', 'desc'), limit(2));
    
          try {
            const querySnapshot = await getDocs(postsQuery);
            const posts: Post[] = querySnapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() } as Post;
            });
            setCourse(posts);
          } catch (error) {
            console.log('Error fetching latest posts:', error);
          }
        };

    fetchCourse();
    fetchLatestPosts();
  }, []);


  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-between px-24 mb-20">
      
        <div className='w-full'>
          <Image
          src="/images/covernew.png" // Specify the path to your image file
          alt="Banner"
          layout="responsive" // Set the layout to "responsive"
          width={1200} // Set the desired width of the image
          height={400} // Set the desired height of the image
          />
        </div>
        <div className='flex justify-center bg-[#FCFEFF]'>
          <div className='w-1/2 py-8 flex-col'>
            <Image
              src="/images/COLLEGE23.jpg" // Specify the path to your image file
              alt="Banner"
              layout="responsive" // Set the layout to "responsive"
              width={590} // Set the desired width of the image
              height={271} // Set the desired height of the image          
            />
          </div>

          <div className='w-1/2 py-8 flex-col'>
            <Image
              src="/images/higschool231.png" // Specify the path to your image file
              alt="Banner"
              layout="responsive" // Set the layout to "responsive"
              width={590} // Set the desired width of the image
              height={271} // Set the desired height of the image          
            />
          </div>
        </div>

        <div className='w-full py-5'>
          <Image
          src="/images/3rd.jpg" // Specify the path to your image file
          alt="Banner"
          layout="responsive" // Set the layout to "responsive"
          width={1200} // Set the desired width of the image
          height={400} // Set the desired height of the image
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {latestPosts.map((post) => (
            <div key={post.id} className="p-4 border border-gray-300 rounded">
              <div className="mt-2">
                <Image src={post.imageUrl} width={1900} height={500} alt={post.title} className="w-full rounded" />
              </div>
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="mt-2 text-gray-700">
                {post.message.length > 250 ? `${post.message.slice(0, 250)}...` : post.message}
              </p>
            </div>
          ))}
        </div>

        <div className='w-full flex justify-start'>
            <h2 className='my-2 text-xl font-bold'> Announcement: </h2>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-4 w-full justify-start">
          {course.map((post) => (
            <div key={post.id} className="p-4 border border-gray-300 rounded">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="mt-2 text-gray-700">  
                {post.message.length > 150 ? `${post.message.slice(0, 150)}...` : post.message}
              </p>
            </div>
          ))}
        </div>

      </main>
    </>
  );
}