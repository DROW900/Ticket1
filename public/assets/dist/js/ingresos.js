class Ingresos{

    static async estructurarIngresos(){
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
}