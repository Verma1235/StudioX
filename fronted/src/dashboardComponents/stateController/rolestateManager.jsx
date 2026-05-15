import {useState,useEffect} from "react";


class stateRoleController{

    constructor(status,setStatus,initialisation={ role: "" }){
     
        this.status=status;
        this.setStatus=setStatus;

        this.setStatus(initialisation);


    }
}