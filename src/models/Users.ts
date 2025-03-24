import mongoose, {Schema} from "mongoose";

//Define la interface para el user, asegurando
//el tipado en TypeScript
interface IUser {
    name: string;
    email: string;
    password: string;
    username: string
}

const userSchema = new Schema<IUser>({
    name: {
        type: String, 
        required: true,
        trim: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String, 
        required: true,
    },
    username: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
});

const User = mongoose.model("User", userSchema);

export default User;