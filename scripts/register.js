let FirstName = document.querySelector("#FirstName");
let LastName = document.querySelector("#LastName");
let Email = document.querySelector("#Email");
let Password = document.querySelector("#Password");
let PhoneNumber = document.querySelector("#PhoneNumber");
let RegSubmit = document.querySelector("#RegSubmit");
let LoginSubmit = document.querySelector("#LoginSubmit");
let ResetBtn = document.querySelector("#ResetBtn");
let RegisterForm = document.querySelector('#RegisterForm')
let LoginForm = document.querySelector('#LoginForm')

let LoginSect = document.querySelector('.Login')
let RegisterSect = document.querySelector('.Register')
ResetBtn.addEventListener("click", () => {
  document.querySelector("#RegisterForm").reset();

});
RegSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  Registration();
});
LoginSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  LogIn();
});

async function Registration() {
  let UserData = {
    phoneNumber: PhoneNumber.value,
    password: Password.value,
    email: Email.value,
    firstName: FirstName.value,
    lastName: LastName.value,
    role: "user",
  };
  let resp = await fetch("https://rentcar.stepprojects.ge/api/Users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(UserData),
  });

  if (!resp.ok) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Registration Failed",
    });
    return;
  }
let data = await resp.json();

  console.log(data);

  Swal.fire({
  title: "You're in!",
  icon: "success",
  draggable: true
});
RegisterForm.reset()
}

LoginSect.classList.add('hidden')
let SignInBtn = document.querySelector('.RegisterSigninLink button')
let RegisterBtn = document.querySelector('.LoginRegisterLink button')
SignInBtn.addEventListener('click',() => {
  LoginSect.classList.toggle('hidden')
  RegisterSect.classList.toggle('hidden')
})
RegisterBtn.addEventListener('click',() => {
  LoginSect.classList.toggle('hidden')
  RegisterSect.classList.toggle('hidden')
})

async function LogIn() {
  let UserData = {
     phoneNumber: PhoneNumber.value,
    password: Password.value,
    email: 'Email.value',
    firstName: 'FirstName.value',
    lastName: 'LastName.value',
    role: "user",
  };let resp = await fetch("https://rentcar.stepprojects.ge/api/Users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(UserData),
  });

 
  if (!resp.ok) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Login Failed",
    });
    return;
  }

  let data = await resp.json();

  console.log(data);
  LoginForm.reset();
localStorage.setItem("token", data.token);
  location.reload();
Swal.fire({
  title: "You're Back!",
  icon: "success",
  draggable: true
});


}
if (localStorage.getItem("token")) {
  LoginSect.classList.add("hidden");
  RegisterSect.classList.add("hidden");
  const greetUser = document.createElement("h2");

  const signOut = document.createElement("button");
  const ProfileText = document.createElement('div')
  ProfileText.append(greetUser, signOut)
  
  signOut.textContent = "Sign Out";

  signOut.addEventListener("click", () => {
    localStorage.removeItem("token");
    location.reload();
  });
  greetUser.textContent = "You're logged in";
  document.querySelector('main').append(ProfileText,);
}
