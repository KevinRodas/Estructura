// Para volver reactiva nuestra página
window.onload = inicializarPagina;

//Variables globales
var formularioDatos;
var refeClientes;
var ref_idCliente2;
var tablaMostrar;
var CREATE = "Agregar producto";
var UPDATE = "Actualizar Producto";
var CAMBIO = CREATE;

function inicializarPagina(){
  formularioDatos = document.getElementById('formDatos');
  formularioDatos.addEventListener("submit", enviarDatos, false);

  tablaMostrar = document.getElementById("tablaFB");

  refeClientes = firebase.database().ref().child("productos");
  mostrarTabla();
}

function enviarDatos(event){
  event.preventDefault();
  switch (CAMBIO) {
    case CREATE:


      if (formularioDatos !== "") {
         if($.isNumeric($("#nameP").val())==true){
          swal(
            'Érror!',
            'Ingrese solo letras',
            'success'
            );
        }
          else {
            refeClientes.push({
          codigoP: event.target.codigoP.value,
            nameP: event.target.nameP.value,
            precioP: event.target.precioP.value
          });

          swal(
            'Éxito!',
            'producto insertado con éxito!',
            'success'
          );
      }
      }else {
          swal(
            'Error!',
            'El producto no fue insertado!',
            'danger'
          );
      }
      break;
    case UPDATE:
      ref_idCliente2.update({
    codigoP: event.target.codigoP.value,
            nameP: event.target.nameP.value,
            precioP: event.target.precioP.value
      });
      document.getElementById('btnAdd').value = CREATE;
      CAMBIO = CREATE;

      swal(
        'Éxito!',
        'Cuenta actualizada con éxito!',
        'success'
      );
      break;

  }

  formularioDatos.reset();
}

function mostrarTabla(){
  refeClientes.on("value", function(snap) {
    var datosArray = snap.val();
    var filaDocumento = "";
    for(var documento in datosArray){
      filaDocumento += "<tr>" +
                          "<td>"+ datosArray[documento].codigoP +"</td>"+
                          "<td>"+ datosArray[documento].nameP +"</td>"+
                          "<td>"+ datosArray[documento].precioP +"</td>"+
                         '<td>'+
                              '<button class="btn btn-danger borrarCliente" dataCliente = "'+documento+'">'+
                                '<span class="fa fa-trash"></span>'+
                              '</button>'+
                              '<button class="btn btn-info editarCliente" dataCliente2 = "'+documento+'">'+
                                '<span class="fa fa-edit"></span>'+
                              '</button>'+
                           '</td>'+
                       "</tr>";
    }
    tablaMostrar.innerHTML = filaDocumento;
    if(filaDocumento !== ""){
      var documentosEditar = document.getElementsByClassName('editarCliente');
      for (var i = 0; i < documentosEditar.length; i++) {
        documentosEditar[i].addEventListener("click",editarClientes,false);
      }
      var documentosBorrar = document.getElementsByClassName('borrarCliente');
      for (var i = 0; i < documentosBorrar.length; i++) {
        documentosBorrar[i].addEventListener("click",borrarClientes,false);
      }
    }
  });
}

function borrarClientes() {
    var idCliente = this.getAttribute("dataCliente");
    var ref_idCliente = refeClientes.child(idCliente);
    ref_idCliente.remove();
}

function editarClientes() {
  var idCliente2 = this.getAttribute("dataCliente2");
  ref_idCliente2 = refeClientes.child(idCliente2);
  ref_idCliente2.once("value",function(snap) {
      var datosSnap = snap.val();
       document.getElementById('codigoP').value = datosSnap.codigoP;
      document.getElementById('nameP').value = datosSnap.nameP;
      document.getElementById('precioP').value = datosSnap.precioP;
       /*   document.getElementById('duiCliente').value = datosSnap.duiCliente;*/
  });
  document.getElementById('btnAdd').value = UPDATE;
  CAMBIO = UPDATE;
}
