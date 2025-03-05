const PostModel = require("../Modal/PostModel");

exports.createPost = async (req, res) => {
    try {
        const { title, content, author, tags, coverImage } = req.body;

        if (!title || !content || !author || !tags || !coverImage) {
            return res.status(400).json({ message: "Fill All Details" });
        }

        const newPost = new PostModel({
            title,
            content,
            author,
            tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()),  // Ensure tags array
            coverImage
        });

        const savedPost = await newPost.save();

        res.status(201).json({
            message: "Post created successfully 😎",
            post: savedPost
        });

    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
 

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find()
            .populate("author", "username email")  
            .sort({ createdAt: -1 }); 

        res.status(200).json({
            message: "Posts fetched successfully 🥳",
            totalPosts: posts.length,
            posts
        });

    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, tags, coverImage, status } = req.body;

        const updatedData = {
            ...(title && { title }),
            ...(content && { content }),
            ...(tags && { tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()) }),
            ...(coverImage && { coverImage }),
            ...(status && { status })
        };

        const updatedPost = await PostModel.findByIdAndUpdate(id, updatedData, {
            new: true,   
            runValidators: true
        });

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found 😥" });
        }

        res.status(200).json({
            message: "Post updated successfully 😎",
            updatedPost
        });

    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPost = await PostModel.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found 😥" });
        }

        res.status(200).json({
            message: "Post deleted successfully 🗑️",
            deletedPost
        });

    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
