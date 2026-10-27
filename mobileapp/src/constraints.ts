import port from '../local-port-numbers.json'

// These values are updated from the global 'port-numbers.json' via 'update-local-port.js'

export const API = `http://${port.address}:${port.gateway}/api`;
export const headers = { "app-type": "mobile" };