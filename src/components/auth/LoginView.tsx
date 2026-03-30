'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, googleProvider } from '@/services/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import '@/app/login/login.css';

export default function LoginView() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        pass: ''
    });

    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [isToastError, setIsToastError] = useState(false);

    const notify = (msg: string, isErr = false) => {
        setToastMsg(msg);
        setIsToastError(isErr);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.pass);
            notify('¡Bienvenido de nuevo!');
            setTimeout(() => router.push('/'), 1500);
        } catch (err: any) {
            console.error('Login Error:', err.message);
            notify('Credenciales inválidas', true);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            notify('Bienvenido con Google');
            router.push('/');
        } catch (error) {
            console.error('Google Sign In Error:', error);
            notify('Error al conectar con Google', true);
        }
    };

    return (
        <main className="login-page-container">
            <Link href="/" className="back-link-login">
                <span className="material-symbols-outlined">arrow_back</span> Volver
            </Link>

            <div className="container-login">
                <div className="card-login">
                    <header className="card-header-login">
                        <img src="/logos/icono_camvia.png" alt="CAMVIA Icon" className="brand-logo-login-img" />
                        <div className="header-info-login">
                            <h1>Iniciar sesión</h1>
                            <p>Bienvenido a Camvia</p>
                        </div>
                        <div className="shine-login"></div>
                    </header>

                    <section className="card-body-login">
                        <form onSubmit={handleEmailLogin} noValidate>
                            <div className="form-stack-login">
                                <div className="input-group-login">
                                    <label>Correo Electrónico</label>
                                    <div className="input-wrapper-login">
                                        <span className="material-symbols-outlined input-icon-login">mail</span>
                                        <input 
                                            type="email" 
                                            className="input-field-login" 
                                            placeholder="Ingrese su Correo" 
                                            required 
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="input-group-login">
                                    <label>Contraseña</label>
                                    <div className="input-wrapper-login">
                                        <span className="material-symbols-outlined input-icon-login">lock</span>
                                        <input 
                                            type="password" 
                                            className="input-field-login" 
                                            placeholder="Ingrese su Contraseña" 
                                            required 
                                            value={formData.pass}
                                            onChange={(e) => setFormData({...formData, pass: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn-submit-login" disabled={loading}>
                                {loading ? 'CONECTANDO...' : 'Iniciar Sesión'}
                            </button>
                        </form>

                        <p className="register-link-login">
                            ¿No tienes cuenta? <Link href="/register">Crear una cuenta</Link>
                        </p>

                        <div className="divider-login">
                            <span>o</span>
                        </div>

                         <button className="google-btn-login" onClick={handleGoogleLogin}>
                            <svg className="google-icon-login" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </button>
                    </section>

                    <footer className="card-footer-login">
                        Tus datos se protegen con cifrado y buenas prácticas. © Camvia 2026
                    </footer>
                </div>
            </div>

            {/* Toast Notification */}
            <div className={`toast-login ${showToast ? 'visible' : ''} ${isToastError ? 'error' : ''}`}>
                <span className="material-symbols-outlined">{isToastError ? 'close' : 'check'}</span>
                <span>{toastMsg}</span>
            </div>
        </main>
    );
}
