
const generirajDatoteko = (req, res) => {
    console.log(req.body.ime);
    res.send("hi");
};

module.exports = {
    generirajDatoteko
};