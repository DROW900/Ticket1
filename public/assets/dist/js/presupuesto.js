class Presupuesto{

    static async mostrarPresupuestos(){
        try {
            let resultado = await fetch('http://localhost:3000/obtenerPresupuestos', {
                method: 'get',
                headers: {
                    "Accept": "application/json, text/plain, */*",
                    'Content-Type': 'application/json',
                }
            })
            const presupuestos = await resultado.json()
            let datos = ''
            for(let i = 0 ; i < presupuestos.length; i++){
                datos += `<tr><td>${presupuestos[i].id}</td><td>${presupuestos[i].createdAt}</td><td>${presupuestos[i].nombreProyecto}</td><td>${presupuestos[i].version}</td></tr>`
            }
            document.getElementById('cuerpoTablaPresupuestos').innerHTML = datos;
            
        } catch (error) {
            alert('Ocurrió un error al solicitar los datos' + error)
            return
        }
    }

    static mostrarFormulario(){
        document.getElementById('formularioPresupuesto').style.display = 'block'
    }

    static ocultarFormulario(){
        document.getElementById('formularioPresupuesto').style.display = 'none'
    }

    static mostrarFormularioFecha(){
        var fecha = new Date()
        var anio = fecha.getFullYear()
        let anios = '';
        for(let i = 2000; i < anio+1; i++){
            anios += `<option value='${i}'>${i}</option>`
        }
        document.getElementById('anios').innerHTML = anios
        document.getElementById('formularioFecha').style.display = 'block'
    }

    static ocultarFormularioFecha(){
        document.getElementById('formularioFecha').style.display = 'none'        
    }

    static async guardarPresupuesto(){
        const nombre = document.getElementById('nombre').value;
        const version = document.getElementById('version').value;
        const proyecto = {
            nombre,
            version,
        }
        localStorage.setItem('datosProyecto', JSON.stringify(proyecto))
        location.href = 'crearPresupuesto';
    }

    static async estructurarFlujo(){
        let fechas = JSON.parse(localStorage.getItem('fechas'))
        let textoDocumento = ''
        if(fechas != null){
            textoDocumento += '<table class = "table"><thead><th></th>'
            for(let i = 0; i < fechas.length; i++){
                textoDocumento += `<th>${fechas[i].mes}/${fechas[i].anio}</th>`
            }
            textoDocumento += '<th>Totales</th></thead>'
            textoDocumento += '<tr><td>Ingresos<td>'
            textoDocumento += '</tr>'
            textoDocumento += '<tr><td>Egresos<td>'
            textoDocumento += '</tr>'
            textoDocumento += '<tr><td>Total<td>'
            textoDocumento += '</tr>'
            textoDocumento += '<tr><td>Acumulado<td>'
            textoDocumento += '</tr>'
            textoDocumento += '<tr>'
            textoDocumento += '<td></td>'
            for(let i = 0; i < fechas.length; i++){
                textoDocumento += `<td><button onclick ='Presupuesto.eliminarFecha(this.value)' value=${i}>Eliminar</button></td>`
            }
            textoDocumento += '</tr>'
            textoDocumento += '</table>'
            textoDocumento += '<button class="btn btn-primary" onclick="Presupuesto.verificarRegistros()">Agregar</button>'
            document.getElementById('contenidos').innerHTML = textoDocumento;
        }
        else{
            textoDocumento += '<button class="btn btn-primary" onclick="Presupuesto.verificarRegistros()">Agregar</button>'
            document.getElementById('contenidos').innerHTML = textoDocumento;
        }
    }

    static async eliminarFecha(indice){
        let fechas = await this.recuperarFechas(); 
        fechas.splice(indice,1)
        if(fechas.length == 0){
            localStorage.removeItem("fechas")
        }else{
            localStorage.setItem('fechas', JSON.stringify(fechas))
        }
        await this.estructurarFlujo();
    }

    static async recuperarFechas(){
        let datos = localStorage.getItem('fechas')
        let fechas = await JSON.parse(datos)
        return fechas
    }

    static async verificarRegistros(){
        const fechas = await this.recuperarFechas()
        if(fechas == null){
            this.mostrarFormularioFecha()
            return
        }else{
            await this.agregarFecha()
            return
        }
    }

    static async agregarFecha(){
        let fechas = await this.recuperarFechas()
        if (fechas == null){
            const mes = document.getElementById('meses').value 
            const anio = document.getElementById('anios').value
            const datos = {mes, anio}
            fechas = [datos]
            localStorage.setItem('fechas', JSON.stringify(fechas))
            this.ocultarFormularioFecha()
        }else{
            let ultimaFecha = fechas[fechas.length-1];
            if(ultimaFecha.mes + 1 > 12){
                let datos = {mes: 1, anio: parseInt(ultimaFecha.anio) + 1}
                fechas.push(datos)
                localStorage.setItem('fechas', JSON.stringify(fechas))
            }else{
                let datos = {mes: parseInt(ultimaFecha.mes) + 1, anio: ultimaFecha.anio}
                fechas.push(datos)
                localStorage.setItem('fechas', JSON.stringify(fechas))
            }           
        }
        this.estructurarFlujo();
    }

    static async eliminarDatos(){
        console.log('Datos Eliminados')
        return
    }

    static async verPresupuestos(){
       let opcion = confirm('¿Seguro que desea salir? Si ha realizado cambios no se guardarán')
       if(opcion == true){
            await this.eliminarDatos();
            location.href = 'presupuestos'
       }
    }
}