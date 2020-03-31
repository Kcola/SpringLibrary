import * as moment from 'moment';
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
export interface Reader{
    readerid : number,
    email: string,
    rtype: "admin"|"user",
    firstname: string,
    lastname: string,
    address: string,
    zipcode: string
}
export function validUserName(s: string) {
    return /^[a-z0-9]+$/i.test(s);
}
export function validateRegistrationObject(obj: any) {
    for (let key in obj) {
        if (obj[key] === null || obj[key] === "")
            return false;
    }
    return true;
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
        document.getElementById("loggedInUser").textContent = `${reader.firstname} ${reader.lastname}`;
    }
    else{
        alert("Error retrieving user info")
    }

    const dealsDataSource = new kendo.data.DataSource({
        transport: {
            read: async function (options) {
                const response = await fetch("/api/books", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                });
                const deals = await response.json();
                options.success(deals);
            }
        },
        schema: {
            model: {
                fields: {
                    docid: { type: "number" },
                    title: { type: "string" },
                    pdate: { type: "date" },
                    publisher: {type: "string"},
                    isbn: { type: "string" },
                    genre: { type: "string" }
                }
            }
        },
        pageSize: 20,
    });


    let dealsGrid = {} as kendo.ui.GridOptions;
    dealsGrid.excel = {
        fileName: "BookExport.xlsx",
        allPages: true
    }
    dealsGrid.excelExport = function (e) {
        var columns = e.workbook.sheets[0].columns;
        columns.forEach(function (column) {
            delete column.width;
            column.autoWidth = true;
        });
    }
    dealsGrid.dataSource = dealsDataSource
    dealsGrid.scrollable = true;
    dealsGrid.sortable = true;
    dealsGrid.pageable = {
        pageSizes: [5, 10,20],
        input: true,
        numeric: false
    };
    dealsGrid.filterable = true;
    dealsGrid.columns = [
        {
            field: "title",
            title: "Title",
            width: "100px",
            filterable: false,
            template: function (dataRow: { title: string; }) {
                return `<div class = "cut-text" ">${dataRow.title}</div>`;
            },
            headerTemplate: '<div style="font-weight: bold; color: black; ">Title</div>'
        },
        {
            field: "pdate",
            title: "Publish Date",
            width: "63px",
            filterable: {
                ui: function (element: any) {
                    element.kendoDatePicker({
                        format: '{0: dd-MM-yyyy}'
                    })
                }
            },
            template: function (dataRow: { pdate: Date; }) {
                if (dataRow.pdate.getDay() === 1)
                    return '<div style="font-weight: bold; color: black; "></div>'
                return `<div class = "cut-text" ">${moment(dataRow.pdate).format("LL")}</div>`;
            },
            headerTemplate: '<div style="font-weight: bold; color: black; ">Publish Date</div>'
        },
        {
            field: "publisher",
            title: "Publisher",
            width: "63px",
            filterable: false,
            template: function (dataRow: { publisher: string; }) {
                return `<div class = "cut-text" ">${dataRow.publisher}</div>`;
            },
            headerTemplate: '<div style="font-weight: bold; color: black; ">Publisher</div>'
        },
        {
            field: "isbn",
            title: "ISBN",
            width: "63px",
            filterable: false,
            template: function (dataRow: { isbn: string; }) {
                return `<div class = "cut-text" ">${dataRow.isbn}</div>`;
            },
            headerTemplate: '<div style="font-weight: bold; color: black; ">ISBN</div>'
        },
        {
            field: "genre",
            title: "Genre",
            width: "100px",
            filterable: false,
            template: function (dataRow: { genre: string; }) {
                return `<div class = "cut-text" ">${dataRow.genre}</div>`;
            },
            headerTemplate: '<div style="font-weight: bold; color: black; ">Genre</div>'
        }
    ];

    $("#grid").kendoGrid(dealsGrid);
}

function renderPage(hash: string){
    let isAuthenticated = typeof sessionStorage.getItem('token') === "string";
    renderLogin(isAuthenticated);
}
export function dashboard() {
    renderPage(window.location.hash);
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


    window.addEventListener("hashchange", function () {
        renderPage(window.location.hash);
    });
}
