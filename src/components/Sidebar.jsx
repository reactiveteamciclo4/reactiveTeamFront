import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import { useUser } from 'context/userContext';
import PrivateComponent from 'components/PrivateComponent';

const SidebarLinks = () => (    
    <ul className='mt-12'>
      <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER', 'ESTUDIANTE']}>
      <SidebarRoute to='' title='Inicio' icon='fas fa-house-user' />
      <SidebarRouteImagen to='/perfil' title='Perfil' icon='fas fa-user' />
      <PrivateComponent roleList={['ADMINISTRADOR']}>
      <SidebarRoute to='/usuarios' title='Usuarios' icon='fas fa-user-tie' />
      </PrivateComponent>
      <SidebarRoute to='/proyectos' title='Proyectos' icon='fas fa-chess-rook' />
      <PrivateComponent roleList={['LIDER']}>
      <SidebarRoute to='/usuarios' title='Estudiantes' icon='fas fa-user-graduate' />
      </PrivateComponent>
      <PrivateComponent roleList={['ADMINISTRADOR']}>
      <SidebarRoute to='/inscripciones' title='Inscripción' icon='fas fa-clipboard-list' />
      </PrivateComponent>
      {/*<SidebarRoute to='/avances' title='Avances' icon='fas fa-shoe-prints' />
      <SidebarRoute to='/category1/page1' title='Test' icon='fas fa-clipboard-check' /> */}
      </PrivateComponent>
      <Logout />
    </ul>
  );

const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
   setToken(null);
  };
  return (
    <li onClick={() => deleteToken()}>
      <NavLink to='/auth/login' className='sidebar-route text-red-700'>
        <div className='flex items-center'>
          <i className='fas fa-door-open' />
          <span className='text-sm  ml-2'>Cerrar Sesión</span>
        </div>
      </NavLink>
    </li>
  );
};

const Logo = () => (
    <div className='py-3 w-full flex flex-col items-center justify-center' bg-black-800>
      <img src='LOGO REACTIVE TEAM.png' alt='Logo' className='h-38' />
      {/* cambio color texto a blanco */}
      <span className='my-2 text-lg font-bold text-center text-white'>GESTIÓN PROYECTOS DE INVESTIGACIÓN</span>
    </div>
  );

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap md:h-full'>
      {/* Sidebar starts */}

      <div className='sidebar hidden md:flex'>
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
     <div className='flex md:hidden w-full justify-between bg-gray-800 p-2 text-white'>
        <button type='button' onClick={() => setOpen(!open)}>
          <i className={`fas fa-${open ? 'times' : 'bars'}`} />
        </button>
        <i className='fas fa-home' />
      </div>
      {open && <ResponsiveSidebar />}
      {/* Sidebar ends */}
    </div>
  );
};

const ResponsiveSidebar = () => (
    <div>
      <div
        className='sidebar h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out'
        id='mobile-nav'
      >
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );

  const SidebarRoute = ({ to, title, icon }) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'sidebar-route text-white bg-green-600'
            // cambio color texto a text-gray-400
            : 'sidebar-route text-gray-400 hover:text-white hover:bg-green-400'
        }
      >
        <div className='flex items-center'>
          <i className={icon} />
          <span className='text-sm  ml-2'>{title}</span>
        </div>
      </NavLink>
    </li>
  );

  const SidebarRouteImagen = ({ to, title, icon }) => {
    const { userData } = useUser();
    return (
      <li>
        <NavLink
          to={to}
          className={({ isActive }) =>
            isActive
              ? 'sidebar-route text-white bg-green-600'
              : 'sidebar-route text-gray-400 hover:text-white hover:bg-green-400'
          }
        >
        <div className='flex items-center'>
        {userData.foto ? (
          <img
            className='h-8 w-8 rounded-full'
            src={userData.foto}
            alt='foto'
          />
        ) : (
          <i className={icon} />
        )}
        <span className='text-sm  ml-2'>{title}</span>
      </div>
    </NavLink>
  </li>
);
};

export default Sidebar;