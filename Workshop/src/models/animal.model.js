import { Schema, model } from 'mongoose';
import { types, status } from '../schemas/animals.schema.js';


const animalsSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            minlength: 2,
            maxlength: 30,
        },
        type: {
            type: String,
            required: true,
            enum: types,
        },
        breed: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30,
        },
        age: {
            type: Number,
            required: true,
            min: 1,
            max: 25,
        },
        status: {
            type: String,
            required: true,
            enum: status,
        },
        description: {
            type: String,
            minlength: 2,
        },

    },
    {
        timestamps: true,
    }
);

const Animal = model('animal', animalsSchema);

export default Animal;
