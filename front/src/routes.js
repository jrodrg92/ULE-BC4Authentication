var express=require('express');
var {api,rpc}=require('./utils/ApiService');

var actionLogin=require('./actions/actionLogin');
var actionnAccs=require('./actions/newAccess');
var actAddUSer = require('./actions/addUser');
var actionUser=require ('./actions/actionsUser');
var actModUser=require('./actions/actionModUser');

const router = express.Router();

//Ruta inicial de la aplicación
router.get('/', (req,res) => {
        actionLogin.showLogin(req,res);
});

router.post('/login', (req,res) => {

    var username = req.body.id_Usuario;
    var passwd =req.body.pswd_Usuario;

    if(username.length==0||passwd.length==0){
        console.log('Campos vacios');
    }else{
        actionLogin.login(req, res, username, passwd, rpc, api);
    }

});

router.get('/showaddUser', (req,res) => {

    actAddUSer.showaddUser(req,res);

});

router.post('/addUser', (req,res) => {

    var username = req.body.id_Usuario;
    var correo=req.body.email_Usuario;
    var passwd=req.body.pswd_Usuario;

    actAddUSer.addUser(res,username,correo,passwd,api, rpc)

});

router.get('/showmodUser', (req,res) => {

    actionUser.showModUser(req,res);

});

router.get('/deleteUser', (req,res) => {

    actionUser.deleteUser(req,res, api);

});

router.get('/cerrarSesion', (req,res) => {

    req.session=null;
    actionLogin.showLogin(req,res);

});

router.post('/modUser', (req,res) => {

    var correo=req.body.email_Usuario;

    actModUser.modUser(res,correo,api, rpc)

});


router.post('/access', (req,res) => {

    var code=req.body.num1 +req.body.num2 +req.body.num3 +req.body.num4;

    if(code.length==4){
        actionnAccs.newEntry(res, code, rpc);
    }
    else{
        console.log('Introduce el codigo que hemos enviado a tu correo.')
    }

});


module.exports = router;
