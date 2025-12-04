import { useState } from "react";
import "../styles/float-label.css";
import $ from "jquery";

export default function NewStory() {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log($("#create-form").serializeArray);
    };
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [nodeToEdit, setNodeToEdit] = useState("index");
    /**
     * @type {[Record<string, {id: string, content: string, links: [{name: string, link: string}]}>, Function]}
     */
    const [nodes, setNodes] = useState({
        index: {
            id: "index",
            content: "Start of the story",
            links: [
                { name: "Option 1", link: "node1" },
                { name: "Option 2", link: "node2" },
            ],
        },
        node1: { id: "node1", content: "You chose option 1", links: [] },
        node2: { id: "node2", content: "You chose option 2", links: [] },
    });
    const [isDungeon, setIsDungeon] = useState(false);
    return (
        <div className="container">
            <div className="w-75 border border-1 border-white rounded-3 mx-auto p-4 mt-4">
                <h2 className="text-center mb-4">Create New Story</h2>
                <form onSubmit={handleSubmit} id="create-form">
                    <div className="form-group form-floating">
                        <input
                            type="text"
                            className="form-control m-3 p-2"
                            id="story-title"
                            onChange={() => setTitle($("#story-title").val())}
                            value={title}
                            required
                        />
                        <label htmlFor="title" className="form-label">
                            Story title
                        </label>
                    </div>
                    <div className="form-group">
                        <select
                            className="form-control m-3 p-2 form-select"
                            onChange={(e) => {
                                setIsDungeon(
                                    !!parseInt($(e.currentTarget).val())
                                );
                            }}
                        >
                            <option value="0">Plain story</option>
                            <option value="1">
                                Dungeon (story with choices)
                            </option>
                        </select>
                    </div>
                    {isDungeon ? (
                        <>
                            <div className="form-group m-3 p-2">
                                <h3>Select node to edit: </h3>
                                {Object.values(nodes).map((node, i) => (
                                    <div>
                                        <input
                                            type="radio"
                                            checked={node.id === nodeToEdit}
                                            name="edit-node"
                                            className="form-check-input m-2 p-1"
                                            onChange={() =>
                                                setNodeToEdit(node.id)
                                            }
                                            id={`node-${i}`}
                                        />
                                        <label
                                            htmlFor={`node-${i}`}
                                            className="m-1"
                                        >
                                            {" "}
                                            {node.id}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="form-group form-floating">
                                <input
                                    type="text"
                                    className="form-control m-3 p-2"
                                    id="dungeon-title"
                                    onChange={() => {
                                        const newContent =
                                            $("#dungeon-title").val();

                                        setNodes((prev) => ({
                                            ...prev,
                                            [nodeToEdit]: {
                                                ...prev[nodeToEdit],
                                                id: newContent,
                                            },
                                        }));
                                    }}
                                    value={nodes[nodeToEdit].id}
                                    required
                                />
                                <label htmlFor="title" className="form-label">
                                    Story title
                                </label>
                            </div>
                            <div className="form-group form-floating m-3 p-2">
                                <textarea
                                    id="editordungeon"
                                    className="form-control"
                                    onChange={(e) => {
                                        let node = nodes[nodeToEdit];
                                        node.content =
                                            $("#editordungeon").val();
                                        setNodes((value) => {
                                            value[nodeToEdit] = node;
                                            return value;
                                        });
                                    }}
                                    value={nodes[nodeToEdit].content}
                                ></textarea>
                                <label htmlFor="editordungeon">
                                    Edit content
                                </label>
                            </div>
                            <h4>Links to other nodes</h4>
                            {nodes[nodeToEdit].links.map((link, i) => (
                                <>
                                    <div
                                        className="form-group form-floating"
                                        key={`link-${i}-name`}
                                    >
                                        <input
                                            type="text"
                                            className="form-control m-3 p-2"
                                            id={`link-${i}-name`}
                                            onChange={(e) =>
                                                setNodes((prev) => {
                                                    let updatedLinks =
                                                        nodes[nodeToEdit].links;
                                                    updatedLinks[i].name = $(
                                                        `#link-${i}-name`
                                                    ).val();
                                                    return {
                                                        ...prev,
                                                        [nodeToEdit]: {
                                                            ...prev[nodeToEdit],
                                                            links: updatedLinks,
                                                        },
                                                    };
                                                })
                                            }
                                            value={link.name}
                                            required
                                        />
                                        <label
                                            htmlFor="title"
                                            className="form-label"
                                        >
                                            Link {i + 1} title
                                        </label>
                                    </div>
                                    <div
                                        className="form-group form-floating"
                                        key={`link-${i}-href`}
                                    >
                                        <input
                                            type="text"
                                            className="form-control m-3 p-2"
                                            id={`link-${i}-href`}
                                            onChange={(e) =>
                                                setNodes((prev) => {
                                                    let updatedLinks =
                                                        nodes[nodeToEdit].links;
                                                    updatedLinks[i].link = $(
                                                        `#link-${i}-href`
                                                    ).val();
                                                    return {
                                                        ...prev,
                                                        [nodeToEdit]: {
                                                            ...prev[nodeToEdit],
                                                            links: updatedLinks,
                                                        },
                                                    };
                                                })
                                            }
                                            value={link.link}
                                            required
                                        />
                                        <label
                                            htmlFor="title"
                                            className="form-label"
                                        >
                                            Link {i + 1} target node ID
                                        </label>
                                    </div>
                                </>
                            ))}
                        </>
                    ) : (
                        <div className="form-group form-floating m-3 p-2">
                            <textarea
                                id="editorstory"
                                value={content}
                                onChange={(e) => {
                                    setContent($("#editorstory").val());
                                }}
                                className="form-control"
                            ></textarea>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="btn btn-primary p-2 m-3 w-50"
                    >
                        Create Story
                    </button>
                </form>
            </div>
        </div>
    );
}
