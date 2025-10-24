import { Container, Typography, Grid, Box, Avatar } from "@mui/material";
import CustomCard from "@/components/ui/custom-card.tsx";
import { Link } from "react-router-dom";

// Placeholder data - replace with actual data
const rector = {
    name: "Dr. Usman M. Jahun",
    title: "Rector, Jigawa State Polytechnic Dutse",
    message:
        "On behalf of the management, staff, and students of Jigawa State Polytechnic Dutse, I welcome you to our digital space. We are committed to providing quality technical and vocational education to empower our students for the challenges of the modern world. This platform is part of our effort to embrace technology in learning and administration.",
    imageUrl: "https://via.placeholder.com/200", // Replace it with actual image URL
};

const siwesInfo = {
    title: "About SIWES",
    description:
        "The Student Industrial Work Experience Scheme (SIWES) is a skills training programme designed to expose and prepare students of universities, polytechnics, and colleges of education for the industrial work situation they are likely to meet after graduation. It is an effort to bridge the gap between theory and practice of engineering and technology, sciences, agriculture, medical, management and other professional educational programmes in the Nigerian tertiary institutions.",
};

const nitdaInfo = {
    title: "NITDA's Vision for Tertiary Institutions",
    bossName: "Kashifu Inuwa Abdullahi",
    bossTitle: "DG/CEO of NITDA",
    vision: "The National Information Technology Development Agency (NITDA) is committed to transforming Nigeria into a knowledge-based and IT-driven economy. A key part of this vision is supporting tertiary institutions with infrastructure, training, and resources to foster innovation, digital literacy, and a skilled workforce ready for the future.",
    imageUrl: "https://via.placeholder.com/200", // Replace with actual image URL
};

const WelcomeScreen = () => {
    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Grid container spacing={4}>
                {/* Rector's Welcome Message */}
                <Grid size={12}>
                    <CustomCard>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                            <Avatar alt={rector.name} src={rector.imageUrl} sx={{ width: 300, height: 300 }} />
                            <Box>
                                <Typography variant="h4" component="h1" gutterBottom>
                                    Welcome Message
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    {rector.name}, {rector.title}
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 2 }}>
                                    {rector.message}
                                </Typography>
                            </Box>
                        </Box>
                    </CustomCard>
                </Grid>

                {/* About SIWES */}
                <Grid size={12}>
                    <CustomCard>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Box>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {siwesInfo.title}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {siwesInfo.description}
                                </Typography>
                            </Box>
                            <Avatar
                                alt={rector.name}
                                src={rector.imageUrl}
                                sx={{ width: 300, height: 300, borderRadius: 5 }}
                            />
                        </Box>
                    </CustomCard>
                </Grid>

                {/* About NITDA */}
                <Grid size={12}>
                    <CustomCard>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 3,
                                flexDirection: { xs: "column", md: "row-reverse" },
                            }}
                        >
                            <Box>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {nitdaInfo.title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {nitdaInfo.bossName}, {nitdaInfo.bossTitle}
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 2 }}>
                                    {nitdaInfo.vision}
                                </Typography>
                            </Box>
                            <Avatar
                                alt={nitdaInfo.bossName}
                                src={nitdaInfo.imageUrl}
                                sx={{ width: 300, height: 300 }}
                            />
                        </Box>
                    </CustomCard>
                </Grid>

                {/* Another Related Content Section */}
                <Grid size={12}>
                    <CustomCard>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Try the app
                        </Typography>
                        <Box component={Link} to={"/admin"}>
                            Administrative Dashboard
                        </Box>
                    </CustomCard>
                </Grid>
            </Grid>
        </Container>
    );
};

export default WelcomeScreen;
