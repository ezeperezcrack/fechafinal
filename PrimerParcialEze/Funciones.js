function $$$(id){
    return document.getElementById(id);
}
function $(id){
    return document.getElementById(id).value;
}
function $$(id,string){
    return document.getElementById(id).value = string;
}
function MostrarCarga(id){
    $$$(id).hidden = false;
}
function OcultarCarga(id){
    $$$(id).hidden = true;
}

/****************************Login ***************************************/
var xmlhttp = new XMLHttpRequest();

            var callback = function(){
                console.log("Todavia no llego");
                if(xmlhttp.readyState == 4){
                    if(xmlhttp.status == 200){
                        console.log("Llego la respuesta del servidor");
                        console.log(xmlhttp.response);
                        miObj = JSON.parse(xmlhttp.response);
                        if(miObj.type == "Admin" || miObj.type == "User"){
                            window.location.replace("./index.html"); /*redirecciona a index*/ 
                            localStorage.setItem("email", $("email"));/*guarda email*/ 
                            localStorage.setItem("type", miObj.type);/*guarda el tipo(adm,usr)*/ 
                        }
                        else if(miObj.type == "error"){
                            OcultarCarga("spinner");
                            MostrarCarga("div");
                            MostrarCarga("lbl");
                            $$$("email").className="textConError";
                            $$$("pass").className="textConError";
                        }
                    }
                }  
            }
            
            function PeticionPOST(){ 
                OcultarCarga("div");
                MostrarCarga("spinner");
                var datos = {"email": $("email"), "password": $("pass")};
                xmlhttp.onreadystatechange = callback;
                xmlhttp.open("POST","http://localhost:3000/login",true);
                xmlhttp.setRequestHeader("Content-type","application/json");
                xmlhttp.send(JSON.stringify(datos));
                return;
            }


