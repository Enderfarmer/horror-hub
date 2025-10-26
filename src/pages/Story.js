import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import db from "../db";
import "../styles/Stories.css";
import { useParams } from "react-router";

export default function Story() {
    const [story, setStory] = useState({});
    const [loading, setLoading] = useState(true);
    const storyId = useParams().id;
    useEffect(() => {
        const storiesRef = ref(db, `stories/${storyId}`);
        onValue(storiesRef, (snapshot) => {
            setStory(snapshot.val());
            setLoading(false);
        });
    }, []);
    console.log(story);
    if (loading) return <div className="spinner-border"></div>;
    return (
        <div className="container">
            <h1 className="text-center mt-5">{story.title}</h1>
            <hr />
            <div className="d-flex flex-wrap flex-column story-content">
                {story.content}
            </div>
        </div>
    );
}
