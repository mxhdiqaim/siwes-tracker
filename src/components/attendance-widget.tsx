import { useState, type FC } from "react";
import { isLocationNear, MOCK_LOCATIONS } from "@/utils/map-location.ts";
import { Box, Typography, Button, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOffIcon from "@mui/icons-material/LocationOff";

interface AttendanceProps {
    targetLocation: keyof typeof MOCK_LOCATIONS;
    userRole: "Lecturer" | "Student" | "Supervisor";
}

const AttendanceWidget: FC<AttendanceProps> = ({ targetLocation, userRole }) => {
    const theme = useTheme();
    const venue = MOCK_LOCATIONS[targetLocation];

    // --- State and Logic ---
    const [userLocation, setUserLocation] = useState(MOCK_LOCATIONS.USER_CURRENT);
    const [status, setStatus] = useState<"pending" | "success" | "fail">("pending");

    const isWithinRange = isLocationNear(userLocation, venue);

    const handleCheckIn = () => {
        if (isWithinRange) {
            setStatus("success");
            // Simulate logging to the console (backend interaction placeholder)
            console.log(`${userRole} checked in successfully at ${venue.name}`);
        } else {
            setStatus("fail");
            // Optionally, provide an alert to the user
            console.error("Check-in failed: Location mismatch.");
        }
    };

    // --- Dynamic Styling/Content ---
    const statusColor = isWithinRange ? theme.palette.success.main : theme.palette.error.main;
    const statusText = isWithinRange ? "Ready to Check In (Within Range)" : "Not at Venue (Location Mismatch)";
    const checkInDisabled = !isWithinRange || status === "success";

    return (
        <Box
            sx={{
                p: 2,
                border: `1px solid ${theme.palette.customColors.border}`,
                borderRadius: theme.borderRadius.medium,
                maxWidth: 350,
                boxShadow: theme.customShadows.card,
            }}
        >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                {userRole} Attendance Check
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                {isWithinRange ? (
                    <CheckCircleIcon sx={{ color: statusColor, mr: 1 }} />
                ) : (
                    <LocationOffIcon sx={{ color: statusColor, mr: 1 }} />
                )}
                <Typography variant="body1" sx={{ color: statusColor, fontWeight: 600 }}>
                    {statusText}
                </Typography>
            </Box>

            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Required Venue: {venue.name}
            </Typography>

            <Button
                onClick={handleCheckIn}
                disabled={checkInDisabled}
                fullWidth
                variant={status === "success" ? "contained" : "outlined"}
                color={status === "success" ? "success" : "primary"}
                startIcon={status === "success" ? <CheckCircleIcon /> : null}
            >
                {status === "success" ? "Checked In Successfully" : `Log ${userRole} Presence`}
            </Button>

            {/* Simulation Controls for POC */}
            <Box sx={{ mt: 3, p: 2, bgcolor: theme.palette.grey[50], borderRadius: theme.borderRadius.small }}>
                <Typography variant="caption" sx={{ display: "block", mb: 1, fontWeight: 600 }}>
                    — POC Simulation Controls —
                </Typography>
                <Button
                    onClick={() => setUserLocation(MOCK_LOCATIONS.USER_CURRENT)}
                    size="small"
                    variant="contained"
                    sx={{ mr: 1, bgcolor: theme.palette.info.main }}
                >
                    Simulate: At Venue
                </Button>
                <Button
                    onClick={() => setUserLocation(MOCK_LOCATIONS.USER_FAR)}
                    size="small"
                    variant="contained"
                    sx={{ bgcolor: theme.palette.warning.main }}
                >
                    Simulate: Away
                </Button>
            </Box>
        </Box>
    );
};

export default AttendanceWidget;
