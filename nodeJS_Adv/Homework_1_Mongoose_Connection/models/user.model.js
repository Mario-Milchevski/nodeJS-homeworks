import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 100,
            set: (password) => bcrypt.hashSync(password, 10),
        },
        email: {
            type: String,
            required: true,
            minlength: 11,
            maxlength: 30,
            unique: true

        }

    },
    {
        timestamps: true,
    }
);

const User = model('user', userSchema);

export default User;