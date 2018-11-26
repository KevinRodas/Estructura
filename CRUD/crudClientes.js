// Para volver reactiva nuestra página
window.onload = inicializarPagina;

//Variables globales
var formularioDatos;
var refeClientes;
var ref_idCliente2;
var tablaMostrar;
var CREATE = "Agregar cliente";
var UPDATE = "Actualizar cliente";
var CAMBIO = CREATE;

function inicializarPagina(){
  formularioDatos = document.getElementById('formDatos');
  formularioDatos.addEventListener("submit", enviarDatos, false);

  tablaMostrar = document.getElementById("tablaFB");

  refeClientes = firebase.database().ref().child("clientes");
  mostrarTabla();
}

function enviarDatos(event){
  event.preventDefault();
  switch (CAMBIO) {
    case CREATE:
    
      if (formularioDatos != "") {
        if ($.isNumeric($("#nameCliente").val())==true) {
          swal(
            'Error!',
            'ingreso solo de letras!',
            'error'
          );
        }
        else{
          refeClientes.push({
            nameCliente: event.target.nameCliente.value,
            teleCliente: event.target.teleCliente.value,
            direcCliente: event.target.direcCliente.value,
            emailCliente: event.target.emailCliente.value,
            duiCliente: event.target.duiCliente.value
          });

          swal(
            'Éxito!',
            'Cliente insertado con éxito!',
            'success'
          );
        }
      }else {
          swal(
            'Error!',
            'El cliente no fue insertado con éxito!',
            'danger'
          );
      }
      break;
    case UPDATE:
      ref_idCliente2.update({
            nameCliente: event.target.nameCliente.value,
            teleCliente: event.target.teleCliente.value,
            direcCliente: event.target.direcCliente.value,
            emailCliente: event.target.emailCliente.value,
            duiCliente: event.target.duiCliente.value
      });
      document.getElementById('btnAdd').value = CREATE;
      CAMBIO = CREATE;

      swal(
        'Éxito!',
        'Cliente actualizado con éxito!',
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
                          "<td>"+ datosArray[documento].nameCliente +"</td>"+
                          "<td>"+ datosArray[documento].teleCliente +"</td>"+
                          "<td>"+ datosArray[documento].emailCliente +"</td>"+
                          "<td>"+ datosArray[documento].duiCliente +"</td>"+
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
      document.getElementById('nameCliente').value = datosSnap.nameCliente;
      document.getElementById('teleCliente').value = datosSnap.teleCliente;
      document.getElementById('direcCliente').value = datosSnap.direcCliente;
      document.getElementById('emailCliente').value = datosSnap.emailCliente;
      document.getElementById('duiCliente').value = datosSnap.duiCliente;
  });
  document.getElementById('btnAdd').value = UPDATE;
  CAMBIO = UPDATE;
}
