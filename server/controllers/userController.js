import { GenerateSecretToken } from "../middlewares/index.js";
import { UserModel } from "../models/User.js";

export const registerUser = async (req,res)=>{
    console.log(req.body)
    const { name, email, password} = req.body;
    try{
        if(!name || !email || !password){
            return res.status(400).send({ message: "fields can not be empty!" });
            // throw "fill all the fields"
        }
        const findUser = UserModel.findOne({ email: email});
        if(findUser){
            return res.send( "user already exits")
        }
        const user = new UserModel({name,email,password})
        const _user = await user.save();
        console.log(_user,"user")
        if(!_user) {
            return res.status(404).send({message:'failed'});
        }
        return res.status(200).send(_user);
    }catch(e){
        return res.send(e);
    }
    
}

export const loginUser = async (req,res)=>{
    // console.log(req.body)
    const {email,password} = req.body;
    try{
        const existingUser = await UserModel.findOne({email: email});
        if(existingUser===null){
            throw 'user does not exist'
        }
        console.log(existingUser.id,"user")
        if(existingUser.password===password){
            
            const token = await GenerateSecretToken({id:existingUser.id});
            return res.status(200).send({data:{id:existingUser.id,token},message:'success'})
        }else{
            return res.status(401).send({message:"please check you password"})
        }

    }catch(e){
        return res.send(e);
    }
}


export const getUsers = async ( req,res)=>{
    try{
        const users = await UserModel.find({})
        return res.send(users)
    }catch(e){
        return res.send(e);
    }
}


export const getUsersById = async ( req,res)=>{
    const id = req.params.id;
    console.log(id,"id")
    try{
        const user = await UserModel.findById(id);
        if(!user){
            return res.status(404).send({ message: "Not found user with id " + id });
        }
        return res.send(user)
    }catch(e){
        return console.log(e);
    }
}

export const updateUser = async(req,res)=>{
    const id = req.params.id;
    console.log(id,"update user")
    try{
        const {name,email,password} = req.body;
        const findUser = await UserModel.findById(id);
        if(!findUser){
            return res.status(404).send({ message: "Not found user with id " + id });
        }
        const update = await UserModel.findByIdAndUpdate(id,{name:name,email:email,password:password})
        return res.send({ message: "user was updated successfully" });
    }catch(e){
        console.log(e);
    }
}

export const deleteUser = async(req,res)=>{
    const id = req.params.id;
    try{
        const findUser = await UserModel.findById(id);
        if(!findUser){
            throw "user with id does not exist"
        }
        const update = await UserModel.findByIdAndDelete(id)
        return res.send("deleted successfully");
    }catch(e){
        console.log(e);
    }
}