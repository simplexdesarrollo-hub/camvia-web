'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SelectedPlan {
    id: number;
    name: string;
    price: number;
    type: string;
    qtyEntered?: number;
    unitPrice?: number;
    features?: string[];
}

interface AppliedCoupon {
    code: string;
    discount: number;
}

interface Bank {
    id: number;
    name: string;
    accountNumber?: string;
    accountNo?: string;
    accountName?: string;
    holder: string;
    phone?: string;
    qr?: string;
    logo?: string;
    cci?: string;
    type: string;
    currency?: string;
}


interface CompraContextType {
    paymentMethod: string;
    setPaymentMethod: (method: string) => void;
    uploadedFile: File | null;
    setUploadedFile: (file: File | null) => void;
    banks: Bank[];
    banksLoading: boolean;
    selectedPlan: SelectedPlan | null;
    setSelectedPlan: (plan: SelectedPlan | null) => void;
    selectedBank: Bank | null;
    setSelectedBank: (bank: Bank | null) => void;
    appliedCoupon: AppliedCoupon | null;
    setAppliedCoupon: (coupon: AppliedCoupon | null) => void;
    resetCompraState: () => void;
}

const CompraContext = createContext<CompraContextType | undefined>(undefined);

export const CompraProvider = ({ children }: { children: React.ReactNode }) => {
    const [paymentMethod, setPaymentMethod] = useState<string>(() => {
        if (typeof window !== 'undefined') return localStorage.getItem('compra_paymentMethod') || 'yape';
        return 'yape';
    });
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [banks, setBanks] = useState<Bank[]>([]);
    const [banksLoading, setBanksLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('compra_selectedPlan');
            return saved ? JSON.parse(saved) : null;
        }
        return null;
    });
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
    const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('compra_appliedCoupon');
            return saved ? JSON.parse(saved) : null;
        }
        return null;
    });

    // Sync with localStorage
    useEffect(() => {
        if (selectedPlan) localStorage.setItem('compra_selectedPlan', JSON.stringify(selectedPlan));
        else localStorage.removeItem('compra_selectedPlan');
    }, [selectedPlan]);

    useEffect(() => {
        localStorage.setItem('compra_paymentMethod', paymentMethod);
    }, [paymentMethod]);

    useEffect(() => {
        if (appliedCoupon) localStorage.setItem('compra_appliedCoupon', JSON.stringify(appliedCoupon));
        else localStorage.removeItem('compra_appliedCoupon');
    }, [appliedCoupon]);

    // Load banks
    useEffect(() => {
        const fetchBanks = async () => {
            try {
                setBanksLoading(true);
                const response = await fetch('https://desarrollo.simplexlatam.com/apps/services/v1/camvia/banks');
                if (response.ok) {
                    const data = await response.json();
                    setBanks(data);
                }
            } catch (error) {
                console.error('Error al cargar bancos:', error);
            } finally {
                setBanksLoading(false);
            }
        };
        fetchBanks();
    }, []);

    const resetCompraState = () => {
        setSelectedPlan(null);
        setPaymentMethod('yape');
        setAppliedCoupon(null);
        localStorage.removeItem('compra_selectedPlan');
        localStorage.removeItem('compra_paymentMethod');
        localStorage.removeItem('compra_appliedCoupon');
    };

    return (
        <CompraContext.Provider value={{
            paymentMethod,
            setPaymentMethod,
            uploadedFile,
            setUploadedFile,
            banks,
            banksLoading,
            selectedPlan,
            setSelectedPlan,
            selectedBank,
            setSelectedBank,
            appliedCoupon,
            setAppliedCoupon,
            resetCompraState
        }}>
            {children}
        </CompraContext.Provider>
    );
};

export const useCompra = () => {
    const context = useContext(CompraContext);
    if (!context) throw new Error('useCompra must be used within a CompraProvider');
    return context;
};
