'use client'
import HeaderInfo from '@/app/components/header_info';
import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseApp';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  message: string;
  imageUrl: string;
}

const PAGE_SIZE = 10; // Number of posts per page

export default function NewsListPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleDeletePost = async (postId: string) => {
    try {
      await deleteDoc(doc(db, 'news', postId));
      setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  const truncateMessage = (message: string | undefined, maxLength: number) => {
    if (!message) {
      return '';
    }
    if (message.length <= maxLength) {
      return message;
    }
    return message.slice(0, maxLength) + '...';
  };

  const totalPages = Math.ceil(blogPosts.length / PAGE_SIZE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginatedPosts = blogPosts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div>
      <div className="fixed w-full">
        <HeaderInfo title={'News List'} />
      </div>
        <div className='p-5'>
      <h1 className="pt-14 text-3xl font-bold text-center underline">News List</h1>

      <table className="mt-8 w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-slate-800">
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Content</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPosts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-100 text-center hover:text-black hover:font-semibold">
              <td className="py-2 px-4 border-b">{post.title}</td>
              <td className="py-2 px-4 border-b">{truncateMessage(post.message, 100)}</td>
              <td className="py-2 px-4 border-b">
                <div className="rounded-lg aspect-w-16 aspect-h-9">
                  <Image src={post.imageUrl} alt="News" height={15} width={40} />
                </div>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
    
    </div>
  );
}