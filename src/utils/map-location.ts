export const DUTSE_CENTER = { lat: 11.6917, lng: 9.34 };

const JIGPOLY_CENTER_LAT = 11.666;
const JIGPOLY_CENTER_LNG = 9.349;

// Mock locations for demonstration
export const MOCK_LOCATIONS = {
    // Lecturer/Class Location (Specific Classroom within Jigawa State Polytechnic, Dutse)
    CLASS_VENUE: {
        lat: JIGPOLY_CENTER_LAT,
        lng: JIGPOLY_CENTER_LNG,
        name: "JigPoly Main Lecture Theatre A",
    },

    // SIWES Site Location (A separate company in Dutse)
    SIWES_SITE: { lat: 11.691, lng: 9.345, name: "Jigawa Tech Solutions" },

    // Mock user's location (User is currently NEAR the CLASS_VENUE geofence)
    USER_CURRENT: {
        lat: JIGPOLY_CENTER_LAT + 0.00005,
        lng: JIGPOLY_CENTER_LNG + 0.00005,
        name: "User Current Location (Near Class)",
    },

    // Mock user's location (User is FAR from the site)
    USER_FAR: { lat: 11.75, lng: 9.4, name: "User Far Away" },
};

// Simulates the geofencing check (within a small radius).
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
