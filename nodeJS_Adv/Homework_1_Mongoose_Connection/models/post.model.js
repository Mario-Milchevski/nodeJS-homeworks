import { Schema, model } from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            minlength: 3,
            maxlength: 30,
        },
        content: {
            type: String,
            required: [true, 'Content required'],
            minlength: 3,
            maxlength: 30,
        },

    },
    {
        timestamps: true,
    }
);

const Post = model('post', postSchema);

export default Post;