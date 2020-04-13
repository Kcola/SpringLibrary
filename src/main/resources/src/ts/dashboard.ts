import {bookCopies} from './book-copies-grid';
import {validateRegistrationObject, validUserName} from "./functions";
import {Reader} from "./interfaces";
import {borrowedBooks} from "./borrowed-books-grid";

export function dashboard() {
    interface NewUser {
        username: string,
        password: string,
        firstname: string,
        lastname: string,
        email: string,
        zipcode: string,
        address: string,
        type: "user"|"admin",
    }
    interface ReturningUser {
        username: string,
        password: string
    }

    renderPage();
    document.getElementById("loginForm")
        .addEventListener("submit", async function (e) {
            let inputUsername = document.getElementById("email")! as HTMLInputElement;
            let inputPassword = document.getElementById("password")! as HTMLInputElement;
            let username = inputUsername.value.toLocaleLowerCase();
            let password = inputPassword.value;
            let credentials = { username: username, password: password } as ReturningUser;
            e.preventDefault();
            e.stopPropagation();
            const url = "/api/authenticate";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            const token = await response.json();
            if(response.status === 200){
                sessionStorage.setItem("username", username)
                sessionStorage.setItem('token', token.jwt);
                window.location.hash = "dashboard"
            }
            else{
                alert("Invalid Credentials")
            }
    });
    document.getElementById("registerForm")
        .addEventListener("submit", async function (e){
            e.preventDefault();
            e.stopPropagation();
            let register = {} as NewUser;
            let inputPassword = document.getElementById("registerPassword")! as HTMLInputElement;
            let inputConfirmPassword = document.getElementById("registerConfirmPassword")! as HTMLInputElement;
            if(inputConfirmPassword.value !== inputPassword.value){
                alert("Password doesnt match");
                return;
            }

            let inputUsername = document.getElementById("registerUsername")! as HTMLInputElement;
            if(!validUserName(inputUsername.value)){
                alert("Username can only contain letters and/or numbers");
                return;
            }
            let inputEmail = document.getElementById("registerEmail")! as HTMLInputElement;
            let inputFirstname = document.getElementById("registerFirstname")! as HTMLInputElement;
            let inputLastname = document.getElementById("registerLastname")! as HTMLInputElement;
            let inputCity = document.getElementById("registerCity")! as HTMLInputElement;
            let inputZipcode = document.getElementById("registerZipcode")! as HTMLInputElement;
            let pickState = document.getElementById("registerState")! as HTMLSelectElement;
            let streetAddress = document.getElementById("registerStreetAddress")! as HTMLInputElement;
            register.username = inputUsername.value.toLocaleLowerCase();
            register.password = inputPassword.value;
            register.email = inputEmail.value;
            register.firstname = inputFirstname.value;
            register.lastname = inputLastname.value;
            register.zipcode = inputZipcode.value;
            register.address = `${streetAddress.value}, ${inputCity.value}, ${pickState.value}${register.zipcode}`;
            register.type = "admin";
            if(validateRegistrationObject(register)){
                const url = "/api/register";
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(register)
                });
                if(response.status ==200)
                    alert("You can now sign in");
                else
                    alert("Username already exists");
            }
            else{
                alert("Fill out all registration fields");
            }

        });

    function renderPage(){
        let isAuthenticated = typeof sessionStorage.getItem('token') === "string";
        renderLogin(isAuthenticated);
    }
    function renderLogin(isAuthenticated: boolean){
        if(isAuthenticated){
            document.getElementById("login").classList.add("hidden");
            renderDashboard();
        }
        else{
            window.location.hash = "login"
            document.getElementById("login").classList.remove("hidden");
            document.getElementById("dashboard").classList.add("hidden");
        }
    }
    async function renderDashboard(){
        document.getElementById("dashboard").classList.remove("hidden");
        const url = "/api/userinfo"
        const response = await fetch(url, {
            method: 'Get',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        });
        const reader = await response.json() as Reader;
        if(response.status === 200){
            sessionStorage.userInfo = JSON.stringify(reader);
            document.getElementById("loggedInUser").textContent = `${reader.firstname} ${reader.lastname}`;
        }
        else{
            alert("Error retrieving user info")
        }
        if(window.location.hash == "#borrow"){
            $("#all-books-grid").html("");
            $("#all-books-grid").kendoGrid(bookCopies.settings);
            $("#borrow-menu").removeClass("hidden");
        }
        else{
            $("#borrow-menu").addClass("hidden");
            $("#all-books-grid").html("");
        }
        if(window.location.hash == "#profile"){
            $("#borrwed-books-grid").html("");
            $("#borrwed-books-grid").kendoGrid(borrowedBooks.settings);
            $("#profile-menu").removeClass("hidden");
        }
        else{
            $("#profile-menu").addClass("hidden");
            $("#borrwed-books-grid").html("");
        }

    }

    window.addEventListener("hashchange", function () {
        renderPage();
    });
}
