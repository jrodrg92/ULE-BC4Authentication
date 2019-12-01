#include <jrodrg.hpp>

ACTION jrodrg::create(name n_ContractOwnr, name nmUsr, std::string email, std::string passwd) {
  
    require_auth(get_self());
    eosio::print("Add User ", nmUsr); 

    // update the table to include a new poll
    _users_table.emplace(get_self(), [&](auto& user) {
        
        user.id=_users_table.available_primary_key();
        user.userName = nmUsr;
        user.email=email;
        user.passwd = passwd;

    });

  
}


ACTION jrodrg::newentry(name n_ContractOwnr, uint64_t usr, std::string code){

	_auth_table.emplace(get_self(), [&](auto& auth){

    auth.id=_auth_table.available_primary_key();
		auth.userid=usr;
		auth.code=code;

	});
	
}

ACTION jrodrg::updateuser(name n_ContractOwnr, name usr, std::string email){

  require_auth(n_ContractOwnr);

  auto& user = _users_table.get(usr.value, "User doesn't exist");
  
  _users_table.modify(user, n_ContractOwnr, [&](auto& modified_user) {
    //Modificando el email del usuario
    modified_user.email = email;
  });
	
}

ACTION jrodrg::deleteuser(name n_ContractOwnr, name usr){

  require_auth(n_ContractOwnr);

  auto& user = _users_table.get(usr.value, "User doesn't exist");
  
  _users_table.erase(user);
	
}
