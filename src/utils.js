import { DataSnapshot } from "firebase/database";

/**
 * Filtering stories based on tags, author, and title queries.
 * For a search page, just pass the same query for all three parameters.
 * @param {DataSnapshot} snapshot The snapshot of stories from Firebase RTDB
 * @param {string | number} tagsQuery Tags search query
 * @param {string | number} authorQuery Author search query
 * @param {string | number} titleQuery Title search query
 * @returns Filtered array of stories by the specified queries
 */
export function filterStories(snapshot, tagsQuery, authorQuery, titleQuery) {
    tagsQuery = tagsQuery?.toString().toLowerCase();
    authorQuery = authorQuery?.toString().toLowerCase();
    titleQuery = titleQuery?.toString().toLowerCase();
    const data = Object.entries(snapshot.val() || {}).map(([id, val]) => ({
        id,
        ...val,
    }));
    const filtered = data.filter((val) => {
        const matchAuthor = (val.author || "")
            .toLowerCase()
            .includes(authorQuery);
        const matchTitle = (val.title || "").toLowerCase().includes(titleQuery);

        const matchTags =
            Array.isArray(val.tags) &&
            val.tags.some(
                (tag) =>
                    tag.toLowerCase().includes(tagsQuery) ||
                    (tag.length > 1 && tag.includes(tagsQuery.slice(1)))
            );

        return matchAuthor || matchTitle || matchTags;
    });
    return filtered;
}
