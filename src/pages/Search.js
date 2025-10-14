import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    ref,
    onValue,
    query,
    limitToFirst,
    orderByChild,
} from "firebase/database";
import db from "../db";

export default function Search() {
    const searchParams = new URLSearchParams(useLocation().search);
    const queryParam = searchParams.get("q") || "";
    const [searchQuery, setSearchQuery] = useState(queryParam);
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    const [results, setResults] = useState([]);
    useEffect(() => {
        const authorsRef = ref(db, "authors");
        const tagsRef = ref(db, "tags");
        const storiesRef = ref(db, "stories");
        const dungeonsRef = ref(db, "dungeons");
        onValue(
            query(storiesRef, orderByChild("likes"), limitToFirst(40)),
            (snapshot) => {
                const data = Object.entries(snapshot.val() || {}).map(
                    ([id, val]) => ({
                        id,
                        ...val,
                    })
                );

                const filtered = data.filter(
                    (val) =>
                        val.author
                            ?.toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                        val.tags
                            ?.toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                        val.title
                            ?.toLowerCase()
                            .includes(searchQuery.toLowerCase())
                );

                // Only update if there's something new
                if (filtered.length > 0) {
                    setResults((prev) => {
                        // prevent duplicates by filtering unique IDs
                        const all = [...prev, ...filtered];
                        const unique = all.filter(
                            (v, i, self) =>
                                i === self.findIndex((t) => t.id === v.id)
                        );
                        return unique;
                    });
                }
            }
        );
        onValue(
            query(dungeonsRef, orderByChild("likes"), limitToFirst(40)),
            (snapshot) => {
                const data = Object.entries(snapshot.val() || {}).map(
                    ([id, val]) => ({
                        id,
                        ...val,
                    })
                );

                const filtered = data.filter(
                    (val) =>
                        val.author
                            ?.toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                        val.tags
                            ?.toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                        val.title
                            ?.toLowerCase()
                            .includes(searchQuery.toLowerCase())
                );

                // ✅ Only update if there's something new
                if (filtered.length > 0) {
                    setResults((prev) => {
                        // prevent duplicates by filtering unique IDs
                        const all = [...prev, ...filtered];
                        const unique = all.filter(
                            (v, i, self) =>
                                i === self.findIndex((t) => t.id === v.id)
                        );
                        return unique;
                    });
                }
            }
        );
        onValue(tagsRef, (snapshot) => {
            setTags(Object.values(snapshot.val() || {}));
        });
        onValue(authorsRef, (snapshot) => {
            setAuthors(Object.values(snapshot.val() || {}));
        });
    }, [searchQuery]);
    return (
        <div>
            <h1>Search</h1>
            <Search authors={authors} tags={tags} />
            <hr />
            <h2>Results for "{queryParam}"</h2>
            {results.map((result, index) => (
                <div key={index} className="mb-3">
                    <h3>
                        <Link
                            to={
                                result.type === "story"
                                    ? "/stories/"
                                    : "/dungeons/" + result.id
                            }
                        >
                            {result.title}
                        </Link>
                    </h3>
                    <p>{result.description}</p>
                </div>
            )) || <p>No results found.</p>}
        </div>
    );
}
