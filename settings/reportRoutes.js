exports.reportRoutes = {
    report_post: {
        route: "/api/reports",
        method: "POST"
    },
    report_get: {
        route: "/api/reports",
        method: "GET"
    },
    report_delete: {
        route: "/api/reports",
        method: "DELETE"
    },
    report_getMy: {
        route: "/api/myReports",
        method: "GET"
    },
    pinReports_delete: {
        route: "/api/reports/byPinId",
        method: "DELETE"
    }
}