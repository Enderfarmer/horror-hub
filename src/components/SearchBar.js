import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SearchBar({ authors, tags }) {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState(
        useLocation().search.split("=")[1]
    );
    useEffect(
        () => setSearchQuery(location.search.split("=")[1]),
        [location.search]
    );
    return (
        <section className="d-flex">
            <div className="form-group w-100 d-inline-block">
                <input
                    type="search"
                    id="search-bar"
                    list="searchdata"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                    className="form-control p-2"
                    placeholder="Search for content"
                    onKeyDown={(e) =>
                        e.key === "Enter" &&
                        document.getElementById("search-link").click()
                    }
                />
            </div>
            <Link
                to={{ pathname: "/search", search: `?q=${searchQuery}` }}
                id="search-link"
                className="d-inline-block"
            >
                <button className="btn btn-outline-danger p-2" id="search-btn">
                    Search
                </button>
            </Link>
            <datalist id="searchdata">
                {tags.map((tag, index) => (
                    <option key={index} value={tag}>
                        {tag}
                    </option>
                ))}
                {authors.map((author, index) => (
                    <option key={index} value={author}>
                        {author}
                    </option>
                ))}
            </datalist>
        </section>
    );
}
