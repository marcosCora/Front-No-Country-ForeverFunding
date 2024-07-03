import { Role } from "./Role";

export interface User{
    id : number;
    email : string;
    name : string;
    lastname : string;
    password : string;
    photo : string;
    rrs_fb : string;
    rrs_ig : string;
    place : string;
    role : Role;  
}

