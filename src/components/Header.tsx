'use client';

import { useEffect, useState, useRef } from 'react';
import { auth } from '@/services/firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import Link from 'next/link';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('CLICK: toggleMobileMenu', !mobileMenuOpen);
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* 
         MOBILE HAMBURGER (Fixed)
         Reverted to a simple onClick with preventDefault to maximize compatibility 
         with Android/iOS Chrome and Samsung Internet.
      */}
      <button 
        className={`hamburger ${mobileMenuOpen ? 'active' : ''}`} 
        onClick={toggleMobileMenu}
        aria-label="Menu"
        style={{ pointerEvents: 'auto', zIndex: 99999999 }}
      >
        <span></span><span></span><span></span>
      </button>

      {/* 
         NAVIGATION DRAWER (MOBILE) 
      */}
      <div className={`nav-drawer ${mobileMenuOpen ? 'open' : ''}`} style={{ zIndex: 99999990 }}>
        <div className="drawer-auth-section">
            {user ? (
              <div className="drawer-user-profile">
                <img src={user.photoURL || '/images/default-avatar.png'} className="user-avatar-dropdown" alt="User" />
                <div className="drawer-user-info">
                    <p className="drawer-name">{user.displayName?.toLowerCase()}</p>
                    <p className="drawer-email">{user.email}</p>
                </div>
              </div>
            ) : (
              <Link href="/login" className="drawer-login-btn" onClick={() => setMobileMenuOpen(false)}>
                <i className="ph ph-user"></i> Iniciar Sesión
              </Link>
            )}
        </div>

        <nav className="drawer-links">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
          <Link href="/#premios" onClick={() => setMobileMenuOpen(false)}>Premios</Link>
          <Link href="/#juegos" onClick={() => setMobileMenuOpen(false)}>Juegos</Link>
          <Link href="/eventos" onClick={() => setMobileMenuOpen(false)}>Eventos</Link>
          <Link href="/planes" onClick={() => setMobileMenuOpen(false)}>Planes</Link>
        </nav>

        {user && (
          <div className="drawer-bottom">
            <button onClick={handleLogout} className="drawer-logout-btn">
              <i className="ph ph-sign-out"></i> Cerrar Sesión
            </button>
          </div>
        )}
      </div>

      {mobileMenuOpen && (
        <div 
          className="drawer-overlay" 
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuOpen(false);
          }}
          style={{ zIndex: 99999980 }}
        ></div>
      )}

      {/* 
         MAIN HEADER BAR (Fixed)
      */}
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <Link href="/" className="brand" onClick={() => setMobileMenuOpen(false)}>
            <img
              src="/images/logos/logo_cambia.png"
              alt="CAMVIA Logo"
              className="logo-img"
            />
          </Link>

          <nav className="desktop-links">
            <Link href="/">Inicio</Link>
            <Link href="/#premios">Premios</Link>
            <Link href="/#juegos">Juegos</Link>
            <Link href="/eventos">Eventos</Link>
            <Link href="/planes">Planes</Link>
          </nav>
          
          <div className="header-right hidden-mobile">
            <div className="nav-auth">
              {user ? (
                <div className="user-info-wrap" ref={dropdownRef}>
                  <div className="user-trigger" onClick={() => setShowDropdown(!showDropdown)}>
                    <img 
                      src={user.photoURL || '/images/default-avatar.png'} 
                      alt="User" 
                      className="user-avatar-header" 
                    />
                    <span className="user-greeting">
                      Hola, <b>{user.displayName?.toLowerCase().split(' ')[0]}</b>
                    </span>
                    <i className="ph ph-caret-down"></i>
                  </div>

                  {showDropdown && (
                    <div className="profile-dropdown">
                      <div className="dropdown-header">
                        <img 
                          src={user.photoURL || '/images/default-avatar.png'} 
                          alt="Avatar" 
                          className="user-avatar-dropdown" 
                        />
                        <div className="dropdown-user-details">
                          <h4>{user.displayName?.toLowerCase()}</h4>
                          <p>{user.email}</p>
                        </div>
                      </div>

                      <Link href="/account" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                        <i className="ph ph-user"></i> Mi Cuenta
                      </Link>
                      <Link href="/shop" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                        <i className="ph ph-shopping-cart"></i> Comprar
                      </Link>

                      <div className="dropdown-divider"></div>

                      <button onClick={handleLogout} className="dropdown-item logout">
                        <i className="ph ph-sign-out"></i> Salir
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login">
                  <button className="btn-login">Iniciar Sesión</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
