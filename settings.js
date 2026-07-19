
export const PROXY_PORT = 8888;

// [virtual_ip, real_ip, real_port]
//
// The virtual IP is the one that minetest-wasm sees.
// The virtual port is the same as the real port.
// Configuration can be provided via DIRECT_PROXY_CONFIG environment variable
// Format: JSON string with array of [virtual_ip, real_ip, real_port] tuples
// Example: DIRECT_PROXY_CONFIG='[["192.168.0.1","127.0.0.1",30000],["192.168.0.2","1.2.3.4",40000]]'
//
function getDirectProxy() {
    const configEnv = process.env.DIRECT_PROXY_CONFIG;
    
    // If env var is set and not "none", use it
    if (configEnv && configEnv !== 'none') {
        try {
            const parsed = JSON.parse(configEnv);
            if (Array.isArray(parsed)) {
                console.log('Using DIRECT_PROXY_CONFIG from environment variable');
                return parsed;
            }
        } catch (e) {
            console.error('Failed to parse DIRECT_PROXY_CONFIG environment variable:', e.message);
            console.log('Falling back to default configuration');
        }
    }
    
    // Default configuration
    return [
        // This allows clients to connect to a server running on the proxy itself.
        ['192.168.0.1', '127.0.0.1', 30000],

        // This would allow clients to connect to 1.2.3.4, port 40000
        //['192.168.0.2', '1.2.3.4', 40000],
    ];
}

export const DIRECT_PROXY = getDirectProxy();