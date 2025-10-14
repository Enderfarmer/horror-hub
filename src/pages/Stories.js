import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import db from "../db";
import "../styles/Stories.css";
import { Link } from "react-router";

export default function Stories() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const storiesRef = ref(db, "stories");
        onValue(storiesRef, (snapshot) => {
            setStories(Object.values(snapshot.val() || {}));
            setLoading(false);
        });
    }, []);
    if (loading) return <div className="spinner-border"></div>;
    return (
        <div className="container">
            <h1 className="text-center mt-5">Whispers</h1>
            <hr />
            <div className="d-flex flex-wrap flex-column">
                {stories.length ? (
                    stories.map((story, index) => (
                        <div
                            className="card border-1 border-danger rounded-3 h-50 story-card"
                            key={index}
                        >
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="card-title">
                                    <Link to={`/stories/${story.id}`}>
                                        {story.title}
                                    </Link>{" "}
                                    {story.author && `by ${story.author}`}
                                </h5>
                                <Link to={`/stories/${story.id}`}>
                                    <img
                                        src="/arrow-right.svg"
                                        alt="Go to story"
                                    />
                                </Link>
                            </div>
                            <div className="card-body">
                                <h6 className="card-subtitle mb-2 text-muted">
                                    {story.description}
                                </h6>
                                <p className="card-text">{story.content}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">Everything forgotten.</p>
                )}
            </div>
        </div>
    );
}
