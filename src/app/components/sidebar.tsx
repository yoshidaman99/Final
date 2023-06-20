'use client';
import { logout } from '@/lib/logout';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  BsNewspaper,
  BsFillChatRightTextFill,
  BsFillClipboardFill,
  BsLayoutSidebarInset,
  BsFillFilePersonFill,
  BsFillReplyFill,
  BsArrowLeftShort,
  BsFillDashSquareFill,
  BsFillCaretDownFill,
  BsCardChecklist,
} from 'react-icons/bs';
import {
  HiOutlineUserPlus,
  HiOutlineUsers,
  HiOutlineQueueList,
  HiOutlineRectangleGroup,
  HiOutlineSparkles,
  HiOutlineNewspaper,
  HiBarsArrowDown,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
} from 'react-icons/hi2';
import Image from 'next/image';

interface LvlRole {
  role?: string;
}

const Sidebar: React.FC<LvlRole> = ({ role = '' }) => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState<number | null>(null);
  const [currentPath, setCurrentPath] = useState('');
  const [activeLink, setActiveLink] = useState('');
  const [activeLink2, setActiveLink2] = useState('');

  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  const handle2ToggleSidebar = (index: any) => {
    setSubmenuOpen(submenuOpen === index ? null : index);
  };

  const handleLogout = async () => {
    await logout();
  };

  const RoleLvl = [
    {
      title: 'admin',
      subitems: [
        {
          bg_color: '#88B77B',
          text_color: '#FFA870',
        },
      ],
    },
    {
      title: 'cashier',
      subitems: [
        {
          bg_color: '#88B77B',
          text_color: '#FFA870',
        },
      ],
    },
    {
      title: 'registral',
      subitems: [
        {
          bg_color: '#88B77B',
          text_color: '#FFA870',
        },
      ],
    },
    {
      title: 'teacher',
      subitems: [
        {
          bg_color: '#88B77B',
          text_color: '#FFA870',
        },
      ],
    },
    {
      title: 'student',
      subitems: [
        {
          bg_color: '#7C99AC',
          text_color: '#FFA870',
        },
      ],
    },
  ];

  let Menus = [
    {
      title: 'News',
      icon: <BsNewspaper color='#88b77b' />,
      link: '/dashboard/news',
      num: 2,
      submenu: true,
      submenuItems: [
        {
          title: 'Add News',
          icon: <HiOutlineNewspaper color='#88b77b' />,
          link: '/dashboard/news/add-news',
          num: 3,
        },
        {
          title: 'News List',
          icon: <HiBarsArrowDown color='#88b77b' />,
          link: '/dashboard/news/news-list',
          num: 4,
        },
      ],
    },
    {
      title: 'Course',
      icon: <BsFillClipboardFill color='#88b77b' />,
      link: '/dashboard/Course',
      num: 2,
      submenu: true,
      submenuItems: [
        {
          title: 'Add Course',
          icon: <HiOutlineNewspaper color='#88b77b' />,
          link: '/dashboard/Course/add-course',
          num: 3,
        },
        {
          title: 'Course List',
          icon: <HiBarsArrowDown color='#88b77b' />,
          link: '/dashboard/Course/course-list',
          num: 4,
        },
      ],
    },
    {
      title: 'Messages',
      icon: <BsFillChatRightTextFill color='#88b77b' />,
      link: '/dashboard/messages',
      num: 5,
    },
    {
      title: 'Admin Chat',
      icon: <BsCardChecklist color='#88b77b' />,
      link: '/dashboard/admin_chat',
      num: 7,
    },
    {
      title: 'Requests',
      icon: <BsLayoutSidebarInset color='#88b77b' />,
      link: '/dashboard/Requests',
      num: 6,
      submenu: true,
      submenuItems: [
        {
          title: 'Request List',
          icon: <HiOutlineQueueList color='#88b77b'  />,
          link: '/dashboard/Requests/request-list',
          num: 8,
        },
        {
          title: 'Request Daily',
          icon: <HiOutlineQueueList color='#88b77b'  />,
          link: '/dashboard/Requests/request-list-daily',
          num: 10,
        },
        {
          title: 'Task Query',
          icon: <HiOutlineRectangleGroup color='#88b77b' />,
          link: '/dashboard/Requests/task-query',
          num: 9,
        },
      ],
    },
    {
      title: 'Accounts',
      icon: <BsFillFilePersonFill color='#88b77b' />,
      link: '/dashboard/accounts',
      num: 11,
      submenu: true,
      submenuItems: [
        {
          title: 'Add Admins',
          icon: <HiOutlineUserCircle color='#88b77b' />,
          link: '/dashboard/accounts/add-admin',
          num: 12,
        },
        {
          title: 'Admin List',
          icon: <HiOutlineUserGroup color='#88b77b' />,
          link: '/dashboard/accounts/admin-list',
          num: 13,
        },
        {
          title: 'Add Students',
          icon: <HiOutlineUserPlus color='#88b77b' />,
          link: '/dashboard/accounts/add-student',
          num: 14,
        },
        {
          title: 'Student List',
          icon: <HiOutlineUsers color='#88b77b' />,
          link: '/dashboard/accounts/student-list',
          num: 15,
        },
      ],
    },
  ];

