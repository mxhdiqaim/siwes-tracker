export const DUTSE_CENTER = { lat: 11.6917, lng: 9.34 };

const JIGPOLY_BASE_LAT = 11.666;
const JIGPOLY_BASE_LNG = 9.349;

// Mock locations for demonstration
export const MOCK_LOCATIONS = {
    CLASS_VENUE: {
        lat: JIGPOLY_BASE_LAT,
        lng: JIGPOLY_BASE_LNG,
        name: "JigPoly Main Lecture Theatre A (Target)",
    },

    // SIWES Site Location (Now simulated as a specific department/office within JigPoly)
    SIWES_SITE: {
        lat: JIGPOLY_BASE_LAT + 0.0001, // Slightly offset for marker visibility on a map
        lng: JIGPOLY_BASE_LNG + 0.0001,
        name: "JigPoly SIWES Coordinator's Office (Target)",
    },

    // Mock user's location (User is currently NEAR the geofence)
    USER_CURRENT: {
        // This coordinate is intentionally NEAR both SIWES_SITE and CLASS_VENUE
        lat: JIGPOLY_BASE_LAT + 0.00015,
        lng: JIGPOLY_BASE_LNG + 0.00015,
        name: "User Current Location (Near Campus)",
    },

    // Mock user's location (User is FAR from the site)
    USER_FAR: { lat: 11.75, lng: 9.4, name: "User Far Away" },
};

// Simulates the geofencing check (remains the same)
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
