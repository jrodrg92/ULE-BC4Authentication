var Email=require('../utils/email');
var actionUser=require ('./actionsUser');

module.exports.showAccessWin = function (res,user,api) {

    var code=generateCode();
    setUser(user);
    addEntry(user,code,api)
    res.render('entry');

}

module.exports.newEntry = function (res, code, rpc) {

  var user =getUser();

  rpc.get_table_rows({
    json: true,                 // Get the response as json
    code: 'jrodrg',           // Contract that we target
    scope: 'jrodrg',           // Account that owns the data
    table: 'secauth',          // Table name
    template: 'userid',      // Table primary key value
    lower_bound: user.id,             // Table secondary key value
    limit: 1                  // Here we limit to 1 to get only row
  }).then(data => {

    var  codeBc=data.rows[0].code;

    if(code=codeBc){
        actionUser.showUSer(res, user);
    }
    else{
        console.log('Codigo Erroneo');
    }

    }).catch(error => {
      console.log(error)
    })

}

function addEntry (user,code,api) {
      api.transact({
          actions: [{
            account: 'jrodrg',
            name: 'newentry',
            authorization: [{
              actor: 'jrodrg',
              permission: 'active',
            }],
            data: {
              n_ContractOwnr:'jrodrg',
              usr:user.id,
              code:code
          },
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30,
        }).then(()=>{
          Email.senMail(user.email,code);
        }).catch(e=>{
          console.log(e);
        });

}

function generateCode () {
    var code='';

    for(var i=0;i<4;i++){
        code += Math.round(Math.random()*9);
    }

    return code;
}

function setUser(user){
  this.user=user;
}

function getUser(){
  return this.user;
}
