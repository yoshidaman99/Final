'use client'
import HeaderInfo from '@/app/components/header_info';
import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebaseApp';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  message: string;
  imageUrl: string;
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const blogCollectionRef = collection(db, 'course');
      const blogQuery = query(blogCollectionRef);

      try {
        const querySnapshot = await getDocs(blogQuery);
        const posts: BlogPost[] = querySnapshot.docs.map((doc) => {
          const post = doc.data();
          return { id: doc.id, ...post } as BlogPost;
        });
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div>
      <div className='fixed w-full'>
        <HeaderInfo
          title={'News'}
        />
      </div>

      <h1 className='pt-14 text-3xl text-txtadmin font-medium text-center underline'>Course</h1>

      <div className='grid gap-8 mt-8'>
        {blogPosts.map((post) => (
          <div key={post.id} className='m-6 ring-2 ring-stone-600 rounded bg-[#729967] p-10'>
            <h2 className='text-2xl text-txtadmin font-medium mb-2 text-center'>{post.title}</h2>
            <p className='text-center mb-4 text-white'>{post.message}</p>
          </div>
        ))}
      </div>

    </div>
  );
}