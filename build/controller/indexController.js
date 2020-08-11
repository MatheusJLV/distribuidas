"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class indexController {
    cargarIndex(req, res) {
    	//cambie index por registro
        res.render("registro");
    }
    cargarChat(req, res) {
    	//cambie index por registro
    	console.log(req.body);
        res.render("index",{nombre : req.body.user , mail : req.body.email, telefono : req.body.telf});
    }
}
exports.default = new indexController();
