import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/landing.tsx"),
    route('/login', 'routes/login.tsx'),
    route('/signup', 'routes/signup.tsx'),
    route('/dashboard', 'routes/dashboard.tsx'),
    route('/upload', 'routes/upload.tsx'),
    route('/resume/:id', 'routes/resume.$id.tsx'),
] satisfies RouteConfig;
