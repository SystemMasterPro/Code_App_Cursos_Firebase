class Autenticacion {
    autEmailPass(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
            if (result.user.emailVerified) {
                $('#avatar').attr('src', 'imagenes/usuario_auth.png')
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Bienvenido ${
                        result.user.displayName
                    }`,
                    showConfirmButton: false,
                    timer: 1500
                })
                // Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
            } else {
                firebase.auth().signOut()
                Swal.fire('Por Favor Valide Su Cuenta')
                // Materialize.toast(
                // `Por favor realiza la verificación de la cuenta`,
                // 5000
                // )
            }
        })
        $('.modal').modal('close')
    }

    crearCuentaEmailPass(email, password, nombres) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(result => {
            result.user.updateProfile({displayName: nombres})

            const configuracion = {
                url: 'http://localhost:3000/' // aqui ira la direccion de nuestra pagina web o index
            }

            result.user.sendEmailVerification(configuracion).catch(error => {
                // console.error(error)
                // Materialize.toast(error.message, 4000)
                Swal.fire({icon: 'error', title: 'Oops...', text: 'Datos Incorrectos!'})
            })

            firebase.auth().signOut()

            Swal.fire(`Bienvenido ${nombres}, debes realizar el proceso de verificación`)
            // Materialize.toast(
            // `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
            // 4000
            // )

            $('.modal').modal('close')
        }).catch(error => {
            // console.error(error)
            // Materialize.toast(error.message, 4000)
            Swal.fire({icon: 'error', title: 'Oops...', text: 'Datos Incorrectos!'})
        })
    }

    authCuentaGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()

        firebase.auth().signInWithPopup(provider).then(result => {
            $('#avatar').attr('src', result.user.photoURL)
            $('.modal').modal('close')
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Bienvenido ${
                    result.user.displayName
                }`,
                showConfirmButton: false,
                timer: 1500
            })
            // Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
        }).catch(error => {
            // console.error(error)
            // Materialize.toast(`Error al autenticarse con Google: ${error} `, 4000)
            Swal.fire({icon: 'error', title: 'Oops...', text: 'Error al autenticarse con Google!'})
        })
    }

    authCuentaFacebook() {

        const provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider).then(result => {
            $('#avatar').attr('src', result.user.photoURL)
            $('.modal').modal('close')
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Bienvenido ${
                    result.user.displayName
                }`,
                showConfirmButton: false,
                timer: 1500
            })
            // Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
        }).catch(error => {
            // console.error(error)
            // Materialize.toast(`Error al autenticarse con Facebook: ${error} `, 4000)
            Swal.fire({icon: 'error', title: 'Oops...', text: 'Error al autenticarse con Facebook!'})
        })

    }

    authTwitter() { // TODO: Crear auth con twitter
    }
    // Metodo encargado de cambiar la contraseña almacenada en nuestra base de datos firebase
    resetPasswordByEmail(email) {
        if (email) {
            const auth = firebase.auth();

            const configuracion = {
                url: "http://localhost:3000/"
            };

            auth.sendPasswordResetEmail(email, configuracion).then(result => {
                // console.log(result);
                // Materialize.toast(
                // `Se ha enviado un correo para reestablecer la contraseña`,
                // 4000
                // );
                Swal.fire('Se ha enviado un correo para reestablecer la contraseña')
                $(".modal").modal("close");
            }).catch(error => {
                // console.log(error);
                // Materialize.toast(error.message, 4000);
                Swal.fire({icon: 'error', title: 'Oops...', text: 'Datos Incorrectos!'})
            });
        } else { // Materialize.toast(`Por favor ingrese su correo`, 4000);
            Swal.fire('Por favor ingrese su correo')
        }
    }
}
