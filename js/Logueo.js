


function logueo(userid,passid){
    
   var conn = firebase.database().ref().child("usuarios");

   var user = document.getElementById(userid).value;
   var pass = document.getElementById(passid).value;

   conn.once("value", function(snap){
       var result = snap.val();
       for(var dato in result){
           if(result[dato].cuentaUsu == user){
               if(result[dato].contraUsu== pass){
               
                window.location = "dashboard.html";
                alert("Usuario correcto, Bienvenido"); 
               }else{
                   alert("Contraseña incorrecta");
                window.location = "index.html";
               }
           }else{
               alert("El usuario no existente");
            window.location = "index.html";
           }
       }
   });

}