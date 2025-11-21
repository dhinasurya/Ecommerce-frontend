import { createContext, useState, useEffect } from "react";
import API from "../api/axios";
import { getAccessToken, setAccessToken, clearAuth } from "../utils/authHelpers";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // to prevent flash on load

    // -------------------------------
    // Load user on first app load
    // -------------------------------
    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            setLoading(false);
            return;
        };

        API.get("/auth/me")
            .then((res) => setUser(res.data))
            .catch(() => {
                clearAuth();
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    // -------------------------------
    // LOGIN FUNCTION
    // -------------------------------
    const login = (accessToken, userData) => {
        setAccessToken(accessToken);  // store token in helpers
        setUser(userData);            // update UI
    };

    // -------------------------------
    // LOGOUT FUNCTION
    // -------------------------------
    const logout = async () => {
        clearAuth();
        try { await API.post("/auth/logout") } catch {}
        setUser(null);
        navigate("/login");
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
        {children}
        </AuthContext.Provider>
    );
};