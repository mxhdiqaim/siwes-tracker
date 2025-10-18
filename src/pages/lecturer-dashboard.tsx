import { type FC } from "react";
import { Box, Typography, Grid, useTheme } from "@mui/material";
import AttendanceWidget from "@/components/attendance-widget.tsx";
import MapDisplay from "@/components/map-display.tsx";
import { MOCK_LOCATIONS, DUTSE_CENTER } from "@/utils/map-location";

const LecturerDashboard: FC = () => {
    const theme = useTheme();

    // The lecturer's scheduled class for the day
    const classVenue = MOCK_LOCATIONS.CLASS_VENUE;

    // Prepare markers for the map
    const mapMarkers = [
        {
            position: classVenue,
            label: `Scheduled Class: ${classVenue.name}`,
        },
        // We'll also show the mock user's current location on the map for clarity
        {
            position: MOCK_LOCATIONS.USER_CURRENT,
            label: "Your Current Location (Simulated)",
            icon: "blue_dot", // Leaflet doesn't use these icons easily, but the label is clear
        },
    ];

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Lecturer Dashboard
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
                Today's Schedule: Software Engineering - 12:00 PM
            </Typography>

            <Grid container spacing={4}>
                {/* Attendance Check Widget */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <AttendanceWidget
                        targetLocation="CLASS_VENUE" // Must match the MOCK_LOCATIONS key
                        userRole="Lecturer"
                    />
                </Grid>

                {/* Map Verification Display */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Box
                        sx={{
                            height: "500px",
                            borderRadius: theme.borderRadius.large,
                            overflow: "hidden",
                            boxShadow: theme.customShadows.dialog,
                        }}
                    >
                        <MapDisplay center={DUTSE_CENTER} markers={mapMarkers} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LecturerDashboard;
