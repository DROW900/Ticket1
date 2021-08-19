class Usuario {

    constructor(usuario, contrasenia) {
        this.usuario = usuario
        this.contrasenia = contrasenia
    }

    async validarUsuario() {
        try {
            if (this.usuario == '' || this.contrasenia == '') {
                alert('Alguno de los campos está vacío')
                return
            }
            let resultado = await fetch('http://localhost:3000/login', {
                method: 'post',
                headers: {
                    "Accept": "application/json, text/plain, */*",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "usuario": this.usuario,
                    "contrasenia": this.contrasenia
                })
            })
            let datos = await resultado.json();
            if(!resultado.ok){
                throw new Error('No se pudo iniciar sesión, revise sus datos')
            }
            this.token = datos; 
        } catch (error) {
            alert(error)
        }
    }

    static async guardarUsuario(usuario) {
        localStorage.setItem('datosUsuario', JSON.stringify(usuario))
    }

    static async recuperarUsuario() {
        let resultado = await JSON.parse(localStorage.getItem('datosUsuario'))
        return resultado
    }

    static async ingresar() {
        const usuario = document.getElementById('nombreUsuario')
        const contrasenia = document.getElementById('contrasenia')
        const usuarioACrear = new Usuario(usuario.value, contrasenia.value);
        await usuarioACrear.validarUsuario();
        if(usuarioACrear.token != null){
            await Usuario.guardarUsuario(usuarioACrear);
            location.href = 'presupuestos'          
        }
    }

    static async cerrarSesion(valor) {
        console.log(valor)
        console.log('Hola amigos del iutube')
        localStorage.removeItem('datosUsuario')
    }
}