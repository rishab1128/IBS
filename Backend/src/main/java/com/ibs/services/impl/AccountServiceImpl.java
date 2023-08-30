package com.ibs.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ibs.entities.Account;
import com.ibs.entities.Notapproved;
import com.ibs.entities.User1;
import com.ibs.exceptions.ResourceNotFoundException;
import com.ibs.payloads.AccountDto;
import com.ibs.payloads.User1Dto;
import com.ibs.repositories.AccountRepo;
import com.ibs.repositories.UserRepo;
import com.ibs.services.AccountService;

@Service
 public class AccountServiceImpl implements AccountService{
	@Autowired
	private AccountRepo accountRepo;
	
	@Autowired 
	private UserRepo userrepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	 

	@Override
	public AccountDto createAccount(AccountDto accountDto) {
		
		Optional<User1> user1 = this.userrepo.findByaccNo(accountDto.getAccNo());
		System.out.println(user1.isEmpty());
		if(user1.isEmpty()==true)
		{
			System.out.println("Not founder");
			throw new ResourceNotFoundException("User", "Id", accountDto.getAccNo());
		}
		else {
			
		Account account = this.dtoToAccount(accountDto);
		account.setUserId(account.getUserId());
		account.setLoginPass(passwordEncoder.encode(account.getLoginPass()));
		account.setTransPass(passwordEncoder.encode(account.getTransPass()));
	
		Account savedaccount = this.accountRepo.save(account);
		return this.accountToDto(savedaccount);
		}
	}
	
	@Override
	public Account getUserById(String userId) {
		// TODO Auto-generated method stub
		Account user = this.accountRepo.findByUserId(userId);
		
		return user;
	}
	
	public Account showUserById(String u)
	{
		Account userAccount = this.accountRepo.findByUserId(u);
		return userAccount;
	}

	
	
	private Account dtoToAccount(AccountDto accountDto)
	{
		Account account = this.modelMapper.map(accountDto, Account.class);
		return account;
	}
	
	public AccountDto accountToDto(Account account)
	{
		AccountDto accountDto = this.modelMapper.map(account, AccountDto.class);
		return accountDto;
    }
	
	public  AccountServiceImpl(AccountRepo repo)
	{
		this.accountRepo = repo;
	}

	
}


