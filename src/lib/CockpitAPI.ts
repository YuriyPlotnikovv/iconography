interface CockpitOptions {
    locale?: string;
    filter?: Record<string, any>;
    sort?: Record<string, number>;
    limit?: number;
    skip?: number;
    populate?: number;
}

class CockpitClient {
    private readonly baseUrl: string;
    private readonly apiKey: string;

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_COCKPIT_URL || '';
        this.apiKey = process.env.NEXT_PUBLIC_COCKPIT_API_KEY || '';
    }

    async getSingleItem(modelId: string, options: CockpitOptions = {}) {
        const query = this.createQueryString(options);
        const endpoint = `content/item/${modelId}${query}`;

        try {
            return await this.cockpitFetch(endpoint);
        } catch (e) {
            console.error('Cockpit getSingleItem error', e);
            return null;
        }
    }

    async getCollection(modelId: string, options: CockpitOptions = {}) {
        const query = this.createQueryString(options);
        const endpoint = `content/items/${modelId}${query}`;

        try {
            return await this.cockpitFetch(endpoint);
        } catch (e) {
            console.error('Cockpit getCollection error', e);
            return [];
        }
    }

    async getCollectionItem(modelId: string, elementId: string, options: CockpitOptions = {}) {
        const query = this.createQueryString(options);
        const endpoint = `content/item/${modelId}/${elementId}${query}`;

        try {
            return await this.cockpitFetch(endpoint);
        } catch (e) {
            console.error('Cockpit getCollectionItem error', e);
            return null;
        }
    }

    async getTree(modelId: string, options: CockpitOptions = {}) {
        const query = this.createQueryString(options);
        const endpoint = `content/tree/${modelId}${query}`;

        try {
            return await this.cockpitFetch(endpoint);
        } catch (e) {
            console.error('Cockpit getTree error', e);
            return null;
        }
    }

    getImageUrl(imageId: string, width: number, height: number) {
        return `${this.baseUrl}/api/assets/image/${imageId}?w=${width}&h=${height}&q=80&o=1`;
    }

    private createQueryString(options: object = {}) {
        const params = new URLSearchParams();

        Object.entries(options).forEach(([key, value]) => {
            if (value !== undefined) {
                params.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
            }
        });

        const query = params.toString();

        return query ? `?${query}` : '';
    }

    private async cockpitFetch(endpoint: string, options: RequestInit = {}) {
        const url = `${this.baseUrl}/api/${endpoint}`;
        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                'api-key': this.apiKey,
                ...options.headers,
            },
            ...options,
        };

        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error(`Cockpit error: ${response.statusText}`);
        }

        return response.json();
    }
}

const cockpit = new CockpitClient();
export default cockpit;
