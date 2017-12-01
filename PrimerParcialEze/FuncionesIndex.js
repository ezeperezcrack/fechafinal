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

/**************************************Index *********************************/
var xmlhttp = new XMLHttpRequest()     
var callback2 = function(){
    MostrarCarga("spinner");
    OcultarCarga("cuerpo");
    console.log("Todavia no llego");
    if(xmlhttp.readyState == 4){
        OcultarCarga("spinner");
        MostrarCarga("cuerpo");
        if(xmlhttp.status == 200){
            console.log("Llego la respuesta del servidor");
            post=JSON.parse(xmlhttp.response);
            noticias = JSON.parse(localStorage.getItem("noticiasCargadas"));
            var cuerpo = $$$("cuerpo");
            cuerpo.innerHTML = "<nav><ul>";
            for(i=0;i<noticias.length;i++){
                cuerpo.innerHTML = cuerpo.innerHTML + "<li><a href=#"+noticias[i].tema+">"+noticias[i].tema+"</a></li>";
            }
            cuerpo.innerHTML = cuerpo.innerHTML + "<li><a href=#"+post.tema+">"+post.tema+"</a></li></ul></nav>";
            for(i=0;i<noticias.length;i++){
                cuerpo.innerHTML = cuerpo.innerHTML + "<div class='divNormal'><section id="+noticias[i].tema+"><article><h1 style='color: #CEC9C9;'>"+noticias[i].titulo +"</h1><br><p>"+noticias[i].noticia+"</p><br><p>"+noticias[i].fecha+"</p><br></article></section></div><br>";
            }
            cuerpo.innerHTML = cuerpo.innerHTML + "<div class='divNormal'><section id="+post.tema+"><article><h1 style='color: #CEC9C9;>"+post.titulo +"</h1><br><p>"+post.noticia+"</p><br><p>"+post.fecha+"</p><br></article></section></div><br>";
            
        }
    }  
}

function PeticionPOST2(){
    var datos = {"tema": $("tema"), "titulo": $("titulo"), "noticia": $("parrafo"), "email": Usuario()};
    xmlhttp.onreadystatechange = callback2;
    xmlhttp.open("POST","http://localhost:3000/nuevaNoticia",true);
    xmlhttp.setRequestHeader("Content-type","application/json");
    xmlhttp.send(JSON.stringify(datos));
    OcultarCarga("carga");
    return;
}
function Usuario(){
    return localStorage.getItem("email");
} 

/*********************Cargamos la pagina onload con las noticias levantadas desde el servidor***********************/
window.onload = PeticionGET;
var callback3 = function(){
    console.log("Todavia no llego");
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status == 200)
        {
            console.log("Llego la respuesta del servidor");
            var noticias = JSON.parse(xmlhttp.response)
            localStorage.setItem("noticiasCargadas",xmlhttp.response);
            var cuerpo = $$$("cuerpo");
            cuerpo.innerHTML = "<nav><ul>";
            for(i=0;i<noticias.length;i++){
                cuerpo.innerHTML = cuerpo.innerHTML + "<li><a href=#"+noticias[i].tema+">"+noticias[i].tema+"</a></li>";
            }
            cuerpo.innerHTML = cuerpo.innerHTML + "</ul></nav>";
            for(i=0;i<noticias.length;i++){
                cuerpo.innerHTML = cuerpo.innerHTML + "<div class='divNormal'><button id='borrar' onclick='eliminarNoticia(" + i + ")' >Borrar</button><button id='modificar' onclick='modificarNoticia(" + i + ")' >Modificar</button><section id="+noticias[i].tema+"><article><h1 style='color: #CEC9C9;'>"+noticias[i].titulo +"</h1><br><p>"+noticias[i].noticia+"</p><br><p>"+noticias[i].fecha+"</p><br></article></section></div><br>"
            }
            if(localStorage.getItem("type") == "Admin"){/*traigo el tipo de usuario guardado en el login para verificar si es admin*/
                MostrarCarga("boton");
            }
            
        }
    }
    
}
function PeticionGET(){
    xmlhttp.onreadystatechange = callback3;
    xmlhttp.open("GET","http://localhost:3000/noticias",true);
    xmlhttp.send();
    return;
}