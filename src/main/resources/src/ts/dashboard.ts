import {bookCopies} from './book-copies-grid';
import {inputConfirmed, validateRegistrationObject, validUserName} from "./functions";
import {NewUser, Reader, ReturningUser} from "./interfaces";
import {borrowedBooks} from "./borrowed-books-grid";
import {history} from "./transaction-history-grid";
import {reservedBooks} from "./reserved-books-grid";

export function dashboard() {
    renderPage();
    document.getElementById("nav-logout").addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        sessionStorage.removeItem("token");
        window.location.reload();
    });
    document.getElementById("loginForm")
        .addEventListener("submit", async function (e) {
            let inputUsername = document.getElementById("email")! as HTMLInputElement;
            let inputPassword = document.getElementById("password")! as HTMLInputElement;
            let username = inputUsername.value.toLocaleLowerCase();
            let password = inputPassword.value;
            let credentials = {username: username, password: password} as ReturningUser;
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
            if (response.status === 200) {
                sessionStorage.setItem("username", username)
                sessionStorage.setItem('token', token.jwt);
                window.location.hash = "profile"
            } else {
                alert("Invalid Credentials")
            }
        });
    document.getElementById("registerForm")
        .addEventListener("submit", async function (e) {
            e.preventDefault();
            e.stopPropagation();
            let register = {} as NewUser;
            let inputPassword = document.getElementById("registerPassword")! as HTMLInputElement;
            let inputConfirmPassword = document.getElementById("registerConfirmPassword")! as HTMLInputElement;
            if (!inputConfirmed(inputConfirmPassword.value, inputPassword.value)) {
                alert("Password doesnt match");
                return;
            }

            let inputUsername = document.getElementById("registerUsername")! as HTMLInputElement;
            if (!validUserName(inputUsername.value)) {
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
            if (validateRegistrationObject(register)) {
                const url = "/api/register";
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(register)
                });
                if (response.status == 200)
                    alert("You can now sign in");
                else
                    alert("Username already exists");
            } else {
                alert("Fill out all registration fields");
            }

        });

    function renderPage() {
        $(".grid").html("");
        let isAuthenticated = typeof sessionStorage.getItem('token') === "string";
        renderLogin(isAuthenticated);
    }

    document.getElementById("profile-nav")
        .addEventListener("click", async function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(".grid").html("");
            $("#borrowed-books-grid").kendoGrid(borrowedBooks.settings);
        });
    document.getElementById("reserved-nav")
        .addEventListener("click", async function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(".grid").html("");
            $("#reserved-books-grid").kendoGrid(reservedBooks.settings);
        });
    document.getElementById("history-nav")
        .addEventListener("click", async function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(".grid").html("");
            $("#borrowed-books-grid").kendoGrid(history.settings);
        });

    function renderLogin(isAuthenticated: boolean) {
        if (isAuthenticated) {
            $("#nav-login, #login").addClass("hidden");
            $("#nav-logout,#dashboard").removeClass("hidden");
            if (window.location.hash === "#login")
                window.location.hash = "profile";
            renderDashboard();
        } else {
            window.location.hash = "login"
            $("#nav-login, #login").removeClass("hidden");
            $("#nav-logout,#dashboard").addClass("hidden");
            window.location.hash = "login";
        }
    }

    async function renderDashboard() {
        document.getElementById("dashboard").classList.remove("hidden");
        const url = "/api/userinfo"
        const response = await fetch(url, {
            method: 'Get',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        });
        const reader = await response.json() as Reader;
        if (response.status === 200) {
            sessionStorage.userInfo = JSON.stringify(reader);
            document.getElementById("loggedInUser").textContent = `${reader.firstname} ${reader.lastname}`;
        } else {
            alert("Error retrieving user info")
        }
        if (window.location.hash == "#borrow") {
            $("#all-books-grid").html("");
            $("#all-books-grid").kendoGrid(bookCopies.settings);
            $("#menu, #borrow, #duration, label[for='borrow-duration']").removeClass("hidden");
            $("#reserve").addClass("hidden");
        }
        if (window.location.hash == "#reserve") {
            $("#all-books-grid").html("");
            $("#all-books-grid").kendoGrid(bookCopies.settings);
            $("#menu, #reserve").removeClass("hidden");
            $("#duration, label[for='borrow-duration'], #borrow").addClass("hidden");
        }
        if (window.location.hash == "#profile") {
            $("#menu").addClass("hidden");
            $("#borrowed-books-grid").html("");
            $("#borrowed-books-grid").kendoGrid(borrowedBooks.settings);
            $("#profile-menu").removeClass("hidden");
        } else {
            $("#profile-menu").addClass("hidden");
            $("#borrowed-books-grid").html("");
        }

    }

    window.addEventListener("hashchange", function () {
        renderPage();
    });
}
