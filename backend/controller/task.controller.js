const home = (req, res) => {
    console.log('home ' + req.isAuthenticated());
    res.send('<a href= "/logout">cerrar sesion</a>');
};


const getTasks = (req, res) => {
    console.log('entre');
};
module.exports = {
    home,
    getTasks
};