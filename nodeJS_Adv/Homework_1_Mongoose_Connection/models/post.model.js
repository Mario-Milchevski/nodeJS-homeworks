import { Schema, model } from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30,
        },
        content: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        likes: {
            type: [Schema.Types.ObjectId],
        }

    },
    {
        timestamps: true,
    }
);

const Post = model('post', postSchema);

export default Post;