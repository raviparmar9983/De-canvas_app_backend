import "reflect-metadata"
import { Container } from "inversify";
import UserModel from "./models/user.model";
import { TYPES } from "./constants/type";
import { UserService } from "./services/user.service";
import mongoose from "mongoose";
import IUser from "./interfaces/user.interface";
import aeiouModel from "./models/aeiou.model";
import { IAeiou } from "./interfaces/aeiou.interface";
import { AeiouService } from "./services/aeiou.service";
import { AuthenticateMiddlerWare } from "./middlerware/auth.middleware";
import Project from "./models/project.model";
import { Iproject } from "./interfaces/projectdetails.interface";
import { ProjectService } from "./services/project.service";
import './controller/user.controller'
import './controller/aeiou.controller'
import './controller/project.controller'
import { ProjectAuthenticatorMiddlerWare } from "./middlerware/project.middleware";

const container=new Container();

container.bind<mongoose.Model<IUser>>(TYPES.UserModel).toConstantValue(UserModel);
container.bind<UserService>(TYPES.UserService).to(UserService)
container.bind<mongoose.Model<IAeiou>>(TYPES.aeiouModel).toConstantValue(aeiouModel)
container.bind<AeiouService>(TYPES.aeiouService).to(AeiouService)
container.bind<AuthenticateMiddlerWare>(TYPES.AuthenticationMiddleware).to(AuthenticateMiddlerWare)
container.bind<mongoose.Model<Iproject>>(TYPES.projectModel).toConstantValue(Project)
container.bind<ProjectService>(TYPES.prjectservice).to(ProjectService)
container.bind<ProjectAuthenticatorMiddlerWare>(TYPES.projectAuthenticatorMiddlerWare).to(ProjectAuthenticatorMiddlerWare)

export default container;