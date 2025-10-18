export const DUTSE_CENTER = { lat: 11.6917, lng: 9.34 };

// Mock locations for demonstration
export const MOCK_LOCATIONS = {
    // Lecturer/Class Location (e.g. University Lecture Hall in Dutse)
    CLASS_VENUE: { lat: 11.695, lng: 9.35, name: "DUT Lecture Hall B" },

    // SIWES Site Location (e.g. a company in Dutse)
    SIWES_SITE: { lat: 11.691, lng: 9.345, name: "Jigawa Tech Solutions" },

    // Mock user's location (User is IN the SIWES site geofence)
    USER_CURRENT: { lat: 11.69105, lng: 9.34505, name: "User Current Location (Near Site)" },

    // Mock user's location (User is FAR from the site)
    USER_FAR: { lat: 11.75, lng: 9.4, name: "User Far Away" },
};

/**
 * Simulates the geofencing check (within a small radius).
 */
export const isLocationNear = (
    userLoc: { lat: number; lng: number },
    targetLoc: { lat: number; lng: number },
): boolean => {
    // Simple distance check (maintains the functional restriction)
    const distanceThreshold = 0.005; // Represents a small radius
    const latDiff = Math.abs(userLoc.lat - targetLoc.lat);
    const lngDiff = Math.abs(userLoc.lng - targetLoc.lng);
    return latDiff < distanceThreshold && lngDiff < distanceThreshold;
};
