import { type FC } from "react";
import { Box, Typography, Grid } from "@mui/material";
import AttendanceWidget from "@/components/attendance-widget.tsx";
import MapDisplay from "@/components/map-display.tsx";
import { MOCK_LOCATIONS } from "@/utils/map-location";

const LecturerDashboard: FC = () => {
    const classVenue = MOCK_LOCATIONS.CLASS_VENUE;

    // Prepare markers for the map
    const mapMarkers = [
        {
            position: classVenue,
            label: `Scheduled Class: ${classVenue.name}`,
        },
        {
            position: MOCK_LOCATIONS.USER_CURRENT,
            label: "Your Current Location (Simulated)",
            icon: "blue_dot",
        },
    ];

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Lecturer Dashboard
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
                Today's Schedule: Software Engineering - 12:00 PM
            </Typography>

            <Grid container spacing={4}>
                {/* Attendance Check Widget (Location-Restricted to CLASS_VENUE) */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <AttendanceWidget targetLocation="CLASS_VENUE" userRole="lecturer" />
                </Grid>

                {/* Map Verification Display */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Box
                        sx={{
                            height: "500px",
                            overflow: "hidden",
                            borderRadius: 5,
                        }}
                    >
                        <MapDisplay
                            center={classVenue} // Center the map on the actual class venue for lecturer context
                            markers={mapMarkers}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LecturerDashboard;
