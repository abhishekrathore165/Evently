import { Document, model, models, Schema } from "mongoose";

export interface ICategory extends Document{
    id:string;
    name:string;

}

const categorySchema = new Schema({
    name:{type:String,required:true,unique:true}
})

const Category = models.Category || model('Category',categorySchema);

export default Category