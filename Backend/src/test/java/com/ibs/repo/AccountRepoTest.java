package com.ibs.repo;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ibs.entities.Account;
import com.ibs.entities.User1;
import com.ibs.repositories.AccountRepo;
import com.ibs.repositories.UserRepo;

@SpringBootTest
public class AccountRepoTest {
	@Autowired
	private AccountRepo accountRepo;
	
	@Test
	void findByaccNo()
	{
		Account user = new Account("ID@123123",1 , "Password" , "Password");
		accountRepo.save(user);
		
		Account a = accountRepo.findByUserId(user.getUserId());
		
		
		assertThat(a.getUserId()).isEqualTo(user.getUserId());
	}
}

