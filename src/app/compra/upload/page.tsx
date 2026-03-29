'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCompra } from '../context';
import { auth, storage } from '@/services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Layout from '../components/Layout';

const UploadScreen = () => {
    const router = useRouter();
    const { paymentMethod, uploadedFile, setUploadedFile, selectedPlan, selectedBank, resetCompraState, appliedCoupon } = useCompra();
    const [user, setUser] = useState<User | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
        return () => unsubscribe();
    }, []);

    // Calcular total con cupón para la UI
    let currentFinalAmount = selectedPlan?.price || 0;
    if (appliedCoupon) {
        currentFinalAmount = Math.max(0, currentFinalAmount - (appliedCoupon.discount || 0));
    }
    const isFreeCheckout = currentFinalAmount <= 0;

    const handleBack = () => {
        if (paymentMethod === 'yape') router.push('/compra/payment/yape');
        else router.push('/compra/payment/bank');
    };

    const uploadToFirebase = async (file: File) => {
        if (!user) {
            alert('Debes iniciar sesión para subir archivos');
            return null;
        }

        try {
            setUploading(true);
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const timestamp = Date.now();
            const extension = file.name.split('.').pop();
            const fileName = `${timestamp}.${extension}`;

            const storagePath = `camvia/order/${year}-${month}/${user.uid}/${fileName}`;
            const storageRef = ref(storage, storagePath);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            return downloadURL;
        } catch (error) {
            console.error('Error al subir archivo:', error);
            alert('Error al subir el archivo.');
            return null;
        } finally {
            setUploading(false);
        }
    };

    const handleFinish = async () => {
        if (!isFreeCheckout && !uploadedFile) {
            alert('Por favor sube un comprobante');
            return;
        }

        try {
            setUploading(true);
            let fileURL = "FREE_COUPON";

            if (!isFreeCheckout && uploadedFile) {
                const url = await uploadToFirebase(uploadedFile);
                if (!url) return;
                fileURL = url;
            }

            // Simular POST a la API
            const orderData = {
                packageId: selectedPlan?.id || "1",
                userId: user?.uid,
                amount: currentFinalAmount.toFixed(2),
                image: fileURL,
                bankId: selectedBank?.id
            };

            console.log('📦 Orden enviada:', orderData);
            
            // Simular éxito de API
            setTimeout(() => {
                setShowSuccessModal(true);
                resetCompraState();
                setTimeout(() => router.push('/account'), 2500);
            }, 1500);

        } catch (error) {
            console.error('Error al procesar la orden:', error);
            alert('Error al procesar la orden.');
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = (file: File) => {
        if (!file) return;
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            alert('Solo JPG, PNG o PDF');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('Máximo 5MB');
            return;
        }

        setUploadedFile(file);
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    return (
        <Layout currentStep={3}>
            <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-lg">{isFreeCheckout ? 'verified' : 'upload_file'}</span>
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-white">{isFreeCheckout ? 'Confirmar' : 'Subir Comprobante'}</h2>
                </div>
            </div>

            <div className="p-4 md:p-8 flex flex-col items-center">
                <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">{isFreeCheckout ? '¡Todo listo!' : 'Validación de Pago'}</h3>
                    <p className="text-gray-500 text-sm max-w-xs mx-auto">
                        {isFreeCheckout ? 'Haz clic en finalizar para confirmar tu orden gratuita.' : 'Adjunta una captura de tu transferencia o pago por QR.'}
                    </p>
                </div>

                {!isFreeCheckout && (
                    <div className="w-full max-w-md">
                        <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])} />
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if(f) handleFileChange(f); }}
                            className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${isDragging ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-white/20'}`}
                        >
                            {!uploadedFile ? (
                                <>
                                    <span className="material-symbols-outlined text-5xl text-gray-600">cloud_upload</span>
                                    <span className="text-gray-400 font-bold">Seleccionar archivo</span>
                                    <span className="text-[10px] text-gray-600 uppercase">JPG, PNG, PDF (Max 5MB)</span>
                                </>
                            ) : (
                                <div className="flex items-center gap-4 w-full">
                                    {preview ? (
                                        <img src={preview} className="w-16 h-16 object-cover rounded-xl" alt="Preview" />
                                    ) : (
                                        <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center"><span className="material-symbols-outlined">description</span></div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="text-white font-bold truncate text-sm">{uploadedFile.name}</div>
                                        <div className="text-[10px] text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                                    </div>
                                    <span className="material-symbols-outlined text-green-500">check_circle</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 md:p-6 border-t border-white/5 bg-black/40 flex flex-row justify-between gap-3 md:justify-end mt-auto">
                <button onClick={handleBack} className="flex-1 md:flex-none px-8 py-3.5 rounded-xl border border-white/10 text-gray-400 font-bold text-sm hover:bg-white/5 transition-colors">Anterior</button>
                <button 
                    onClick={handleFinish}
                    disabled={(!isFreeCheckout && !uploadedFile) || uploading}
                    className="flex-1 md:flex-none px-10 py-3.5 rounded-xl bg-primary text-black font-black text-sm shadow-[0_4px_20px_rgba(0,255,127,0.3)] hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                    {uploading ? 'Procesando...' : 'Finalizar'}
                </button>
            </div>

            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[10000] flex items-center justify-center p-4">
                    <div className="bg-[#161B22] border border-white/10 rounded-[32px] p-8 max-w-sm w-full text-center">
                        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,255,127,0.4)]">
                            <span className="material-symbols-outlined text-black text-4xl font-bold">check</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">¡Orden registrada!</h3>
                        <p className="text-gray-400 text-sm mb-6">Estamos verificando tu pago. Te avisaremos pronto.</p>
                        <div className="bg-primary/10 text-primary py-3 px-6 rounded-2xl text-xs font-bold">Redirigiendo...</div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default UploadScreen;
