'use client'
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseApp";


interface Chat {
  id: string;
  requestId: string;
  // Add more properties as needed
}

const AdminChatPage = () => {
  const [adminChats, setAdminChats] = useState<Chat[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [chatsPerPage] = useState(10);

  useEffect(() => {
    const fetchAdminChats = async () => {
      try {
        const adminChatQuery = query(collection(db, "admin_chat"), where("archive", "==", false));
        const adminChatSnapshot = await getDocs(adminChatQuery);
        const chats = adminChatSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Chat));
        setAdminChats(chats);
      } catch (error) {
        console.error("Error fetching admin chats:", error);
      }
    };

    fetchAdminChats();
  }, []);

  const navigateToAddress = (address:string) => {
    window.location.href = address;
  };


  const handleAction = (id: string) => {
    // Implement your action logic here
    navigateToAddress('/dashboard/chat?id=' + id);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Pagination Logic
  const indexOfLastChat = currentPage * chatsPerPage;
  const indexOfFirstChat = indexOfLastChat - chatsPerPage;
  const currentChats = adminChats.slice(indexOfFirstChat, indexOfLastChat);

  // Render Table Rows
  const renderTableRows = () => {
    return currentChats.map((chat) => (
      <tr className=" border-2 border-slate-900 text-center" key={chat.id}>
        <td>{chat.id}</td>
        <td>{chat.requestId}</td>
        {/* Add more columns as needed */}
        <td>
        <button
          onClick={() => handleAction(chat.requestId)}
          className="bg-blue-500 text-white py-1 px-2 rounded
                     hover:bg-lime-800 my-2"
        >
            View Details
        </button>
        </td>
      </tr>
    ));
  };

  // Render Pagination Links
  const renderPaginationLinks = () => {
    const pageNumbers = Math.ceil(adminChats.length / chatsPerPage);
    const paginationLinks = [];
    for (let i = 1; i <= pageNumbers; i++) {
      paginationLinks.push(
        <li
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-2 py-1 text-center border-black border rounded hover:bg-gray-300 cursor-pointer ${
            i === currentPage ? "bg-gray-300" : ""
          }`}
        >
          {i}
        </li>
      );
    }
    return paginationLinks;
  };

  return (
<div className="container mx-auto py-8">
  <h1 className="text-2xl font-bold mb-4">Admin Chat</h1>
  <table className="w-full border-collapse">
    <thead>
      <tr>
        <th className="py-2 px-4 border">ID</th>
        <th className="py-2 px-4 border">Request ID</th>
        {/* Add more table headers as needed */}
        <th className="py-2 px-4 border">Actions</th>
      </tr>
    </thead>
    <tbody>{renderTableRows()}</tbody>
  </table>
  <ul className="flex justify-center mt-4">{renderPaginationLinks()}</ul>
</div>
  );
};

export default AdminChatPage;