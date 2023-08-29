package com.ibs.services;

import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.databind.Module.SetupContext;
import com.ibs.repositories.AccountRepo;
import com.ibs.services.impl.AccountServiceImpl;

@ExtendWith(MockitoExtension.class)
public class AccountServiceTest {
	
	@Mock
	private AccountRepo accountRepo;
	
	@Mock
	private AccountServiceImpl accountService;
	
	@BeforeEach
	void setUp()
	{
		this.accountService = new AccountServiceImpl(this.accountRepo);
	}
	
	@Test
	void getUserById()
	{
		accountService.showUserById("ID@123123").getAccNo();
		verify(accountRepo).findByUserId("ID@123123").getAccNo();
	}
}
