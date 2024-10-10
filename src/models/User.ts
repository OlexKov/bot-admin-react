export interface User {
    id:number,
    name:string,
    surname:string,
    email:string,
    roles:string | string[],
    exp:number,
    iss:number,
    phone?: string;
    image?: string;

}