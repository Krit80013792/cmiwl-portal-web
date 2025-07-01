/**
 * Enum representing HTTP methods.
 */
export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
};

/**
 * Generates headers for an HTTP request.
 * @param paConf - Configuration object containing the API key.
 * @returns HeadersInit - The headers required for the request.
 */
export const getHeaders = (paConf: any): HeadersInit => ({
    'Content-Type': 'application/json',
    'x-api-key': paConf?.ak ?? '',
});

/**
 * A generic HTTP client for making API requests.
 * @param psUrl - The URL of the API endpoint.
 * @param method - The HTTP method to use (e.g., GET, POST, PUT).
 * @param paConf - Configuration object containing API key and other settings.
 * @param paBody - (Optional) The request body for POST, PUT, or PATCH requests.
 * @param psQueryFilter - (Optional) The request query string for GET.
 * @returns Promise<Response> - The HTTP response.
 * @throws Error - Throws an error if the request fails.
 */
export const httpClient = async (psUrl: string, method: string, paConf: any, paBody?: any, psQueryFilter?: string) => {
    const options: RequestInit = {
        method,
        headers: getHeaders(paConf),
        body: paBody ? JSON.stringify(paBody) : undefined,
    };
    let url = psUrl;
    if (psQueryFilter) {
        url += "?q=1&" + psQueryFilter;
    }
    const response = await fetch(url, options);
    return response;
};
