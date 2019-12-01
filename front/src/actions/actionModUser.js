var actionUser=require ('./actionsUser');

module.exports.showModUser = function(req, res, user){

  setUser(user);
  res.render('modUser');


}

module.exports.modUser = function (res, email, api,rpc){

    var user=getUser();
    api.transact({
        actions: [{
          account: 'jrodrg',
          name: 'updateuser',
          authorization: [{
            actor: 'jrodrg',
            permission: 'active',
          }],
          data: {
            n_ContractOwnr:'jrodrg',
            usr: user.userName,
            email:email,
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      }).then(()=>{
        rpc.get_table_rows({
          json: true,                 // Get the response as json
          code: 'jrodrg',           // Contract that we target
          scope: 'jrodrg',           // Account that owns the data
          table: 'userstable',          // Table name
          table_key: 'userName',      // Table primary key value
          lower_bound: user.userName,             // Table secondary key value
          limit: 1                  // Here we limit to 1 to get only row
        }).then(data => {

          actionUser.showUSer(res, data.rows[0]);

        }).catch(error => {
          console.log(error);
        })
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
