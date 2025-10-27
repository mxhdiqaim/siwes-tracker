import { Container, Typography, Grid, Box, Avatar, Grow } from "@mui/material";
import CustomCard from "@/components/ui/custom-card.tsx";
import { Link } from "react-router-dom";
import rectorImg from "@/assets/rector.jpeg";
import projectDeveloperImg from "@/assets/project_developer.jpeg";
import projectLeaderImg from "@/assets/project_leader.jpeg";
import directorQaImg from "@/assets/director_qa.jpeg";
import NITDAImg from "@/assets/nitda_nigeria_cover.jpg";
import SIWESImg from "@/assets/siwes.jpg";

// Placeholder data - replace with actual data
const rector = {
    name: "Dr. Suleiman Ahmed Badayi",
    title: "Rector, Jigawa State Polytechnic Dutse",
    message:
        "On behalf of the management, staff, and students of Jigawa State Polytechnic Dutse, I welcome you to our digital space. We are committed to providing quality technical and vocational education to empower our students for the challenges of the modern world. This platform is part of our effort to embrace technology in learning and administration.",
    imageUrl: rectorImg,
};

const siwesInfo = {
    title: "About SIWES",
    description:
        "The Student Industrial Work Experience Scheme (SIWES) is a skills training programme designed to expose and prepare students of universities, polytechnics, and colleges of education for the industrial work situation they are likely to meet after graduation. It is an effort to bridge the gap between theory and practice of engineering and technology, sciences, agriculture, medical, management and other professional educational programmes in the Nigerian tertiary institutions.",
    imageUrl: SIWESImg,
};

const nitdaInfo = {
    title: "NITDA's Vision for Tertiary Institutions",
    bossName: "Kashifu Inuwa Abdullahi",
    bossTitle: "CCIE, DG/CEO of NITDA",
    vision: "The National Information Technology Development Agency (NITDA) is committed to transforming Nigeria into a knowledge-based and IT-driven economy. A key part of this vision is supporting tertiary institutions with infrastructure, training, and resources to foster innovation, digital literacy, and a skilled workforce ready for the future.",
    imageUrl: NITDAImg,
};

const teamMembers = [
    {
        name: "Project Leader",
        role: "Project Leader",
        imageUrl: projectLeaderImg,
    },
    {
        name: "Marzuk Abdullahi",
        role: "Project Developer",
        imageUrl: projectDeveloperImg,
    },
    {
        name: "QA Director",
        role: "Director of QA",
        imageUrl: directorQaImg,
    },
    {
        name: "Mahdi Abubakar",
        role: "System Analyst",
        imageUrl: "",
    },
];

const LandingScreen = () => {
    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Grid container spacing={4}>
                {/* Rector's Welcome Message */}
                <Grid size={12}>
                    <CustomCard>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 3,
                                flexDirection: { xs: "column", md: "row" },
                            }}
                        >
                            <Avatar
                                alt={rector.name}
                                src={rector.imageUrl}
                                sx={{ width: { xs: 150, md: 300 }, height: { xs: 150, md: 300 } }}
                            />
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
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                alignItems: "center",
                                flexDirection: { xs: "column-reverse", md: "row" },
                            }}
                        >
                            <Box>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {siwesInfo.title}
                                </Typography>
                                <Typography variant="body1">{siwesInfo.description}</Typography>
                            </Box>
                            <Avatar
                                variant="rounded"
                                alt="SIWES"
                                src={siwesInfo.imageUrl}
                                sx={{ width: { xs: "100%", md: 300 }, height: { xs: 200, md: 200 }, borderRadius: 2 }}
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
                            <Avatar
                                alt={nitdaInfo.bossName}
                                src={nitdaInfo.imageUrl}
                                sx={{
                                    width: { xs: "100%", md: 350 },
                                    height: { xs: 200, md: 200 },
                                }}
                            />
                            <Box>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {nitdaInfo.title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {nitdaInfo.bossName} {nitdaInfo.bossTitle}
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 2 }}>
                                    {nitdaInfo.vision}
                                </Typography>
                            </Box>
                        </Box>
                    </CustomCard>
                </Grid>

                {/* Meet the Team Section */}
                <Grid size={12}>
                    <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
                        Meet the Team
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {teamMembers.map((member, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                                <Grow
                                    in={true}
                                    style={{ transformOrigin: "0 0 0" }}
                                    {...{ timeout: 500 * (index + 1) }}
                                >
                                    <Box>
                                        <CustomCard sx={{ textAlign: "center", p: 1 }}>
                                            <Avatar
                                                alt={member.name}
                                                src={member.imageUrl}
                                                sx={{ width: 150, height: 150, margin: "0 auto 16px" }}
                                            />
                                            <Typography variant="h6" component="h3">
                                                {member.name}
                                            </Typography>
                                            <Typography color="text.secondary">{member.role}</Typography>
                                        </CustomCard>
                                    </Box>
                                </Grow>
                            </Grid>
                        ))}
                    </Grid>
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

export default LandingScreen;
