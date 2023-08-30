package com.ibs.services;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;
 
// Importing required classes
import java.util.Arrays;
import java.util.List;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ibs.payloads.*;
import com.ibs.repositories.AccountRepo;
import com.ibs.entities.Account;
import com.ibs.services.impl.AccountServiceImpl;
 
// MockitoJUnitRunner gives automatic validation
// of framework usage, as well as an automatic initMocks()
@RunWith(MockitoJUnitRunner.class)
public class AccountServiceTest
{
	@InjectMocks
	private AccountServiceImpl accService;
	 
    // The Mockito.mock() method allows us to
    // create a mock object of a class or an interface
	@Mock
  	AccountService AccountServiceMock;
    
    @Mock 
    private AccountService accservice;
    
    @Mock
    private AccountRepo accrepo;
    
    @Mock
    private PasswordEncoder passwordencoder;
    

    
    // Methods annotated with the @Before
    // annotation are run before each test
    @Before public void setUp()
    {
       AccountServiceImpl accservice = new AccountServiceImpl(AccountServiceMock);
    }
 
    // @Test
    // Tells the JUnit that the public void method
    // in which it is used can run as a test case
    @Test
    public void MockTest()
    {
        AccountDto acc = new AccountDto(1,"Rudra@123","Password@1","Password@1");
        
        
        when(AccountServiceMock.createAccount(acc))
            .thenReturn(acc);
 
        AccountDto accounter
            = accService.createAccount(
                acc);
        
//        assertNotNull(acc);
        assertEquals("Rudra@123", accounter.getUserId());
    }
    

}
