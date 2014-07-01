module.exports = function (app) {
    app.get('/<%= name %>', function (req, res) {
        var ok = { name: '<%= name %>' };
        return res.json(ok, 200);
    });
};

