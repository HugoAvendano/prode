'use client'


import { logout } from "@/actions";
//import { logout } from "@/actions"
import { useUIStore } from "@/store"
import clsx from "clsx";
//import { useSession } from "next-auth/react"
import Link from "next/link"
import { IoCloseOutline, IoListOutline, IoLogIn, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"

export const Sidebar = () => {

  const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
  const closeMenu = useUIStore(state => state.closeSideMenu);

  /* const { data: session } = useSession(); */
  
  /* const isAuthenticated = !!session?.user;
  
  const isAdmin = isAuthenticated && session.user.role === 'admin'; */

  const onLogout = async () => {
    await logout();
    window.location.replace('/')
  }

  const isAuthenticated = true;
  const isAdmin = true;


  return (
    <div>
      {/* Background: black */}
      {
        isSideMenuOpen && (
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
        )
      }




      {/* Blur */}
      {
        isSideMenuOpen && (
          <div
            onClick={() => closeMenu()}
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          />
        )
      }


      {/* SideMenu */}

      <nav className={
        clsx(
          "sidebar",
          {
            "translate-x-full": !isSideMenuOpen
          }
        )
      }>
        <div className="relative mb-14">
        <IoCloseOutline
          size={30}
          color="white"
          className="absolute top-5 right-5 cursor-pointer hover:text-black"
          onClick={() => closeMenu()}
        />
        </div>

        
        

        

        {/* Menu */}
        {isAuthenticated && (
          <>
            <Link
              href="/profile"
              className="menu-link"
              onClick={() => closeMenu()}
            >
              <IoPersonOutline size={25} className="icon" />
              <span className="menu-item">Perfil</span>
            </Link>

            <Link
              href="/"
              className="menu-link"
              onClick={() => closeMenu()}
            >
              <IoTicketOutline size={25} className="icon"/>
              <span className="menu-item">Pronosticar</span>
            </Link>

            <Link
              href="/predicts"
              className="menu-link"
              onClick={() => closeMenu()}
            >
              <IoTicketOutline size={25} className="icon"/>
              <span className="menu-item">Mis pronosticos</span>
            </Link>

            <Link
              href="/orders"
              className="menu-link"
              onClick={() => closeMenu()}
            >
              <IoTicketOutline size={25} className="icon"/>
              <span className="menu-item">Tabla Acumulada</span>
            </Link>
          </>
        )}

        {!isAuthenticated && (
          <Link
            href="/auth/login"
            className="menu-link"
            onClick={() => closeMenu()}
          >
            <IoLogInOutline size={25} className="icon" />
            <span className="menu-item">Login</span>
          </Link>)
        }

        {isAuthenticated && (
          <button
            className="menu-link w-full"
            onClick={() => {onLogout(); closeMenu()}}
          >
            <IoLogOutOutline size={25} className="icon"/>
            <span className="menu-item">Cerrar session</span>
          </button>)
        }

        

        {isAdmin && (
          <>
            <div className="w-full h-px bg-gray-200 my-10" />           

            <Link
              href="/admin/fixtures"
              className="menu-link"
              onClick={() => closeMenu()}
            >
              <IoTicketOutline size={25} className="icon"/>
              <span className="menu-item">Fechas</span>
            </Link>

            <Link
              href="/admin/users"
              className="menu-link"
              onClick={() => closeMenu()}
            >
              <IoPeopleOutline size={25} className="icon"/>
              <span className="menu-item">Usuarios</span>
            </Link>
          </>
        )}

      </nav>

    </div>
  )
}