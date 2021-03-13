class Post {
  constructor() {
    this.db = firebase.firestore();
    // const settings={ timestampsInSnapshots: true }
    //this.db.settings(settings)
    //estas lineas no son necesarias en las nuevas versiones
  }

  crearPost(uid, emailUser, titulo, descripcion, imagenLink, videoLink) {
    return this.db
      .collection("posts")
      .add({
        uid: uid,
        autor: emailUser,
        titulo: titulo,
        descripcion: descripcion,
        videoLink: videoLink,
        imagenLink: imagenLink,
        fecha: firebase.firestore.FieldValue.serverTimestamp()
        //fecha: new Date()+''
      })
      .then(refDoc => {
        // console.log(`Id del posts => ${refDoc.id}`);
      })
      .catch(error => {
        // console.error(`Error creando el posts => ${error}`);
      });
  }

  consultarTodosPost() {
    this.db
      .collection("posts")
      .orderBy("fecha", "asc")
      .orderBy("titulo", "asc")
      .onSnapshot(querySnapshot => {
        $("#posts").empty();
        if (querySnapshot.empty) {
          $("#posts").append(this.obtenerTemplatePostVacio());
        } else {
          querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
              post.data().autor,
              post.data().titulo,
              post.data().descripcion,
              post.data().videoLink,
              post.data().imagenLink,
              Utilidad.obtenerFecha(post.data().fecha.toDate())
            );
            $("#posts").append(postHtml);
          });
        }
      });
  }

  consultarPostxUsuario(emailUser) {
    this.db
      .collection("posts")
      .orderBy("fecha", "asc")
      .where("autor", "==", emailUser)
      .onSnapshot(querySnapshot => {
        $("#posts").empty();
        if (querySnapshot.empty) {
          $("#posts").append(this.obtenerTemplatePostVacio());
        } else {
          querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
              post.data().autor,
              post.data().titulo,
              post.data().descripcion,
              post.data().videoLink,
              post.data().imagenLink,
              Utilidad.obtenerFecha(post.data().fecha.toDate())
            );
            $("#posts").append(postHtml);
          });
        }
      });
  }

  subirImagenPost(file, uid) {
    const refStorage = firebase.storage().ref(`imgsPosts/${uid}/${file.name}`);
    const task = refStorage.put(file);

    task.on(
      "state_changed",
      snapshot => {
        //saber los bytes que se suben
        const porcentaje =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        $(".determinate").attr("style", `width: ${porcentaje}%`);
      },
      err => {
        //envia el error en casod e existir
        // Materialize.toast(`Error subiendo archivo = > ${err.message}`, 4000);
        Swal.fire('Error subiendo archivo')
      },
      () => {
        //cuando se complete la descarga
        task.snapshot.ref
          .getDownloadURL()
          .then(url => {
            // console.log(url);
            sessionStorage.setItem("imgNewPost", url);
          })
          .catch(err => {
            //posible error que se de
            // Materialize.toast(`Error obteniendo downloadURL = > ${err}`, 4000);
            Swal.fire('Error obteniendo downloadURL')
          });
      }
    );
  }

  obtenerTemplatePostVacio() {
    return `<article class="card">
      <div class="post-titulo" style="text-align:center; background:#126798;">
          <h5 style="color:white;margin:10px;">Comparte el primer Curso para la comunidad</h5>
      </div>
      <div class="post-video" style="text-align:center;">
          <iframe type="text/html" width="100%" height="385" src='https://www.youtube.com/embed/bTSWzddyL7E?ecver=2'
              frameborder="0"></iframe>
          </figure>
      </div>
      <div class="post-videolink">
          Video
      </div>
      <div class="post-descripcion" style="text-align:center; background:#126798;">
          <p>La comunidad Dev esta compartiendo contenido, tu que esperas!!!</p>
      </div>
      <div class="post-footer container">         
      </div>
  </article>`;
  }

  obtenerPostTemplate(
    autor,
    titulo,
    descripcion,
    videoLink,
    imagenLink,
    fecha
  ) {
    if (imagenLink) {
      return `
            <div class="card">
              <div style="text-align:center;padding:5px;">
                <a style="color:#3BC73F;" ><i class="fas fa-star"></i></a>
                <a style="color:#3BC73F;"><i class="fas fa-star"></i></a>
                <a style="color:#3BC73F;"><i class="fas fa-star"></i></a>
                <a style="color:#3BC73F;"><i class="fas fa-star"></i></a>
                <a style="color:#3BC73F;"><i class="fas fa-star"></i></a>
              </div>
              <img src="${imagenLink}" class="card-img-top" alt="..." style="height: 60vh">
              <div class="card-body" style="text-align:center;">
                <h5 class="card-title" style='color:white;text-align:center;background-color: #126798;padding: 10px;'>${titulo}</h5>
                <p class="card-text" style='color:black;text-align:center;font-family: 'Times New Roman', Times, serif;'>${descripcion}</p>
                <a href="${videoLink}" style="width:100%;" target="_blank" class="btn btn-primary">Ir al Curso</a>
              </div>
              <div class="card-footer" style="font-family: 'Times New Roman', Times, serif;">
                <div class="row">
                    <div style="color:black;">
                        Fecha: ${fecha}
                    </div>
                    <div style="color:black;">
                        Autor: ${autor}
                    </div>        
                </div>
              </div>
            </div>
        `;
    }

    return `
            <div class="card">
              <div style="text-align:center;padding:5px;">
                <a style="color:#3BC73F;" ><i class="fas fa-star"></i></a>
                <a style="color:#3BC73F;"><i class="fas fa-star"></i></a>
                <a style="color:#3BC73F;"><i class="fas fa-star"></i></a>
                <a style="color:#3BC73F;"><i class="fas fa-star"></i></a>
                <a style="color:#3BC73F;"><i class="fas fa-star"></i></a>
              </div>
              <iframe type="text/html" width="100%" height="400px" src='${videoLink}' frameborder="0"></iframe>
              <div class="card-body">
                <h5 class="card-title" style='color:white;text-align:center;background-color: #126798;padding: 10px;'>${titulo}</h5>
                <p class="card-text" style='color:black;text-align:center;font-family: 'Times New Roman', Times, serif;'>${descripcion}</p>
                <a href="${videoLink}" target="_blank" style="width:100%;" class="btn btn-primary">Ir al Curso</a>
              </div>
              <div class="card-footer" style="font-family: 'Times New Roman', Times, serif;">
                <div class="row">
                    <div style="color:black;">
                        Fecha: ${fecha}
                    </div>
                    <div style="color:black;">
                        Autor: ${autor}
                    </div>        
                </div>
              </div>
            </div>
          `;
  }
}
