import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 30,
        },
        email: {
            type: String,
            required: true,
            minlength: 11,
            maxlength: 30,
        }

    },
    {
        timestamps: true,
    }
);

const User = model('user', userSchema);

export default User;