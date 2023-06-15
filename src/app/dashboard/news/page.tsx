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
      const blogCollectionRef = collection(db, 'news');
      const blogQuery = query(blogCollectionRef);

      try {
        const querySnapshot = await getDocs(blogQuery);
        const posts: BlogPost[] = querySnapshot.docs.map((doc) => {
          const post = doc.data();
          return { id: doc.id, ...post } as BlogPost;
        });
        console.info(posts)
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
          title={''}
          bg_color='bg-[#F9DBBB]'
          text_color='text-[#2E3840]'
        />
      </div>

      <h1 className='pt-14 text-3xl font-bold text-center underline'>News Posts</h1>

      <div className='grid gap-8 mt-8 px-5'>
        {blogPosts.map((post) => (
          <div key={post.id} className=''>
            <h2 className='text-2xl font-bold mb-2 text-center'>{post.title}</h2>
            <p className='text-center mb-4 text-white'>{post.message}</p>
            <div className="">
            <div className="flex items-center justify-center">
                <Image src={post.imageUrl} alt="News Post" width={300} height={80}/>
            </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}