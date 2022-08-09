import { environment } from "src/environments/environment";

const URL_BASE = environment.urlBase;

export class Endpoint {
    constructor(public baseUrl: string, public path: string){}
}

export const ENDPOINTS = {
    login: new Endpoint(URL_BASE, "auth/login"),
    register: new Endpoint(URL_BASE, "auth/register"),

    getAllRooms: new Endpoint(URL_BASE, "room/get-all-rooms"),
    addRoom: new Endpoint(URL_BASE, "room/add-room"),

    uploadImages: new Endpoint(URL_BASE, "room/add-images-room"),
    loadImagesFromRoom: new Endpoint(URL_BASE, "room/get-all-images/files/{roomId}"),

    getAllUsers:new Endpoint(URL_BASE,"user/get-all-users")
}