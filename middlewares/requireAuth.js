
const requireAuth = (req, res) => {
    const token = req.cookies.jwt;
    console.log(token);
}

module.exports = { requireAuth }