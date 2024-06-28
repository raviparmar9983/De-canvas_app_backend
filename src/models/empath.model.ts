import { IEmpathy } from "@interface/empathy.inteface";
import mongoose  from "mongoose";

const empathySchema=new mongoose.Schema<IEmpathy>({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true,
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true,
    },
    user:{
        type:[String],
        default:[],
    },
    stackholder:{  
        type:[String],
        default:[],
    },
    activities:{
        type:[String],
        default:[],
    },
    happy1:{
        type:[String],
        default:[],
    },
    sad1:{
        type:[String],
        default:[],
    },
    happy2:{
        type:[String],
        default:[],
    },
    sad2:{
        type:[String],
        default:[],
    }
})

export default mongoose.model<IEmpathy>("Empathy",empathySchema);