function getUserIDFromArray(cookies: any): any {
    for (const key in cookies) {
      if (key === 'user' && cookies.hasOwnProperty(key)) {
        const user = cookies[key];
        if (user.hasOwnProperty('id')) {
          return user.id;
        }
      }
    }
    return null;
}

  const filterMenuItemsByRole = (role: string) => {
      return Menus;
  };

  const [id,setID]  = useState('');
  const [count,setCount] = useState(0);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [id]);

  const handleLinkClick = (link: string, submenuLink?: string) => {
    setActiveLink(link);
    setActiveLink2(submenuLink ? submenuLink : '');
  };

  
 
  return (
    <div>
      <section className={` ${open ? 'w-350' : 'w-20'} bg-admin duration-300`}>
        <div
          className={`px-4 pt-8 pl-4 fixed h-screen bg-white border-2 border-zinc-400 text-txtadmin font-medium  ${
            open ? 'w-350' : 'w-20'
          } duration-300`}
        >
          <div className="text-center w-full text-3xl hover:text-txtadmin mb-10">
            <span className={`${open ? 'text-3xl' : 'text-[0px]'} flex justify-center`}>
              <Link href="/dashboard">
                <span
                  className={`block text-green-600 float-left pr-2 text-2xl ${
                    open ? 'text-[0px]' : 'text-3xl'
                  }`}
                >
                  <BsFillDashSquareFill color='#88b77b' />
                </span>
                <Image className={`${ open ? '' : 'hidden'}`} src='/images/icclogo.png' alt='Dashboard logo' height='50' width='200' />
              </Link>
            </span>
          <div className={`${ open ? '' : 'hidden'} text-center text-lg mt-2`}>
            <span>Call us:<a href="tel:+632-8736-3912" className={`hover:text-amber-300`}> +632-8736-3912 </a></span>
          </div>
          </div>
          
          <nav>
            <ul>
            {filterMenuItemsByRole(role).map((menu, index) => {
                return (
                  <li key={index} className={`mb-1`}>
                    <Link href={menu.link} onClick={() => handleLinkClick(menu.link)}>
                      <span
                        className={`block float-left pr-2 text-2xl hover:text-green-600 ${
                          currentPath === menu.link ? 'hover:text-green-600' : ''
                        }`}
                        style={{
                          color: activeLink === menu.link ? '#BBF7D0' : 'inherit',
                        }}
                      >
                        {menu.icon}
                      </span>
                      <span
                        className={`${open ? 'text-xl' : 'text-[0px]'} hover:text-green-600 `}
                      >
                        {menu.title}
                      </span>
                    </Link>
                    {menu.submenu && (
                      <BsFillCaretDownFill
                        className={`block float-right ${
                          submenuOpen === index ? 'rotate-180' : ''
                        }`}
                        onClick={() => handle2ToggleSidebar(index)}
                      />
                    )}
                    {menu.submenu && submenuOpen === index && (
                      <ul key={index} className={` ${open ? 'pl-5' : 'pl-1'} `}>
                        {menu.submenuItems.map((submenuItem, subIndex) => (
                          <li
                            key={subIndex}
                            className={`hover:text-green-500 ${
                              activeLink === submenuItem.link ? 'active' : ''
                            }`}
                          >
                            <Link
                              href={submenuItem.link}
                              className={``}
                              onClick={() => handleLinkClick(menu.link, submenuItem.link)}
                            >
                              <span
                                className={`${
                                  open ? 'text-[0px]' : 'text-3xl'
                                } `}
                                style={{
                                  color:
                                    activeLink2 === submenuItem.link ? '#f2b18d' : 'inherit',
                                }}
                              >
                                {submenuItem.icon}
                              </span>
                              <span
                                className={`${
                                  open ? 'text-lg' : 'hidden'
                                } `}
                                style={{
                                  color:
                                    activeLink2 === submenuItem.link ? '#f2b18d' : 'inherit',
                                }}
                              >
                                {submenuItem.title}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
              <li>
                <Link href="" onClick={handleLogout}>
                  <span className={`block float-left pr-2 text-2xl hover:text-green-300`}>
                    <BsFillReplyFill color='#88b77b' />
                  </span>
                  <span
                    className={`${open ? 'text-xl' : 'text-[0px]'} hover:text-green-200 `}
                  >
                    Logout
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <span>
        <BsArrowLeftShort
          className={`z-10 text-[#2E3840] bg-white hover:ring-2 hover:text-4xl hover:bg-gray-100 text-3xl duration-300 fixed rounded-full ${
            open ? 'left-[330px]' : 'left-[65px]'
          } top-9 border border-dark-purple cursor-pointer ${
            !open && 'rotate-180'
          }`}
          onClick={handleToggleSidebar}
        />
      </span>
    </div>
  );
};

export default Sidebar;