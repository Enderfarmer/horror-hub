import { useState } from "react";
import { Link } from "react-router";

export default function Search({ authors, tags }) {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <section>
            <div className="form-group w-50 d-inline-block me-3">
                <input
                    type="search"
                    id="search"
                    list="searchdata"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                    placeholder="Search for content"
                />
            </div>
            <Link
                to={{ pathname: "/search", search: `?q=${searchQuery}` }}
                className="d-inline-block"
            >
                <button className="btn btn-outline-danger p-2">Search</button>
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
