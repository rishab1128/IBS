package com.ibs.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ibs.entities.Account;
import com.ibs.repositories.AccountRepo;

@Service
public class CustomUserDetailService implements UserDetailsService {

	@Autowired
	private AccountRepo accountRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		//Loading User from DB
		
		Account account = accountRepo.findById(username).orElseThrow(()-> new RuntimeException("User Not Found"));
		
		return account;
	}

}
