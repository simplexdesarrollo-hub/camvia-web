'use client';

import React from 'react';

interface SidebarItemProps {
    stepNumber: number;
    title: string;
    currentStep: number;
    themeColor: string;
}

const SidebarItem = ({ stepNumber, title, currentStep, themeColor }: SidebarItemProps) => {
    const isActive = currentStep === stepNumber;
    const isCompleted = currentStep > stepNumber;

    const activeBorderColor = themeColor === 'blue' ? 'border-blue-500' : 'border-primary';
    const activeTextColor = themeColor === 'blue' ? 'text-blue-500' : 'text-primary';
    const shadowColor = themeColor === 'blue' ? 'shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'shadow-[0_0_10px_rgba(0,230,118,0.2)]';
    const checkBgColor = themeColor === 'blue' ? 'bg-blue-500' : 'bg-primary';
    const checkTextColor = themeColor === 'blue' ? 'text-white' : 'text-black';

    let lineClass = "step-line";
    if (isCompleted) {
        lineClass = themeColor === 'blue' ? "step-line-active-blue" : "step-line-active-green";
    }

    return (
        <li className="relative">
            <div className="flex items-start gap-4">
                <div className="relative z-10 flex-shrink-0">
                    {isCompleted ? (
                        <div className={`w-10 h-10 rounded-full border-2 ${themeColor === 'blue' ? 'border-blue-500' : 'border-primary'} ${checkBgColor} flex items-center justify-center ${checkTextColor} shadow-md`}>
                            <span className="material-symbols-outlined text-xl font-bold">check</span>
                        </div>
                    ) : isActive ? (
                        <div className={`w-10 h-10 rounded-full border-2 ${activeBorderColor} flex items-center justify-center ${activeTextColor} bg-surface-light dark:bg-surface-dark ${shadowColor}`}>
                            <span className="material-symbols-outlined text-xl">
                                {stepNumber === 1 ? 'home' : stepNumber === 2 ? 'payments' : 'upload_file'}
                            </span>
                        </div>
                    ) : (
                        <div className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 bg-surface-light dark:bg-surface-dark">
                            <span className="material-symbols-outlined text-xl">
                                {stepNumber === 1 ? 'home' : stepNumber === 2 ? 'payments' : 'upload_file'}
                            </span>
                        </div>
                    )}
                    {stepNumber < 3 && <div className={lineClass}></div>}
                </div>
                <div className="pt-1">
                    <span className={`block text-xs uppercase tracking-wider font-medium mb-0.5 ${isActive ? activeTextColor : 'text-gray-500'}`}>
                        Paso {stepNumber}
                    </span>
                    <span className={`block text-base ${isActive ? 'font-bold text-gray-900 dark:text-white' : 'font-medium text-gray-500 dark:text-gray-400'}`}>
                        {title}
                    </span>
                </div>
            </div>
            <style jsx>{`
                .step-line {
                    position: absolute;
                    left: 19px;
                    top: 40px;
                    bottom: -24px;
                    width: 2px;
                    background-color: #374151;
                }
                .step-line-active-green {
                    position: absolute;
                    left: 19px;
                    top: 40px;
                    bottom: -24px;
                    width: 2px;
                    background-color: var(--primary);
                }
                .step-line-active-blue {
                    position: absolute;
                    left: 19px;
                    top: 40px;
                    bottom: -24px;
                    width: 2px;
                    background-color: #3b82f6;
                }
            `}</style>
        </li>
    );
};

export default SidebarItem;
