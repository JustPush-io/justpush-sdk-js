import fetch from 'node-fetch'

class JustPushBase {
    static JUSTPUSH_API_URL = 'https://api.justpush.io'
    static CLIENT_VERSION = '0.1'

    constructor() {
        this.headers = {}
    }

    setToken(token) {
        this.headers['Authorization'] = 'Bearer ' + token
        return this
    }

    baseHeaders() {
        this.headers['Accept'] = 'application/json'
        this.headers['User-Agent'] =
            'JustPushAPIClient ' + JustPushBase.CLIENT_VERSION
        return this.headers
    }

    async request(endpoint, options = {}) {
        const url = `${JustPushBase.JUSTPUSH_API_URL}${endpoint}`
        const headers = this.baseHeaders()

        const fetchOptions = {
            ...options,
            headers: {
                ...headers,
                ...options.headers,
            },
        }

        try {
            const response = await fetch(url, fetchOptions)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return await response.json()
        } catch (error) {
            console.error('Error making request:', error)
            throw error
        }
    }
}

export default JustPushBase
