import { Schema, model } from 'mongoose';

const adoptionsSchema = new Schema(
    {
        adopterName: {
            type: String,
            required: [true, 'Name is required'],
            minlength: 3,
            maxlength: 30,
        },
        email: {
            type: String,
            required: true,
            minlength: 11,
            unique: [true, 'This email already exists'],
        },
        animal:
        {
            type: Schema.Types.ObjectId,
            ref: 'animal',
            required:[true, 'Animal ID required'],
            unique: [true, 'Animal is already adopted'],
        },
        adoptionDate: {
            type: Date,
            default: Date.now
        }

    },
    {
        timestamps: true,
    }
);

const Adoption = model('adoption', adoptionsSchema);

export default Adoption;
