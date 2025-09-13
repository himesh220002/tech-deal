import { useState, useEffect } from "react";
import { ThumbsUp, MessageCircle, Trash2 } from "lucide-react";

export default function CommunityPage() {
  const defaultPosts = [
    {
      id: "post-1",
      user: "Amit",
      title: "Got iPhone 15 for ₹65K on Flipkart sale!",
      upvotes: 12,
      comments: 3,
      tag: "Mobile",
    },
    {
      id: "post-2",
      user: "Riya",
      title: "Best Laptop under ₹50K? I recommend ASUS Vivobook.",
      upvotes: 8,
      comments: 5,
      tag: "Laptop",
    },
    {
      id: "post-3",
      user: "Karan",
      title: "Marshall Emberton 2 dropped to ₹12,999 🔥",
      upvotes: 15,
      comments: 2,
      tag: "Audio",
    },
  ];

  // ✅ Initialize from localStorage or fallback to defaults
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("communityPosts");
    return saved ? JSON.parse(saved) : defaultPosts;
  });

  const [newPost, setNewPost] = useState("");
  const [newTag, setNewTag] = useState("General");
  const [username] = useState("You");

  // Track posts the user has upvoted (for toggle)
  const [upvotedPosts, setUpvotedPosts] = useState(() => {
    const saved = localStorage.getItem("upvotedPosts");
    return saved ? JSON.parse(saved) : [];
  });

  // Save posts & upvotes on every change
  useEffect(() => {
    localStorage.setItem("communityPosts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("upvotedPosts", JSON.stringify(upvotedPosts));
  }, [upvotedPosts]);

  const handleUpvote = (id) => {
    if (upvotedPosts.includes(id)) {
      // Remove vote
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes - 1 } : p))
      );
      setUpvotedPosts((prev) => prev.filter((pid) => pid !== id));
    } else {
      // Add vote
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p))
      );
      setUpvotedPosts((prev) => [...prev, id]);
    }
  };

  const handleAddPost = () => {
    if (!newPost.trim()) return;
    const newEntry = {
      id: "post-" + Date.now(),
      user: username,
      title: newPost,
      upvotes: 0,
      comments: 0,
      tag: newTag,
    };
    setPosts((prev) => [newEntry, ...prev]);
    setNewPost("");
    setNewTag("General");
  };

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setUpvotedPosts((prev) => prev.filter((pid) => pid !== id));
  };

  return (
    <div className="p-6 text-gray-200 mx-40">
      <h2 className="text-3xl font-bold mb-6">👥 Community</h2>

      {/* Posts */}
      <div className="flex flex-col gap-4 mb-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-[#1e293b] rounded-xl p-4 shadow flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">
                Posted by {post.user}
              </span>
              <div className="flex items-center gap-2">
                <span className="bg-gray-700 text-xs px-2 py-1 rounded">
                  {post.tag}
                </span>
                {post.user === username && (
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-400 hover:text-red-300"
                    title="Delete post"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <div className="flex gap-6 text-sm text-gray-400">
              <button
                onClick={() => handleUpvote(post.id)}
                className={`flex items-center gap-1 ${
                  upvotedPosts.includes(post.id)
                    ? "text-green-400"
                    : "hover:text-green-400"
                }`}
              >
                <ThumbsUp className="h-4 w-4" /> {post.upvotes}
              </button>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" /> {post.comments} Comments
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Post input at bottom */}
      <div className="bg-[#1e293b] rounded-xl p-4 shadow mt-10">
        <h3 className="text-lg font-semibold mb-2">Share something...</h3>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="w-full min-h-40 p-2 rounded bg-gray-900 text-gray-200 mb-2 outline-none"
          placeholder="What's on your mind?"
        />
        <div className="flex justify-between items-center">
          <select
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="bg-gray-700 px-2 py-1 rounded text-sm"
          >
            <option>General</option>
            <option>Mobile</option>
            <option>Laptop</option>
            <option>Audio</option>
            <option>Deals</option>
          </select>
          <button
            onClick={handleAddPost}
            className="bg-green-600 px-4 py-1 rounded hover:bg-green-500"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
