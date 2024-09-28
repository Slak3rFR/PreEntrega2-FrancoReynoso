// Gestionador de Gastos
const categoriasDeGastos = {
    comida: "Comida",
    impuestos: "Impuestos",
    gastosfijos: "Gastos Fijos",
    ocio: "Ocio",
    otros: "Otros",
    transporte: "Transporte",
    entretenimiento: "Entretenimiento",
    salud: "Salud",
    supermercado: "Supermercado",
    seguros: "Seguros",
};

// Definimos una clase para crear objetos de tipo Gasto
class Gasto {
    constructor(descripcion, monto, categoria){
        this.descripcion = descripcion;
        this.monto = monto;
        this.categoria = categoria;
    }
}

// Variables
let gastos = [];
let totalGastado = 0;

// Funcion para agregar un gasto a la lista
function agregarGasto() {
    const descripcion = prompt('Ingresa la descripción del gasto:');
    const monto = parseFloat(prompt('Ingresa el monto del gasto:'));    
    // Validación de la descripción, monto y categoría
    if (descripcion && !isNaN(monto) && monto > 0) {
        let categoria;
        let categoriaSeleccionada;
        // Pedir la categoría hasta que el usuario elija una válida
        do {
            categoriaSeleccionada = prompt(
                `Ingresa la categoría del gasto (elige una opción):
                1. ${categoriasDeGastos.comida}
                2. ${categoriasDeGastos.impuestos}
                3. ${categoriasDeGastos.gastosfijos}
                4. ${categoriasDeGastos.ocio}
                5. ${categoriasDeGastos.otros}
                6. ${categoriasDeGastos.transporte}
                7. ${categoriasDeGastos.entretenimiento}
                8. ${categoriasDeGastos.salud}
                9. ${categoriasDeGastos.supermercado}
                10. ${categoriasDeGastos.seguros}`
            );
            // Asociar la selección del usuario con la categoría correspondiente
            if (categoriaSeleccionada === '1') {
                categoria = categoriasDeGastos.comida;
            } else if (categoriaSeleccionada === '2') {
                categoria = categoriasDeGastos.impuestos;
            } else if (categoriaSeleccionada === '3') {
                categoria = categoriasDeGastos.gastosFijos;
            } else if (categoriaSeleccionada === '4') {
                categoria = categoriasDeGastos.ocio;
            } else if (categoriaSeleccionada === '5') {
                categoria = categoriasDeGastos.otros;
            } else if (categoriaSeleccionada === '6') {
                categoria = categoriasDeGastos.transporte;
            } else if (categoriaSeleccionada === '7') {
                categoria = categoriasDeGastos.entretenimiento;
            } else if (categoriaSeleccionada === '8') {
                categoria = categoriasDeGastos.salud;
            } else if (categoriaSeleccionada === '9') {
                categoria = categoriasDeGastos.supermercado;
            } else if (categoriaSeleccionada === '10') {
                categoria = categoriasDeGastos.seguros;
            } else {
                console.log('Categoría no válida. Por favor, elige una opción del 1 al 10.');
            }
        } while (!categoria);  // Repetir hasta que se elija una categoría válida
        // Crear y agregar el gasto si todo es válido
        const nuevoGasto = new Gasto(descripcion, monto, categoria);
        gastos.push(nuevoGasto);
        console.log('Gasto agregado con éxito.');
        actualizarTotales();
    } else {
        console.log('Entrada no válida. Por favor, ingresa datos válidos.');
    }
}

// Función para eliminar un gasto según su descripción
function eliminarGasto(){
    const descripcion = prompt('Ingresa la descripción del gasto a eliminar: ');
    const index = gastos.findIndex(gasto => gasto.descripcion === descripcion);
    if (index !== -1){
        gastos.splice(index, 1);
        console.log(`El gasto con descripción "${descripcion}" ha sido eliminado.`);
        actualizarTotales();
    } else {
        console.log("No se encontró un gasto con esa descripción.");
    }
}

// Función para actualizar el total de gastos y mostrar un desglose
function actualizarTotales(){
    // Calculamos el total gastado
    totalGastado = gastos.reduce((total, gasto) => total + gasto.monto, 0);
    console.log(`Total Gastado: $${totalGastado}`);
    // Desglose de gastos por categoría
    const categorias = {};
    gastos.forEach(gasto =>{
        if (!categorias[gasto.categoria]){
            categorias[gasto.categoria] = 0;
        }
        categorias[gasto.categoria] += gasto.monto;
    });
    console.log('Desglose por categorías: ');
    for (const categoria in categorias){
        console.log(`${categoria}: $${categorias[categoria]}`);
    }
}

// Función para mostrar todos los gastos
function mostrarGastos(){
    if(gastos.length === 0){
        console.log('No hay gastos registrados.');
    } else {
        console.log('Gastos registrados: ');
        gastos.forEach(gasto =>{
            console.log(`Descripción: ${gasto.descripcion}, Monto: $${gasto.monto}, Categoria: $${gasto.categoria}`);
        });
    }
}

// Funcion para manejar las opciones del usuario
function iniciarRegistroDeGastos(){
    let continuar = true;
    while(continuar){
        const opcion = prompt(`Elige una opción:
        1. Agregar gasto 
        2. Eliminar Gasto 
        3. Mostrar Gastos 
        4. Mostrar Totales 
        5. Salir`);
        switch (opcion) {
            case '1':
                agregarGasto();
                break;
            case '2':
                eliminarGasto();
                break;
            case '3':
                mostrarGastos();
                break;
            case '4':
                actualizarTotales();
                break;
            case '5':
                continuar = false;
                console.log('Saliendo del registro de gastos...');
                break;        
            default:
                console.log('Opción no válida. Por favor, elige una opción del 1 al 5.');
                break;
        }
    }
}

// Iniciar registro
iniciarRegistroDeGastos();
