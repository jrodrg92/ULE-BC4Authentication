var actModUser=require('./actionModUser');
var actionLogin=require('../actions/actionLogin');

module.exports.showUSer = function (res, user){
    
    setUser(user);
    res.render('user',{nom_Usuario:user.userName,
                        email_Usuario:user.email});

}

module.exports.showModUser = function(req, res){
    
    var user = getUser();
    actModUser.showModUser(req,res,user);

}

module.exports.deleteUser = function(req, res, api){
    
  var user = getUser();

  api.transact({
    actions: [{
      account: 'jrodrg',
      name: 'deleteuser',
      authorization: [{
        actor: 'jrodrg',
        permission: 'active',
      }],
      data: {
        n_ContractOwnr:'jrodrg',
        usr:user.userName
    },
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  }).then(()=>{

    actionLogin.showLogin(req,res);

  }).catch(e=>{
    console.log(e);
  });


}

function setUser(user){
    this.user=user;
  }
  
  function getUser(){
    return this.user;
  }
