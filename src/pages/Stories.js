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
            setStories(
                Object.entries(snapshot.val() || {}).map(([id, data]) => ({
                    id,
                    ...data,
                }))
            );
            setLoading(false);
        });
    }, []);
    if (loading) return <div className="spinner-border"></div>;

    return (
        <div className="container">
            <h1 className="mt-5 text-red fw-bold">Horror stories</h1>
            <hr />
            <div className="d-flex">
                {stories.length ? (
                    stories.map((story, index) => (
                        <div
                            className="card border-1 border-danger rounded-3 h-50 story-card"
                            key={index}
                        >
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="card-title">
                                    <Link to={`/story/${story.id}`}>
                                        {story.title}
                                    </Link>{" "}
                                    {story.author && `by ${story.author}`}
                                </h5>
                                <Link to={`/story/${story.id}`}>
                                    <img
                                        src="/arrow-right.svg"
                                        alt="Go to story"
                                    />
                                </Link>
                            </div>
                            <div className="card-body d-flex flex-column justify-content-between">
                                <span className="card-subtitle mb-2">
                                    {story.description}
                                </span>{" "}
                                <br />
                                <div className="w-75 text-info">
                                    {story.tags?.map((tag, i) => (
                                        <span
                                            key={`${story.id}-tag${i}`}
                                            className="m-1"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
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
