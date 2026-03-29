'use client';

import React from 'react';
import SidebarItem from './SidebarItem';
import MobileStepIndicator from './MobileStepIndicator';

interface LayoutProps {
    children: React.ReactNode;
    currentStep: number;
    themeColor?: string;
}

const Layout = ({ children, currentStep, themeColor = 'green' }: LayoutProps) => {
    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col pt-4 md:pt-6 md:block">
            <header className="flex justify-between items-center px-4 py-0 md:px-0 md:mb-4 shrink-0">
                <h1 className="text-xl md:text-3xl font-bold tracking-tight">Orden de compra</h1>
            </header>
            <div className="flex-1 flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6 items-start px-0 md:px-0 pb-4 md:pb-0">
                {/* Desktop Sidebar */}
                <div className="md:col-span-4 lg:col-span-3 shrink-0 hidden md:block">
                    <nav className="bg-surface-light dark:bg-card-inner-dark rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-800">
                        <ul className="space-y-6">
                            <SidebarItem stepNumber={1} title="Resumen" currentStep={currentStep} themeColor={themeColor} />
                            <SidebarItem stepNumber={2} title="Pagar" currentStep={currentStep} themeColor={themeColor} />
                            <SidebarItem stepNumber={3} title="Subir comprobante" currentStep={currentStep} themeColor={themeColor} />
                        </ul>
                    </nav>
                </div>

                {/* Mobile Header */}
                <MobileStepIndicator currentStep={currentStep} themeColor={themeColor} />

                {/* Content */}
                <div className="md:col-span-8 lg:col-span-9 flex flex-col min-h-0 bg-surface-light dark:bg-card-inner-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mobile-content-wrapper w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
