
const authMiddleware = (req, res) => {
    const token = req.cookies.jwt;
    console.log(token);
    return req;
}

module.exports = { authMiddleware }