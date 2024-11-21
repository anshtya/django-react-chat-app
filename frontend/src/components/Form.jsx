import { useContext, useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";
import { AuthContext } from "../context/AuthContext";

function Form({ route, method }) {
    const { setUser } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    useEffect(() => {
        if (errorMessage) setErrorMessage(null)
    }, [username, password])

    const handleSubmit = async (e) => {
        setErrorMessage(null)
        setLoading(true);
        e.preventDefault();

        try {
            if (username === "" || password === "") {
                throw new Error("Incomplete credentials");
            }

            let res = await api.post(route, { username, password })
            if (method !== "login") {
                res = await api.post("auth/token/", { username, password })
            }
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

            res = await api.get("profile/");
            localStorage.setItem(USER, JSON.stringify(res.data));
            setUser(res.data);

            navigate("/")
        } catch (error) {
            if (method === "login" && error.status === 401) {
                setErrorMessage("Invalid credentials");
            } else if (error.message) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage("An error occurred");
            }
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                {name}
            </button>
            {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
        </form>
    );
}

export default Form