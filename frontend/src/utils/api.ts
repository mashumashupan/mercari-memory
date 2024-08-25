const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

interface FetchOptions extends RequestInit {
    headers?: HeadersInit;
}

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    const defaultOptions: FetchOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    };

    try {
        const response = await fetch(url, defaultOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json() as T;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export default apiFetch;
