import { get, query, ref, limitToFirst } from "firebase/database";
import { useEffect, useState } from "react";
import db, { auth } from "../db";
import { filterStories } from "../utils";
import { useNavigate } from "react-router";

export default function Random() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchAndSelect() {
            const storyRef = ref(db, "stories");
            const statsRef = auth.currentUser
                ? ref(db, `stats/${auth.currentUser.uid}/preftags`)
                : null;

            // get base stories
            const snapshot = await get(query(storyRef, limitToFirst(40)));
            let storyList = Object.entries(snapshot.val() || {}).map(
                ([id, val]) => ({ id, ...val })
            );

            // 40% chance to use preference tags
            if (statsRef && Math.random() < 0.4) {
                const statsSnapshot = await get(statsRef);
                const preftags = Object.values(statsSnapshot.val() || {});
                let byTag = [];

                if (preftags.length > 0) {
                    for (const tag of preftags) {
                        const results = filterStories(
                            snapshot,
                            tag.toLowerCase(),
                            "",
                            ""
                        );
                        byTag = byTag.concat(results);
                    }
                }

                if (byTag.length > 5) {
                    storyList = byTag;
                }
            }

            if (storyList.length > 0) {
                const randomStory =
                    storyList[Math.floor(Math.random() * storyList.length)];
                setData(randomStory);
            } else {
                setData(null);
            }
        }

        fetchAndSelect();
    }, []);

    useEffect(() => {
        if (data) {
            navigate(`/story/${data.id}`);
        }
    }, [data, navigate]);

    return (
        <div className="container">
            <h1>Random Story</h1>
            Loading...
        </div>
    );
}
