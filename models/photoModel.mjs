import mongoose from "mongoose";
const {Schema} = mongoose.Schema;
const photoSchema = new mongoose.Schema({
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
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    url:{
        type:String,
        required:true
    },
    image_id:{
        type:String
    }
    //_id: mongoose.Schema.Types.ObjectId,


});

    
const Photo = mongoose.model("Photo",photoSchema);
export default Photo;
