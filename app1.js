// Initialize Cloud Firestore through Firebase
rules_version = '2';
firebase.initializeApp({
    apiKey: "AIzaSyD4HcMMSpMNjl4YWJ5AZVUFnHc6Ge5y_QI",
    authDomain: "examenunidad2-5dcc5.firebaseapp.com",
    projectId: "examenunidad2-5dcc5",
  });
  
  var db = firebase.firestore();

//Codigo para agregar registros a mi colección
     function agregar(){
      //var id = document.getElementById('id').value;
      var nombre = document.getElementById('nombre').value;
      var apellidos = document.getElementById('apellidos').value;
      var curp = document.getElementById('curp').value;
      var edad = document.getElementById('edad').value;
      var direccion = document.getElementById('direccion').value;
      var municipio = document.getElementById('municipio').value;

      console.log(nombre, apellidos, curp, edad, direccion, municipio);
        db.collection("users").add({
        name: nombre,
        last: apellidos,
        cur: curp,
        age: edad,
        direction: direccion,
        mun: municipio,
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('nombre').value = '';
            document.getElementById('apellidos').value = '';
            document.getElementById('curp').value = '';
            document.getElementById('edad').value = '';
            document.getElementById('direccion').value = '';
            document.getElementById('municipio').value = '';
             clic();
             
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
  }

//Codigo para Leer o Mostrar registros de mi colección
//Leer el id de la tabla
var tabla = document.getElementById('tabla');

   db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = ''; //Limpiar mi tabla
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().last}`);
      tabla.innerHTML +=`
      <tr>
          <th "row">${doc.id}</th>
          <td>${doc.data().name}</td>
          <td>${doc.data().last}</td>
          <td>${doc.data().cur}</td>
          <td>${doc.data().age}</td>
          <td>${doc.data().direction}</td>
          <td>${doc.data().mun}</td>
          <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')"><i class="fas fa-trash"></i></button></td> 
          <td><button class="btn btn-primary" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().last}', '${doc.data().cur}','${doc.data().age}','${doc.data().direction}','${doc.data().mun}')"><i class="fas fa-edit"></i></button></td>
    </tr> 
    `
      });
  });


  //Funcion para Borrar documento
  function eliminar(id){
      db.collection("users").doc(id).delete().then(() => {
          console.log("Document successfully deleted!");
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });
  }

  //Funcion para editar Documento
  function editar(id, nombre, apellidos, curp, edad, direccion, municipio){
      console.log(id);
      var nombre = document.getElementById('nombre').value = nombre;
      var apellidos = document.getElementById('apellidos').value = apellidos;
      var curp = document.getElementById('curp').value = curp;
      var edad = document.getElementById('edad').value = edad;
      var direccion = document.getElementById('direccion').value = direccion;
      var municipio = document.getElementById('municipio').value = municipio;
      var boton = document.getElementById('boton');
      boton.innerHTML = 'Editar';

      boton.onclick = function(){
          var washingtonRef = db.collection("users").doc(id);

          var nombre = document.getElementById('nombre').value;
          var apellidos = document.getElementById('apellidos').value;
          var curp = document.getElementById('curp').value;
          var edad = document.getElementById('edad').value;
          var direccion = document.getElementById('direccion').value;
          var municipio = document.getElementById('municipio').value;

          // Set the "capital" field of the city 'DC'
          return washingtonRef.update({
              name: nombre,
              last: apellidos,
              cur: curp,
              age: edad,
              direction: direccion,
              mun: municipio
            })
          .then(() => {
              console.log("Document successfully updated!");
              boton.innerHTML = 'Guardar';
              window.location.reload();
              /*document.getElementById('nombre').value = '';
              document.getElementById('apellido').value = '';
              document.getElementById('año').value = '';*/
          })
          .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
          });
      }
  }

  function clic(){
    var clic = document.getElementById('clic');
    mostrar.innerHTML = `
    <br/>
    <button class="btn btn-danger" onclick="location='index.html'">Cerrar Sesion</button>`
  }
 
