import mongoose from "mongoose";
const {Schema} = mongoose.Schema;
const photoSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    uploadeAt:{
      type:Date,
      default:Date.now
    }

});

const Photo = mongoose.model("Photo",photoSchema);
export default Photo;
