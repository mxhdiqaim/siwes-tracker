import useNotifier from "@/hooks/use-notifier";
import { loginUserType, type LoginUserType } from "@/types/user-type";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Link as MuiLink,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

const defaultValues = {
    password: "",
    email: "",
};

const Login = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const notify = useNotifier();
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || "/";

    const {
        control,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        mode: "onBlur",
        resolver: yupResolver(loginUserType),
    });

    const onSubmit = (data: LoginUserType) => {
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (data.email === "admin@demo.com" && data.password === "password") {
                localStorage.setItem("isAuthenticated", "true");
                navigate(from, { replace: true });
                notify("Successfully logged in", "success");
            } else {
                localStorage.removeItem("isAuthenticated");
                notify("Invalid email or password", "error");
                setError("email", { type: "manual", message: "Invalid credentials" });
                setError("password", { type: "manual", message: "Invalid credentials" });
            }
            setLoading(false);
        }, 1500);
    };

    return (
        <Grid container spacing={2}>
            <Grid
                size={12}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    m: { xs: 3, md: 0 },
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: {
                            xs: "100%",
                            sm: "400px",
                        },
                    }}
                >
                    <Box sx={{ textAlign: "center", mb: 5 }}>
                        <Typography variant={"h5"} sx={{ fontWeight: 500 }}>
                            Welcome Back! Login to your account
                        </Typography>
                    </Box>
                    <Box component={"form"} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <FormControl fullWidth>
                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <TextField
                                        autoFocus
                                        label="Email"
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        error={Boolean(errors.email)}
                                        placeholder="admin@demo.com"
                                        sx={{ borderRadius: theme.shape.borderRadius }}
                                    />
                                )}
                            />
                            {errors.email && (
                                <FormHelperText sx={{ color: "error.main" }}>{errors.email.message}</FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: 3 }}>
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <TextField
                                        value={value}
                                        onBlur={onBlur}
                                        label="Password"
                                        onChange={onChange}
                                        id="auth-login-v2-password"
                                        error={Boolean(errors.password)}
                                        type={"password"}
                                        placeholder="password"
                                        sx={{ borderRadius: theme.shape.borderRadius }}
                                    />
                                )}
                            />
                            {errors.password && (
                                <FormHelperText sx={{ color: "error.main" }} id="">
                                    {errors.password.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                my: 3,
                            }}
                        >
                            <MuiLink component={Link} to="/forget-password" sx={{ textDecoration: "none" }}>
                                Forgot Password?
                            </MuiLink>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    width: "100%",
                                    color: "#fff",
                                    borderRadius: theme.shape.borderRadius,
                                    p: 2,
                                    mb: 2,
                                }}
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </Box>
                        <Box sx={{ textAlign: "center", mt: 2 }}>
                            <Typography variant="body1">
                                Don&apos;t have an account?{" "}
                                <Button variant="text" onClick={() => navigate("/register")}>
                                    Register
                                </Button>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
