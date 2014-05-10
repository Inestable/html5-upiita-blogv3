/*abrimos l conexion, io se define cuando importo socket io*/
		var socket = io.connect(location.origin);
		
		$(function(){
		    /*enviar mensaje al servidor*/
		    $("#boton").click(function(){
		        /*obtener los datos que voy a enviar*/
		        var nombreCliente = $("#nombre-usuario").val();
		        var mensajeCliente = $("#mensaje-usuario").val();
		        /* enviar datos al servidor */
		       socket.emit("mensaje_al_servidor",{
		       		nombre: nombreCliente,
		       		mensaje: mensajeCliente
		       });

		    });
		    /*recibir mensaje del servidor*/
		   
		   var mostrar_mensaje = function(nom, mens){	        
		        var caja = "<div class='mensaje'> <span>" + nom + " dice: </span> "+ mens +"</div>";
                $("#mensajes").append(caja);
		   };
		   
		   
		   socket.on("mensaje_al_cliente",function(datosServidor){
		   		var nombre = datosServidor.nombreCliente;
		   		var mensaje = datosServidor.mensajeCliente;
		   		mostrar_mensaje(nombre,mensaje);
		   });
		   /* socket.on("mensaje_al_cliente",function(datosServidor){
		        var nom = datosServidor.nombre;
		        var mens = datosServidor.mensaje;
		        
		        var caja = "<div class='mensaje'> <span>" + nom + " dice: </span> "+ mens +"</div>";
                $("#mensajes").append(caja);
		    }); */           
		});	