'use client';

import React from 'react';

interface MobileStepIndicatorProps {
    currentStep: number;
    themeColor: string;
}

const MobileStepIndicator = ({ currentStep, themeColor }: MobileStepIndicatorProps) => {
    const activeColorClass = themeColor === 'blue' ? 'text-blue-500' : 'text-primary';
    const activeBgClass = themeColor === 'blue' ? 'bg-blue-500' : 'bg-primary';
    const activeBorderClass = themeColor === 'blue' ? 'border-blue-500' : 'border-primary';

    const getCircleClass = (step: number) => {
        if (currentStep > step) return `w-8 h-8 rounded-full border-2 ${activeBorderClass} ${activeBgClass} flex items-center justify-center text-black flex-shrink-0`;
        if (currentStep === step) return `w-8 h-8 rounded-full border-2 ${activeBorderClass} flex items-center justify-center ${activeColorClass} bg-surface-light dark:bg-surface-dark flex-shrink-0`;
        return `w-8 h-8 rounded-full border-2 border-gray-700 flex items-center justify-center text-gray-500 bg-surface-light dark:bg-surface-dark flex-shrink-0`;
    };

    const getLineClass = (step: number) => {
        if (currentStep > step) return `h-0.5 flex-1 ${themeColor === 'blue' ? 'bg-blue-500' : 'bg-primary'}`;
        return `h-0.5 flex-1 bg-gray-700`;
    };

    const checkTextColor = themeColor === 'blue' ? 'text-white' : 'text-black';

    return (
        <div className="md:hidden w-full shrink-0 mb-2 px-4">
            <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2 w-full justify-between">
                    {/* Step 1 */}
                    <div className={currentStep > 1 ? `w-8 h-8 rounded-full border-2 ${activeBorderClass} ${activeBgClass} flex items-center justify-center ${checkTextColor} flex-shrink-0` : getCircleClass(1)}>
                        <span className={`material-symbols-outlined text-sm ${currentStep > 1 ? 'font-bold' : ''}`}>{currentStep > 1 ? 'check' : 'home'}</span>
                    </div>
                    <div className={getLineClass(1)}></div>
                    {/* Step 2 */}
                    <div className={currentStep > 2 ? `w-8 h-8 rounded-full border-2 ${activeBorderClass} ${activeBgClass} flex items-center justify-center ${checkTextColor} flex-shrink-0` : getCircleClass(2)}>
                        <span className={`material-symbols-outlined text-sm ${currentStep > 2 ? 'font-bold' : ''}`}>{currentStep > 2 ? 'check' : 'payments'}</span>
                    </div>
                    <div className={getLineClass(2)}></div>
                    {/* Step 3 */}
                    <div className={getCircleClass(3)}>
                        <span className="material-symbols-outlined text-sm">upload_file</span>
                    </div>
                </div>
                <span className={`text-xs font-bold ${activeColorClass} uppercase tracking-wide`}>
                    {currentStep === 1 && "Paso 1: Resumen"}
                    {currentStep === 2 && "Paso 2: Pagar"}
                    {currentStep === 3 && "Paso 3: Subir"}
                </span>
            </div>
        </div>
    );
};

export default MobileStepIndicator;
