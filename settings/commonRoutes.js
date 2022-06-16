exports.commonRoutes = {
    signup: {
        route: "/api/SignUp",
        method: "POST"
    },
    signup_superuser: {
        route: "/api/SignUp_SuperUser",
        method: "POST"
    },
    login: {
        route: "/api/Login",
        method: "POST"
    },
    accountType_get : {
        route: "/api/GetUserData",
        method: "GET"
    },
    logout : {
        route: "/api/LogOut",
        method: "GET"
    },
    getServerSettings : {
        route: "/api/GetServerSettings",
        method: "GET"
    }

}