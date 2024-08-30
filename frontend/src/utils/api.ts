// const BASE_URL = 'https://89de-124-35-178-74.ngrok-free.app/v1'
const BASE_URL = 'https://6wgdmkfkob.execute-api.ap-northeast-1.amazonaws.com/v1'
// const BASE_URL = 'http://localhost:8080/v1';

interface FetchOptions extends RequestInit {
    headers?: HeadersInit;
}

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    const defaultOptions: FetchOptions = {
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
