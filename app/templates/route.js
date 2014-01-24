module.exports = function (app) {
    app.get('/<%= name %>', function (req, res) {
        var ok = { name: 'sample' };
        return res.json(ok, 200);
    });
};

