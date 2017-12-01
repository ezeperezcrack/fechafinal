///<reference path="./node_modules/@types/jquery/index.d.ts"/>
$(document).ready(function () {
    PeticionGET();
    OcultarCarga("#form1");
    OcultarCarga("#modif");
    
    MakeActive("#mostrar");
});

var xmlhttp = new XMLHttpRequest();     
var callback3 = function(){
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status == 200)
        {
            console.log("Llego la respuesta del servidor");
            $("#cuerpo").html("<tr></tr>");
            var i;
            var ListaEmpleados = JSON.parse(xmlhttp.response);
            localStorage.setItem("listaPersona",xmlhttp.response);
            var cuerpo = $("#cuerpo").html();
            for (i = 0; i < ListaEmpleados.length; i++) {
                cuerpo = cuerpo + "<tr><td>" + ListaEmpleados[i].nombre + "</td><td>" + ListaEmpleados[i].apellido + "</td><td><button id='borrar' onclick='eliminarPersona(" + i + ")' >Borrar</button><button id='modificar' onclick='MostrarCarga(form1), MakeInactive(mostrar), MakeActive(agregar),modificarPersona(" + i + "), MostrarCarga(modif), OcultarCarga(cargar)' >Modificar</button></td></tr>";
            }
            $("#cuerpo").html(cuerpo);
            OcultarCarga("#spinner");
            MostrarCarga("#tabla");
        }
    }
    
}

function PeticionGET(){
    xmlhttp.onreadystatechange = callback3;
    xmlhttp.open("GET","http://localhost:3000/traerpersonas",true);
    xmlhttp.send();
    return;
}



var callback2 = function(){
  
    if(xmlhttp.readyState == 4){
          if(xmlhttp.status == 200){
            console.log("Llego la respuesta del servidor");
            console.log(xmlhttp.response);
            }
    }  
}

function PeticionPOST2(){
    var nombre = $("#nom").val();
    var apellido = $("#ape").val();
    var data = 'nombre=' + encodeURIComponent(nombre) + '&apellido=' + encodeURIComponent(apellido); 
    xmlhttp.onreadystatechange = callback2;
    xmlhttp.open("POST","http://localhost:3000/agregarpersona",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(data);
    return;
}

function eliminarPersona(indice) {
    
        var data = 'indice=' + encodeURIComponent(indice); 
        xmlhttp.onreadystatechange = callback2;
        xmlhttp.open("POST","http://localhost:3000/eliminarpersona",true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send(data);
    PeticionGET();
}

function modificarPersona(i) {
var ListaEmpleados = JSON.parse(localStorage.getItem("listaPersona"));
$("#nom").val(ListaEmpleados[i].nombre);
$("#ape").val(ListaEmpleados[i].apellido);
localStorage.setItem("indice", i);
}

function Guardar() {
    MostrarCarga("#spinner");
    PeticionPOST2();
    PeticionGET();
    $("#form1")[0].reset();
}
function MostrarCarga(id) {
    $(id).show();
}
function OcultarCarga(id) {
    $(id).hide();
}
function MakeActive(id) {
    $(id).addClass("active");
}
function MakeInactive(id) {
    $(id).removeClass("active");
}
function MakeWrong(id) {
    $(id).addClass("textConError");
}
function MakeRight(id) {
    $(id).removeClass("textConError");
}
function Modif() {
    var indice = localStorage.getItem("indice");
    var persona = {};
    persona.nombre = $("#nom").val();
    persona.apellido = $("#ape").val();
    var data = 'indice=' + encodeURIComponent(indice) + '&persona=' + encodeURIComponent(JSON.stringify(persona));     
    xmlhttp.onreadystatechange = callback2;
    xmlhttp.open("POST","http://localhost:3000/modificarpersona",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(data);
    PeticionGET();
    $("#form1")[0].reset();
}
