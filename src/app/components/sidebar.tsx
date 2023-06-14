

'use client';
import { logout } from '@/lib/logout'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  BsNewspaper,
  BsMessenger,
  BsLayoutSidebarInset,
  BsFillFilePersonFill,
  BsFillReplyFill,
  BsArrowLeftShort,
  BsFillDashSquareFill,
  BsFillCaretDownFill,
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

interface LvlRole {
    role?: string;
}


const Sidebar: React.FC<LvlRole> = ({ role = '' }) => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
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
  }

  const RoleLvl = [
    {
        title: "admin",
        subitems:[{
            bg_color: '#2E3840',
            text_color: '#ffffff',
        }]
    },{
        title: "Student",
        subitems:[{
            bg_color: '#7C99AC',
            text_color: '#ffffff',
        }]
    },{
        title: "Guest",
        subitems:[{
            bg_color: '#393646',
            text_color: '#ffffff',
        }]
    },
    ]

  const Menus = [
    {
        title: "News",
        icon: <BsNewspaper />,
        link: '/dashboard/news',
        num: 2,
        submenu: true,
        submenuItems: [
            {
                title: "Add News",
                icon: <HiOutlineNewspaper />,
                link: '/dashboard/news/add-news',
                num: 3,
            },
            {
                title: "News List",
                icon: <HiBarsArrowDown />,
                link: '/dashboard/news/news-list',
                num: 4,
            },
        ],
    },
    {
        title: "Messages",
        icon: <BsMessenger />,
        link: '/dashboard/messages',
        num: 5,
    },
    {
        title: "Requests",
        icon: <BsLayoutSidebarInset />,
        link: '/dashboard/Requests',
        num: 6,
        submenu: true,
        submenuItems: [
            {
                title: "Request List",
                icon: <HiOutlineQueueList />,
                link: '/dashboard/Requests/request-list',
                num: 8,
            },
            {
                title: "Task Query",
                icon: <HiOutlineRectangleGroup />,
                link: '/dashboard/Requests/task-query',
                num: 9,
            },
            {
                title: "Create Request",
                icon: <HiOutlineSparkles />,
                link: '/dashboard/Requests/create-request',
                num: 10,
            },
        ],
    },
    {
        title: "Accounts",
        icon: <BsFillFilePersonFill />,
        link: '/dashboard/accounts',
        num: 11,
        submenu: true,
        submenuItems: [
            {
                title: "Add Admins",
                icon: <HiOutlineUserCircle />,
                link: '/dashboard/accounts/add-admin',
                num: 12,
            },
            {
                title: "Admin List",
                icon: <HiOutlineUserGroup />,
                link: '/dashboard/accounts/admin-list',
                num: 13,
            },
            {
                title: "Add Students",
                icon: <HiOutlineUserPlus />,
                link: '/dashboard/accounts/add-student',
                num: 14,
             },
            {
                title: "Student List",
                icon: <HiOutlineUsers />,
                link: '/dashboard/accounts/student-list',
                num: 15,
            },
        ],
    }
];

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleLinkClick = (link: string, submenuLink?: string) => {
    setActiveLink(link);
    setActiveLink2(submenuLink? submenuLink : '');
  };

  const bgColorSet = RoleLvl.find((lvl) => lvl.title === role)?.subitems[0].bg_color;
  const textColorSet = RoleLvl.find((lvl) => lvl.title === role)?.subitems[0].text_color;

  return (
    <div>
      <section
        className={`bg-[${bgColorSet}] ${open ? 'w-350' : 'w-20'} duration-300`}
      >
    <div className={`px-4 pt-8 pl-4 fixed h-screen bg-[${bgColorSet}] font-bold text-[${textColorSet}] ${open ? 'w-350' : 'w-20'} duration-300`}>
        <div className="text-center w-full text-3xl hover:text-red-500 mb-10">
          <span className={`${open ? 'text-3xl' : 'text-[0px]'}`}>
            <Link href="/dashboard">
              <span
                className={`block float-left pr-2 text-2xl ${
                  open ? 'text-[0px]' : 'text-3xl'
                }`}
              >
                <BsFillDashSquareFill />
              </span>
              Dashboard
            </Link>
          </span>
        </div>
        <nav>
          <ul>
            {Menus.map((menu, index: any) => (
              <li key={index} className={`mb-1`}>
                <Link href={menu.link} onClick={() => handleLinkClick(menu.link)}>
                    <span
                      className={`block float-left pr-2 text-2xl hover:text-green-300 ${currentPath === menu.link ? 'hover:text-red-500' : ''}`}
                      style={{
                        color: activeLink === menu.link ? '#BBF7D0' : 'inherit',
                      }}
                    >
                      {menu.icon}
                    </span>
                    <span
                      className={`${open ? 'text-xl' : 'text-[0px]'} hover:text-green-200 `}
                    >
                      {menu.title}
                    </span>
                </Link>
                  {menu.submenu && (
                    <BsFillCaretDownFill
                      className={`block float-right ${submenuOpen === index ? 'rotate-180' : ''}`}
                      onClick={() => handle2ToggleSidebar(index)}
                    />
                  )}
                  {menu.submenu && submenuOpen === index  && (
                    <ul key={index} className={` ${ open ? 'pl-5' : 'pl-1' } `}>
                      {menu.submenuItems.map((submenuItem, subIndex) => (
                        <li key={subIndex} className={`hover:text-red-300 ${activeLink === submenuItem.link ? 'active' : ''}`}>
                          <Link href={submenuItem.link} className={``} onClick={() => handleLinkClick(menu.link,submenuItem.link)}>
                          <span className={`${ open ? 'text-[0px]' : 'text-3xl' } `}
                            style={{
                               color: activeLink2 === submenuItem.link ? '#f2b18d' : 'inherit',
                             }}
                          >
                            {submenuItem.icon}
                          </span>
                          <span className={`${ open ? 'text-lg' : 'hidden' } `}
                             style={{
                                 color: activeLink2 === submenuItem.link ? '#f2b18d' : 'inherit',
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
              ))}
              <li>

              <Link href='' onClick={handleLogout}>
                <span className={`block float-left pr-2 text-2xl hover:text-green-300`}><BsFillReplyFill /></span>
                <span className={`${open ? 'text-xl' : 'text-[0px]'} hover:text-green-200 `}>Logout</span>
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

}

export default Sidebar;
