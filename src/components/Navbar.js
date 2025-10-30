import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/hamburgers.min.css";
import "../styles/navbar.css";

export default function Navbar() {
    const [active, setActive] = useState(false);
    return (
        <nav
            className={`navbar border-bottom border-1 border-dark mb-2 d-flex justify-content-between align-items-center`}
            style={{
                background: "linear-gradient(to left,#320000ff, #4f0202ee)",
            }}
        >
            <Link className="navbar-brand px-2" to="/">
                Read me at night
            </Link>
            <span className="d-flex align-items-center">
                <Link className="nav-link" to="/search" id="search">
                    <img src="/search.svg" alt="Search" />
                </Link>
                <button
                    className={`hamburger hamburger--spin ${
                        active ? "is-active" : ""
                    }`}
                    type="button"
                    onClick={() => setActive(!active)}
                    aria-label="Toggle navigation"
                    title="Toggle navigation"
                    aria-controls="navbarSupportedContent"
                    aria-expanded={active}
                    aria-haspopup="true"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                >
                    <span className="hamburger-box">
                        <span className={`hamburger-inner bg-light`}></span>
                    </span>
                </button>
            </span>

            <div
                className="collapse navbar-collapse border-top border-1 border-dark"
                id="navbarSupportedContent"
            >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/stories">
                            Stories
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
