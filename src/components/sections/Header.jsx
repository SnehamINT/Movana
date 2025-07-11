import React from 'react'

const Header = ({ type = 'movie', onNavClick = () => {}, onSearchClick = () => {} }) => {
  return (
    <header className="navbar header bg-base-100/60 backdrop-blur-md shadow-sm">
        <div className="navbar-start">
            <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li><a onClick={() => onNavClick('movie')} className={type === 'movie' ? 'text-green-400' : ''}>Movies</a></li>
                <li><a onClick={() => onNavClick('tv')} className={type === 'tv' ? 'text-green-400' : ''}>Tv Shows</a></li>
                {/* <li><a>Movies</a></li> */}
            </ul>
            </div>
            <a className="btn btn-ghost text-xl">Movana</a>
        </div>
        <div className="navbar-center hidden lg:block">
        <nav className="flex gap-8 text-lg font-medium">
            <a href="#" onClick={e => {e.preventDefault();onNavClick('movie')}} className={type === 'movie' ? 'text-green-400' : 'text-white hover:text-green-400'}> Movies</a>
            <a href="#" onClick={e => {e.preventDefault();onNavClick('tv')}} className={type === 'tv' ? 'text-green-400' : 'text-white hover:text-green-400'}>Tv Shows</a>
            {/* <a href="#" className="text-white hover:text-green-400">Movies</a> */}
        </nav>
        </div>
        <div className="navbar-end">
            <button className="btn btn-ghost btn-circle" onClick={onSearchClick}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
            </button>
            
            {/* <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
            </div> */}
        </div>
    </header>
  )
}

export default Header