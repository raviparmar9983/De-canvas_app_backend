import { IproductDev } from "@interface/prouduct_dev.interface";
import mongoose, { Document } from "mongoose";

const product_developmentSchema = new mongoose.Schema<IproductDev>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Projects',
        unique: true
    },
    purpose_info: {
        type: [String],
        required: true
    },
    product_expr: {
        type: [String],
        required: true
    },
    customer_revali: {
        type: [String],
        required: true
    },
    product_fun: {
        type: [String],
        required: true
    },
    product_feature: {
        type: [String],
        required: true
    },
    people_info: {
        type: [String],
        required: true
    },
    component_info: {
        type: [String],
        required: true
    },
    reject: {
        type: [String],
        required: true
    }
},{
        timestamps: true
})

const Product_Development = mongoose.model<IproductDev>("Product_Development", product_developmentSchema);
export default Product_Development;