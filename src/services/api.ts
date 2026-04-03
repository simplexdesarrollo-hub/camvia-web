export interface PlanDetail {
    isActive: boolean;
    id: number;
    packageId: number;
    description: string;
    order: number;
}

export interface Package {
    isActive: boolean;
    id: number;
    type: string;
    days: number;
    months: number;
    name: string;
    description: string | null;
    qtyEntered: number;
    qtyList: number;
    priceEntered: string;
    priceList: string;
    currency: string;
    dateStart: string | null;
    details: PlanDetail[];
}

export interface Reward {
    isActive: boolean;
    id: number;
    top: number;
    name: string;
    url: string | null;
    payments: string | null;
    icon: string;
    winnerId: number | null;
    ticketId: number | null;
    packageId: number;
}

export interface Ticket {
    created: string;
    updated: string;
    isActive: boolean;
    id: number;
    type: string;
    days: number;
    months: number;
    name: string;
    description: string;
    qtyEntered: number;
    qtyList: number;
    priceEntered: string;
    priceList: string;
    currency: string;
    dateStart: string;
    rewards: Reward[];
}

export interface HomeResponse {
    isActive: boolean;
    id: number;
    name: string;
    ruc: string;
    description: string | null;
    address: string;
    package: Package[];
    ticket: Ticket;
}

export async function fetchHomeData(): Promise<HomeResponse | null> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjkyLCJlbWFpbCI6ImpncmF1c2FsYXphcjlAZ21haWwuY29tIiwicm9sIjoiQ2xpZW50IiwiaWF0IjoxNzc0NTMzMDM2LCJleHAiOjE3NzUxMzc4MzZ9.FRJ3Kfy5QZyl7UxMMx4xveEfy05T5Q0cpgTNPKNUC_k';
    try {
        const res = await fetch('https://apis.simplexlatam.com/apps/services/v1/camvia/company/home', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            next: { revalidate: 3600 } 
        });
        if (!res.ok) throw new Error('Failed to fetch home data');
        const data = await res.json();
        return data as HomeResponse;
    } catch (error) {
        console.error("fetchHomeData Error:", error);
        return null; // fallback will be handled in UI
    }
}
export async function fetchRewards(packageId: number): Promise<Reward[]> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjkyLCJlbWFpbCI6ImpncmF1c2FsYXphcjlAZ21haWwuY29tIiwicm9sIjoiQ2xpZW50IiwiaWF0IjoxNzc0NTMzMDM2LCJleHAiOjE3NzUxMzc4MzZ9.FRJ3Kfy5QZyl7UxMMx4xveEfy05T5Q0cpgTNPKNUC_k';
    try {
        const res = await fetch(`https://apis.simplexlatam.com/apps/services/v1/camvia/packages/${packageId}/rewards`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) {
            if (res.status === 404) return [];
            throw new Error('Error fetching rewards');
        }

        const data = await res.json();
        return data as Reward[];
    } catch (error) {
        console.error('Error fetching rewards:', error);
        return [];
    }
}
