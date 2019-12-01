var actionnAccs=require('./newAccess');

module.exports.showaddUser = function(req, res){

  res.render('addUser');

}

module.exports.addUser = function (res, username,email, passwd, api,rpc){

    api.transact({
        actions: [{
          account: 'jrodrg',
          name: 'create',
          authorization: [{
            actor: 'jrodrg',
            permission: 'active',
          }],
          data: {
            n_ContractOwnr:'jrodrg',
            nmUsr: username,
            email:email,
            passwd:passwd
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      }).then(()=>{
        rpc.get_table_rows({
          json: true,                
          code: 'jrodrg',           
          scope: 'jrodrg',          
          table: 'userstable',         
          table_key: 'userName',      
          lower_bound: username,            
          limit: 1                  
        }).then(data => {
  
          if(passwd=data.rows[0].passwd){
            actionnAccs.showAccessWin(res,data.rows[0],api);
          }
  
        }).catch(error => {
          console.log(error);
        })
      }).catch(e=>{
        console.log(e);
      });

}
    