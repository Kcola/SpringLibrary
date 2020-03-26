export function dashboard() {
    renderPage(window.location.hash);
    document.getElementById("loginForm")
        .addEventListener("submit", async function (e) {
            let inputUsername = document.getElementById("email")! as HTMLInputElement;
            let inputPassword = document.getElementById("password")! as HTMLInputElement;
            let username = inputUsername.value;
            let password = inputPassword.value;
            let credentials = { username: username, password: password };
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
            sessionStorage.setItem('token', token.jwt);
    });
    document.getElementById("registerAnchor")
        .addEventListener("click",function () {

        });
    function renderPage(hash: string){
        let isAuthenticated = sessionStorage.getItem('token')!=null;
    }
    window.addEventListener("hashchange", function () {
        renderPage(window.location.hash);
    });
}
