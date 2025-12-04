import { auth } from "../db";
import {
    setPersistence,
    browserLocalPersistence,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
// import { Spinner } from "react-bootstrap";
import "../styles/float-label.css";

export default function Register() {
    const [hasError, setHasError] = useState(false);
    const [isInputActive, setActive] = useState(false);
    const [loading, setLoading] = useState(false);
    // if (loading) return <Spinner />;
    if (loading) return <div></div>;
    return (
        <main className="d-flex justify-content-center align-items-center">
            <form
                action={
                    /** @param {FormData} formData*/ (formData) => {
                        setLoading(true);
                        if (
                            formData.get("pwd") !== formData.get("pwd-confirm")
                        ) {
                            setHasError(true);
                            setLoading(false);
                            return;
                        }
                        setPersistence(auth, browserLocalPersistence).then(
                            () => {
                                createUserWithEmailAndPassword(
                                    auth,
                                    formData.get("email"),
                                    formData.get("pwd")
                                )
                                    .then(() => {
                                        window.history.back();
                                    })
                                    .catch((error) => {
                                        setHasError(true);
                                        setLoading(false);
                                        console.error(error);
                                    });
                            }
                        );
                    }
                }
                className="w-50 h-75 border border-1 rounded rounded-3 border-success text-center"
            >
                <h1 className="m-3">Sign up...</h1>
                <p style={{ color: "red" }}>
                    {hasError
                        ? "The passwords do not match or is too weak. Please try again."
                        : ""}
                </p>
                <div className="form-floating">
                    <input
                        className={"rounded rounded-2 p-2 form-control".concat(
                            isInputActive ? " float-label-active" : ""
                        )}
                        placeholder=" "
                        type="email"
                        id="uname"
                        name="email"
                        onBlur={(e) => {
                            if (document.getElementById("uname").value) {
                                setActive(true);
                            } else setActive(false);
                        }}
                        aria-labelledby="uname-label"
                        required
                        autoComplete="username"
                        autoFocus
                    />
                    <label id="uname-label" htmlFor="uname">
                        E-Mail Address
                    </label>
                </div>

                <div className="form-floating mt-5">
                    <input
                        className="rounded rounded-2 p-2 form-control"
                        type="password"
                        id="pwd"
                        name="pwd"
                        aria-labelledby="pwd-label"
                        required
                        placeholder=" "
                        autoComplete="current-password"
                    />
                    <label id="pwd-label" htmlFor="pwd">
                        Password
                    </label>
                </div>
                <div className="form-floating mt-5">
                    <input
                        className="rounded rounded-2 p-2 form-control"
                        type="password"
                        id="pwd"
                        name="pwd-confirm"
                        aria-labelledby="pwd-label"
                        required
                        placeholder=" "
                        autoComplete="current-password"
                    />
                    <label id="pwd-label" htmlFor="pwd">
                        Password confirmation
                    </label>
                </div>
                <button className="w-75 btn btn-success my-3">Anmelden</button>
            </form>
        </main>
    );
}
