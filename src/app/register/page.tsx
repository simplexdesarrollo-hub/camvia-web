'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/services/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import './register.css';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        dob: '',
        email: '',
        pass: '',
        passConfirm: '',
        terms: false
    });

    const [error, setError] = useState('');
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.pass !== formData.passConfirm) {
            notify('Las contraseñas no coinciden.', true);
            return;
        }

        if (formData.pass.length < 8) {
            notify('Mínimo 8 caracteres.', true);
            return;
        }

        if (!formData.terms) {
            notify('Debes aceptar los términos.', true);
            return;
        }

        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.pass);
            await updateProfile(userCredential.user, {
                displayName: `${formData.name} ${formData.lastname}`
            });
            notify('¡Registro exitoso! Iniciando sesión...');
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (err: any) {
            console.error('Register Error:', err.message);
            notify('Error al registrar: ' + (err.code || 'Intenta de nuevo'), true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="register-page-container">
            {/* Background elements */}
            <div className="bg-elements-reg">
                <div className="neon-grid-reg"></div>
                <div className="scanline-reg"></div>
            </div>

            <Link href="/" className="back-link-reg">
                <span className="material-symbols-outlined">arrow_back</span> Volver
            </Link>

            <div className="container-reg">
                <div className="card-reg">
                    <header className="card-header-reg">
                        <div className="brand-logo-reg">C</div>
                        <div className="header-info-reg">
                            <h1>Regístrate</h1>
                            <p>Únete hoy y participa por múltiples premios en un solo lugar. Planes desde <b>S/ 9/mes</b>.</p>
                        </div>
                        <div className="shine-reg"></div>
                    </header>

                    <section className="card-body-reg">
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="form-grid-reg">
                                <div className="input-group-reg">
                                    <label>Nombres</label>
                                    <div className="input-wrapper-reg">
                                        <span className="material-symbols-outlined input-icon-reg">person</span>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            className="input-field-reg" 
                                            placeholder="Ej. Juan" 
                                            required 
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="input-group-reg">
                                    <label>Apellidos</label>
                                    <div className="input-wrapper-reg">
                                        <span className="material-symbols-outlined input-icon-reg">group</span>
                                        <input 
                                            type="text" 
                                            name="lastname" 
                                            className="input-field-reg" 
                                            placeholder="Ej. Pérez" 
                                            required 
                                            value={formData.lastname}
                                            onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-grid-reg">
                                <div className="input-group-reg">
                                    <label>Fecha de Nacimiento</label>
                                    <div className="input-wrapper-reg">
                                        <span className="material-symbols-outlined input-icon-reg">calendar_today</span>
                                        <input 
                                            type="date" 
                                            name="dob" 
                                            className="input-field-reg" 
                                            required 
                                            value={formData.dob}
                                            onChange={(e) => setFormData({...formData, dob: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="input-group-reg">
                                    <label>Correo</label>
                                    <div className="input-wrapper-reg">
                                        <span className="material-symbols-outlined input-icon-reg">mail</span>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            className="input-field-reg" 
                                            placeholder="juan@camvia.com" 
                                            required 
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-grid-reg">
                                <div className="input-group-reg">
                                    <label>Contraseña</label>
                                    <div className="input-wrapper-reg">
                                        <span className="material-symbols-outlined input-icon-reg">lock</span>
                                        <input 
                                            type="password" 
                                            name="pass" 
                                            className="input-field-reg" 
                                            placeholder="••••••••" 
                                            required 
                                            value={formData.pass}
                                            onChange={(e) => setFormData({...formData, pass: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="input-group-reg">
                                    <label>Repetir Contraseña</label>
                                    <div className="input-wrapper-reg">
                                        <span className="material-symbols-outlined input-icon-reg">verified_user</span>
                                        <input 
                                            type="password" 
                                            name="passConfirm" 
                                            className="input-field-reg" 
                                            placeholder="••••••••" 
                                            required 
                                            value={formData.passConfirm}
                                            onChange={(e) => setFormData({...formData, passConfirm: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="checkbox-row-reg">
                                <input 
                                    type="checkbox" 
                                    id="terms" 
                                    required 
                                    checked={formData.terms}
                                    onChange={(e) => setFormData({...formData, terms: e.target.checked})}
                                />
                                <label htmlFor="terms">
                                    Confirmo que he leído y acepto los <a href="#">términos de servicio</a> y la <a href="#">privacidad de datos</a>.
                                </label>
                            </div>

                            <button type="submit" className="btn-submit-reg" disabled={loading}>
                                {loading ? 'PROCESANDO...' : 'Sincronizar mi cuenta'}
                            </button>
                        </form>

                        <p className="login-link-reg">
                            ¿Ya eres parte? <Link href="/login">Identifícate aquí</Link>
                        </p>
                    </section>

                    <footer className="card-footer-reg">
                        Sistemas encriptados © Camvia Tech Industries 2026
                    </footer>
                </div>
            </div>

            {/* Toast Notification */}
            <div className={`toast-reg ${showToast ? 'visible' : ''} ${isToastError ? 'error' : ''}`}>
                <span className="material-symbols-outlined">{isToastError ? 'close' : 'check'}</span>
                <span>{toastMsg}</span>
            </div>
        </main>
    );
}
