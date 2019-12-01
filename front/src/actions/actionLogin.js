var actionnAccs=require('./newAccess');

module.exports.showLogin = function (req,res) {

    res.render('login');

}
module.exports.login = function (req, res, username, password, rpc, api){

  rpc.get_table_rows({
    json: true,                 // Get the response as json
    code: 'jrodrg',           // Contract that we target
    scope: 'jrodrg',           // Account that owns the data
    table: 'userstable',          // Table name
    table_key: 'userName',      // Table primary key value
    lower_bound: username,             // Table secondary key value
    limit: 1                  // Here we limit to 1 to get only row
  }).then(data => {

      var user=data.rows[0];

      if(user!=null){

        if(password=user.passwd){

          req.session=user.id;
          actionnAccs.showAccessWin(res,user,api);

        }else{
          console.log('Contraseña erronea');
        }

      }
  }).catch(error => {
    console.log(error);
  })


}