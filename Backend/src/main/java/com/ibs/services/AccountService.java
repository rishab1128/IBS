package com.ibs.services;

import java.util.List;

import com.ibs.entities.Account;
import com.ibs.payloads.AccountDto;

public interface AccountService {
	
	AccountDto createAccount(AccountDto account);
	Account getUserById(String userId);
	
}
