import "reflect-metadata"
import { Container } from "inversify";
import UserModel from "./models/user.model";
import { TYPES } from "./constants/type";
import  UserService from "./services/user.service";
import mongoose from "mongoose";
import IUser from "./interfaces/user.interface";
import aeiouModel from "./models/aeiou.model";
import { IAeiou } from "./interfaces/aeiou.interface";
import AeiouService  from "./services/aeiou.service";
import { AuthenticateMiddlerWare } from "./middlerware/auth.middleware";
import Project from "./models/project.model";
import { Iproject } from "./interfaces/projectdetails.interface";
import  ProjectService  from "./services/project.service";
import { ProjectAuthenticatorMiddlerWare } from "./middlerware/project.middleware";
import { Iideation } from "./interfaces/ideation.interface";
import ideationModel from "./models/ideation.model";
import { IproductDev } from "@interface/prouduct_dev.interface";
import { IEmpathy } from "@interface/empathy.inteface";
import empathyModel from "@model/empath.model";
import Product_Development from "@model/produc_dev.model";
import { EmapthyService } from "./services/empathy.service";
import IdeationService  from "./services/ideation.service";
import { ProductDevService } from "./services/productDev.service";
import './controller/empathy.controller'
import './controller/productDev.controller'
import './controller/user.controller'
import './controller/aeiou.controller'
import './controller/project.controller'
import './controller/ideation.controller'
const container=new Container();

//MODELS
container.bind<mongoose.Model<IUser>>(TYPES.UserModel).toConstantValue(UserModel);
container.bind<mongoose.Model<IAeiou>>(TYPES.aeiouModel).toConstantValue(aeiouModel)
container.bind<mongoose.Model<Iproject>>(TYPES.projectModel).toConstantValue(Project)
container.bind<mongoose.Model<Iideation>>(TYPES.ideationModel).toConstantValue(ideationModel)
container.bind<mongoose.Model<IproductDev>>(TYPES.productDevModel).toConstantValue(Product_Development)
container.bind<mongoose.Model<IEmpathy>>(TYPES.empathyModel).toConstantValue(empathyModel)
// SERVICE
container.bind<UserService>(TYPES.UserService).to(UserService)
container.bind<AeiouService>(TYPES.aeiouService).to(AeiouService)
container.bind<ProjectService>(TYPES.prjectservice).to(ProjectService)
container.bind<IdeationService>(TYPES.ideationService).to(IdeationService)
container.bind<ProductDevService>(TYPES.productDevService).to(ProductDevService)
container.bind<EmapthyService>(TYPES.empathyService).to(EmapthyService)
//MIDDLEWARE
container.bind<ProjectAuthenticatorMiddlerWare>(TYPES.projectAuthenticatorMiddlerWare).to(ProjectAuthenticatorMiddlerWare)
container.bind<AuthenticateMiddlerWare>(TYPES.AuthenticationMiddleware).to(AuthenticateMiddlerWare)
export default container;