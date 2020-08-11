function capturar() {
  imgurl = ["https://www.creartuavatar.com/images/m1.svg", "https://www.creartuavatar.com/images/f1.svg", "https://www.creartuavatar.com/images/m2.svg", "https://www.creartuavatar.com/images/f2.svg", "https://www.creartuavatar.com/images/m3.svg", "https://www.creartuavatar.com/images/f3.svg", "https://www.creartuavatar.com/images/m4.svg", "https://www.creartuavatar.com/images/f4.svg", "https://www.creartuavatar.com/images/m5.svg", "https://www.creartuavatar.com/images/f5.svg", "https://www.creartuavatar.com/images/m6.svg", "https://www.creartuavatar.com/images/f6.svg", "https://www.creartuavatar.com/images/m7.svg", "https://www.creartuavatar.com/images/f7.svg", "https://www.creartuavatar.com/images/m8.svg", "https://www.creartuavatar.com/images/f8.svg", "https://www.creartuavatar.com/images/m9.svg", "https://www.creartuavatar.com/images/f9.svg", "https://www.creartuavatar.com/images/m10.svg", "https://www.creartuavatar.com/images/f10.svg", "https://www.creartuavatar.com/images/m11.svg", "https://www.creartuavatar.com/images/f11.svg", "https://www.creartuavatar.com/images/m12.svg", "https://www.creartuavatar.com/images/f12.svg"];
  username = document.getElementById("user").value;
  email = document.getElementById("email").value;
  telf = document.getElementById("telf").value;
  foto = imgurl[0]
  var slides = document.getElementsByClassName("mySlides");
  for(i = 0; i < slides.length; i++){
     if(slides[i].style.display == "block"){
         foto = imgurl[i];
     }
  }
  /*style="display: block;"*/
  var newUser = { user : username, email : email, telf : telf, foto : foto};
  console.log(newUser);
}