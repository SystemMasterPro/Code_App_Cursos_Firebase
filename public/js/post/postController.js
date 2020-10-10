$(() => {
  $('#btnModalPost').click(() => {
    $('#tituloNewPost').val('')
    $('#descripcionNewPost').val('')
    $('#linkVideoNewPost').val('')
    $('#btnUploadFile').val('')
    $('.determinate').attr('style', `width: 0%`)
    sessionStorage.setItem('imgNewPost', null)

    // TODO: Validar que el usuario esta autenticado

    // Materialize.toast(`Para crear el post debes estar autenticado`, 4000)

    $('#modalPost').modal('open')
  })

  $('#btnRegistroPost').click(() => {
    const post = new Post()

   const user = firebase.auth().currentUser

    if(user == null){
      // Materialize.toast(`Para crear el post debes estar autenticado`, 4000)
      Swal.fire('Para crear el post debes estar autenticado')
      return
    }
    // console.log(user)
    const titulo = $('#tituloNewPost').val()
    const descripcion = $('#descripcionNewPost').val()
    const videoLink = $('#linkVideoNewPost').val()
    const imagenLink = sessionStorage.getItem('imgNewPost') == 'null'
      ? null
      : sessionStorage.getItem('imgNewPost')

    post
      .crearPost(
        user.uid,
        user.email,
        titulo,
        descripcion,
        imagenLink,
        videoLink
      )
      .then(resp => {
        // Materialize.toast(`Post creado correctamente`, 4000)
        Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Post creado correctamente',
  showConfirmButton: false,
  timer: 1500
})
        $('.modal').modal('close')
      })
      .catch(err => {
        // Materialize.toast(`Error => ${err}`, 4000)
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error!!!'
      })
      })
  })

  $('#btnUploadFile').on('change', e => {
    const file=e.target.files[0]
    const user=firebase.auth().currentUser
    const post=new Post()
    // console.log(user)
    // console.log(user.uid)
    post.subirImagenPost(file,user.uid)
  })
})
