import { useEffect, useState } from "react";
import "../styles/Home.css";
import db from "../db";
import { onValue, ref } from "firebase/database";
import Search from "../components/Search";

export default function Home() {
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    useEffect(() => {
        const authorsRef = ref(db, "authors");
        const tagsRef = ref(db, "tags");
        onValue(tagsRef, (snapshot) => {
            setTags(Object.values(snapshot.val() || {}));
        });
        onValue(authorsRef, (snapshot) => {
            setAuthors(Object.values(snapshot.val() || {}));
        });
    }, []);
    return (
        <div>
            <section className="d-flex">
                <div
                    className="d-flex flex-column justify-content-center"
                    id="hero-text"
                >
                    <h1 className="fw-bolder center p-2" id="hero-title">
                        Do <span id="not">not</span> read this at night
                    </h1>
                    <span className="fs-5" id="hero-subtitle">
                        Welcome, wanderer. <br />
                        You weren’t looking for this place — not really. <br />A
                        click here, a story there… <br />
                        curiosity pretending to be boredom. <br />
                        That’s how it starts. <br />
                        If you feel the breath behind your neck, <br />
                        stop reading. <br /> (But all three of us know you won’t
                        stop and turn around.)
                    </span>
                    <span className="fs-5 mx-5" id="hero-subtitle-mobile">
                        Welcome, wanderer. <br />
                        You found this by accident. <br />
                        That’s what they all say. <br />
                        Stop reading if you feel a breath that isn’t yours.{" "}
                        <br />
                        (But all three of us know you won’t stop and turn
                        around.)
                    </span>
                </div>
                <div className="w-50 p-2" id="hero-image">
                    <img
                        src="/home-image.jpg"
                        alt="Eye-catcher"
                        className="w-100"
                    />
                </div>
            </section>
            <Search authors={authors} tags={tags} />
        </div>
    );
}
