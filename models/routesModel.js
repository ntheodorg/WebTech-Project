exports.staticRootFolder = "./public"
exports.staticRoutes = {
    default: {
        route: "/",
        method: "GET"
    },
    home: {
        location: "./public/Home.html",
        route: "/Home",
        method: "GET"
    },
    news: {
        location: "./public/News.html",
        route: "/News",
        method: "GET"
    },
    login: {
        location: "./public/Login.html",
        route: "/Login",
        method: "GET"
    },
    _404: {
        location: "./public/404.html",
    }
}