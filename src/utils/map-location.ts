// Abuja coordinates for context
export const ABUJA_CENTER = { lat: 9.0765, lng: 7.3986 };

// Mock locations for demonstration
export const MOCK_LOCATIONS = {
    // Lecturer/Class Location (e.g., University Lecture Hall)
    CLASS_VENUE: { lat: 9.07, lng: 7.41, name: "CST Lecture Theatre" },
    // SIWES Site Location (e.g., a company in Jabi)
    SIWES_SITE: { lat: 9.05, lng: 7.4, name: "Jabi Tech Hub" },
    // Mock user's location (e.g. the lecturer's current position)
    USER_CURRENT: { lat: 9.05, lng: 7.4, name: "User Current Location" },
    USER_FAR: { lat: 9.0, lng: 7.0, name: "User Far Away" },
};

/**
 * Simulates the geofencing check (within a 100-meter radius).
 */
export const isLocationNear = (
    userLoc: { lat: number; lng: number },
    targetLoc: { lat: number; lng: number },
): boolean => {
    // Simple distance check (very rough estimation for simulation)
    const distanceThreshold = 0.005; // Represents a small radius
    const latDiff = Math.abs(userLoc.lat - targetLoc.lat);
    const lngDiff = Math.abs(userLoc.lng - targetLoc.lng);
    return latDiff < distanceThreshold && lngDiff < distanceThreshold;
};
