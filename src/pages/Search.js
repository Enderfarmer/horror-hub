import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ref, onValue, query, limitToFirst, get } from "firebase/database";
import db from "../db";
import "../styles/Stories.css";
import "../styles/Search.css";
import SearchBar from "../components/SearchBar.js";

export default function Search() {
    const queryParam = useLocation().search.split("=")[1] || "";
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    const [results, setResults] = useState([]);
    const [timesLoadMore, setTimesLoadMore] = useState(0);
    const [canLoadMore, setCanLoadMore] = useState(false);
    useEffect(() => {
        const authorsRef = ref(db, "authors");
        const tagsRef = ref(db, "tags");
        const storiesRef = ref(db, "stories");
        const pageQuery = query(
            storiesRef,
            limitToFirst(10 * (timesLoadMore + 1))
        );
        get(pageQuery).then((snapshot) => {
            const data = Object.entries(snapshot.val() || {}).map(
                ([id, val]) => ({ id, ...val })
            );
            const filtered = data.filter((val) => {
                const query = queryParam.toLowerCase();

                const matchAuthor = (val.author || "")
                    .toLowerCase()
                    .includes(query);
                const matchTitle = (val.title || "")
                    .toLowerCase()
                    .includes(query);

                const matchTags =
                    Array.isArray(val.tags) &&
                    val.tags.some(
                        (tag) =>
                            tag.toLowerCase().includes(query) ||
                            tag.toLowerCase().includes(query.slice(1))
                    );

                return matchAuthor || matchTitle || matchTags;
            });
            if (
                filtered.length < 10 &&
                !(timesLoadMore * 10 >= snapshot.size)
            ) {
                setTimesLoadMore((prev) => prev + 1);
            } else {
                setResults(filtered);
                if (!((timesLoadMore + 1) * 10 >= snapshot.size)) {
                    setCanLoadMore(false);
                }
            }
        });

        const unsubTags = onValue(tagsRef, (snapshot) => {
            setTags(Object.values(snapshot.val() || {}));
        });
        const unsubAuthors = onValue(authorsRef, (snapshot) => {
            setAuthors(Object.values(snapshot.val() || {}));
        });

        return () => {
            if (typeof unsubTags === "function") unsubTags();
            if (typeof unsubAuthors === "function") unsubAuthors();
        };
    }, [queryParam, timesLoadMore]);

    return (
        <div>
            <h1>Search</h1>
            <SearchBar authors={authors} tags={tags} />
            <hr />
            {queryParam.length !== 0 && (
                <>
                    <h2>Results for "{queryParam}"</h2>
                    {(
                        <div className="d-flex">
                            {results.map((story, index) => (
                                <div
                                    className="card border-1 border-danger rounded-3 h-50 story-card"
                                    key={index}
                                >
                                    <div className="card-header d-flex justify-content-between align-items-center">
                                        <h5 className="card-title">
                                            <Link to={`/story/${story.id}`}>
                                                {story.title}
                                            </Link>{" "}
                                            {story.author &&
                                                `by ${story.author}`}
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
                                                <Link
                                                    key={`${story.id}-tag${i}`}
                                                    className="m-1"
                                                    to={`/search?q=${tag}`}
                                                >
                                                    #{tag}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}{" "}
                        </div>
                    ) || <p>No results found.</p>}
                    <br />
                    {canLoadMore && (
                        <button
                            className="btn btn-black w-50 m-4"
                            onClick={() => setTimesLoadMore((prev) => prev + 1)}
                        >
                            Load More
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
