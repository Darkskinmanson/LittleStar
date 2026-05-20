function toggleMenu(){
  document.getElementById("menu").classList.toggle("active");
}

// BUSCADOR
function buscar(){
  let texto = document.getElementById("buscador").value;
  localStorage.setItem("busqueda", texto);
  window.location.href = "productos.html";
}

function filtrarProductos(){
  let texto = document.getElementById("buscador").value.toLowerCase();
  let productos = document.querySelectorAll(".producto");

  productos.forEach(p => {
    let nombre = p.innerText.toLowerCase();
    p.style.display = nombre.includes(texto) ? "block" : "none";
  });
}

// PERFIL
function guardarPerfil(){
  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;

  localStorage.setItem("perfil", JSON.stringify({nombre, correo}));
  alert("Guardado ✅");
}

window.onload = function(){
  let datos = JSON.parse(localStorage.getItem("perfil"));
  if(datos){
    document.getElementById("nombre").value = datos.nombre;
    document.getElementById("correo").value = datos.correo;
  }

  if(document.getElementById("carrito")){
    mostrarCarrito();
  }
}

// CARRITO
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardar(){
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarCarrito(nombre, precio, img, desc){
  let p = carrito.find(x => x.nombre === nombre);

  if(p){
    p.cantidad++;
  } else {
    carrito.push({nombre, precio, img, desc, cantidad:1});
  }

  guardar();
  alert("Agregado 🛒");
}

function mostrarCarrito(){
  let cont = document.getElementById("carrito");
  let total = 0;
  cont.innerHTML = "";

  carrito.forEach((p,i)=>{
    let sub = p.precio * p.cantidad;
    total += sub;

    cont.innerHTML += `
    <tr>
      <td>
        <img src="${p.img}" width="50"><br>
        ${p.nombre}<br>
        <small>${p.desc}</small>
      </td>
      <td>$${p.precio}</td>
      <td>
        <button onclick="cambiarCantidad(${i},-1)">-</button>
        ${p.cantidad}
        <button onclick="cambiarCantidad(${i},1)">+</button>
      </td>
      <td>$${sub}</td>
      <td><button onclick="eliminar(${i})">❌</button></td>
    </tr>`;
  });

  document.getElementById("total").innerText = "Total: $" + total;
}

function cambiarCantidad(i,c){
  carrito[i].cantidad += c;
  if(carrito[i].cantidad <= 0) carrito.splice(i,1);
  guardar();
  mostrarCarrito();
}

function eliminar(i){
  carrito.splice(i,1);
  guardar();
  mostrarCarrito();
}

function vaciarCarrito(){
  carrito = [];
  guardar();
  mostrarCarrito();
}

function finalizarCompra(){
  alert("Compra realizada ✅");
  carrito = [];
  guardar();
  mostrarCarrito();
}