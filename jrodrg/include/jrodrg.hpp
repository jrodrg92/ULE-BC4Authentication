#include <eosio/eosio.hpp>
#include <eosio/print.hpp>
#include <string>
#include <stdint.h>
#include<stdlib.h>
#include<stdio.h>

using namespace eosio;


CONTRACT jrodrg : public contract {
  public:
    using contract::contract;
    
    jrodrg(eosio::name receiver, eosio::name code, datastream<const char*> ds):contract(receiver, code, ds),_users_table(receiver,code.value),_auth_table(receiver,code.value)
    {}

    //Create new User
	ACTION create(name n_ContractOwnr, name nmUsr, std::string email, std::string passwd);
  ACTION newentry(name n_ContractOwnr, uint64_t usr, std::string code);
  ACTION updateuser(name n_ContractOwnr, name usr, std::string email);
  ACTION deleteuser(name n_ContractOwnr, name usr);


  private:
  
    //@table user
  	TABLE user{
  	  
      uint64_t id;
  		name userName;
  		std::string email;	
  		std::string passwd;
  
  		uint64_t primary_key() const { return userName.value; }
  
      EOSLIB_SERIALIZE(user, (id)(userName)(email)(passwd)); 
  
  	};
  	
  	TABLE secondAuth{
  
  		uint64_t id;
  		uint64_t userid;
  		std::string code;

  		uint64_t primary_key() const { return id; };
  		uint64_t by_id() const { return userid; };
  
      EOSLIB_SERIALIZE( secondAuth, (id)(userid)(code));
  
  	};

    typedef eosio::multi_index<"userstable"_n, user, eosio::indexed_by<"byowner"_n, eosio::const_mem_fun<user, uint64_t, &user::primary_key>>> users_table;
    
    typedef eosio::multi_index<"secauth"_n, secondAuth, eosio::indexed_by<"byuser"_n, eosio::const_mem_fun<secondAuth, uint64_t, &secondAuth::primary_key>>,
                                                               indexed_by<"anotherid"_n, const_mem_fun<secondAuth, uint64_t, &secondAuth::by_id>>> auth_table;
    users_table _users_table;
    
    auth_table _auth_table;

};

EOSIO_DISPATCH(jrodrg, (create)(newentry)(updateuser)(deleteuser))
