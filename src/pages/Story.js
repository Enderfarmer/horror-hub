import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import db from "../db";
import "../styles/Stories.css";
import { useParams } from "react-router";
import StoryContent from "../components/StoryContent";
import DungeonContent from "../components/DungeonContent";

export default function Story() {
    const [story, setStory] = useState({});
    const [loading, setLoading] = useState(true);
    const storyId = useParams().id;
    const node = new URLSearchParams(window.location.search).get("node");
    useEffect(() => {
        const storiesRef = ref(db, `stories/${storyId}`);
        onValue(storiesRef, (snapshot) => {
            setStory({ id: storyId, ...snapshot.val() });
            setLoading(false);
        });
    }, [storyId]);
    console.log(story);
    if (loading) return <div className="spinner-border"></div>;
    return (
        <div className="container">
            <h1 className="text-center mt-5">{story.title}</h1>
            <hr />
            <div className="d-flex flex-wrap flex-column story-content">
                {story.type === "dungeon" ? (
                    <DungeonContent dungeon={story} node={node} />
                ) : (
                    <StoryContent story={story} />
                )}
            </div>
        </div>
    );
}
