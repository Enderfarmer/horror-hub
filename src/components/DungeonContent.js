import { Link } from "react-router";

export default function DungeonContent({ dungeon, node }) {
    return (
        <div>
            {node ? dungeon.nodes[node].content : dungeon.index.content}
            <br /> Will you:
            {node
                ? dungeon.nodes[node].links?.map((link, index) => (
                      <>
                          <Link
                              to={`/story/${dungeon.id}?node=${link.node}`}
                              key={`node-${index}`}
                          >
                              {link.name}
                          </Link>
                          <br />
                      </>
                  ))
                : dungeon.index.links?.map((link, index) => (
                      <>
                          <Link
                              to={`/story/${dungeon.id}?node=${link.node}`}
                              key={`node-${index}`}
                          >
                              {link.name}
                          </Link>
                          <br />
                      </>
                  ))}
        </div>
    );
}
