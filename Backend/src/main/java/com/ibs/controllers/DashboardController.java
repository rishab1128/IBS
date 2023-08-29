package com.ibs.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ibs.payloads.ApiResponse;
import com.ibs.payloads.*;
import com.ibs.payloads.User1Dto;
import com.ibs.repositories.UserRepo;
import com.ibs.security.JwtHelper;
import com.ibs.payloads.AccountDto;
import com.ibs.services.impl.*;
import com.ibs.entities.Account;
import com.ibs.entities.WithdrawRequest;
import com.ibs.entities.JwtRequest;
import com.ibs.entities.JwtResponse;
import com.ibs.entities.Notapproved;
import com.ibs.entities.User1;
import com.ibs.entities.benefs;
import com.ibs.exceptions.ResourceNotFoundException;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*",allowedHeaders = "*")
@RestController
@RequestMapping("/api")

public class DashboardController {

	@Autowired
	private TransServiceImpl transService;
	@Autowired
	private UserServiceImpl userService;
	
	@Autowired
	private UserRepo userrepo;	
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private AccountServiceImpl accService;
	
	@GetMapping("/userDashboard/{userId}")
	public ResponseEntity<User1> getSingleUser(@PathVariable("userId") String userId)
	{
		Account acc = accService.getUserById(userId);
	    return ResponseEntity.ok(this.userService.getUserById(acc.getAccNo()));
	}
	  
	  
	 @PostMapping("/userDashboard/fundTransfer/{userId}")
	 public ResponseEntity<TransactionsDto> CreateTrans(@Valid @RequestBody TransactionsDto trans, @PathVariable("userId") String userId)
	  {	
		  User1 current = this.userService.getUserById(trans.getPayer());

		  List<benefs> allowed = this.transService.getByAccNo(trans.getPayer());
		  
		  boolean present = false;
		  for(int i = 0; i<allowed.size();i++)
		  {
			  benefs elem = allowed.get(i);
			  if(elem.getBenef() == trans.getReceiver()) {
				  present = true;
			  }
		  }
		  
		  if(present == false)
		  {
			  throw new ResourceNotFoundException("Receiver Not Found", "in beneficiary", trans.getReceiver());
		  }
		  
		  if(current.getAccNo()== trans.getReceiver())
		  {
			  System.out.println("Same payer and receiver");
			  throw new ResourceNotFoundException("Account number", "same , can't pay", current.getAccNo());
		  }
		  
		  else if(current.getAccBalance()<trans.getAmount())
		  {
			  System.out.println("Insufficient Balance");
			  throw new ResourceNotFoundException("Insufficient Balance", "Pls Add Money", current.getAccNo());
		  }
		  
		  else {
			  User1 current12 = this.userService.getUserById(trans.getReceiver());
			  current.setAccBalance(current.getAccBalance() - trans.getAmount());
			  current12.setAccBalance( current12.getAccBalance() + trans.getAmount());
			  userrepo.save(current);
			  userrepo.save(current12);
			  
		  
			  TransactionsDto createdTrans = this.transService.createTrans(trans);
			  return new ResponseEntity<>(createdTrans, HttpStatus.CREATED);
		  }
	  }
	  
	  
	  

	   @GetMapping("/userDashboard/showTransactions/{userId}")
	   public ResponseEntity<List<TransactionsDto>> getTransById(@PathVariable("userId") String userId)
		{
		    Account acc = accService.getUserById(userId);
		    List<TransactionsDto> merged = this.transService.getTransByPayer(acc.getAccNo());
		    merged.addAll(this.transService.getTransByReceiver(acc.getAccNo()));
		    
			return ResponseEntity.ok(merged);
			
		}
	  
	  
	  
	  @PostMapping("/userDashboard/addBeneficiary/{userId}")
	  public ResponseEntity<benefs> addBeneficiary (@Valid @RequestBody benefs ben )
	  {
		 Integer add = ben.getBenef();
		 Optional<User1> na1 = this.userrepo.findByaccNo(add);
		  if(na1.isEmpty()== true)
		  {
			  throw new ResourceNotFoundException("Account Number", " doesnt Exists",add);
		  }
		  
		  else {
		  benefs created = this.transService.addbenef(ben);
		  return  new ResponseEntity<>(created,HttpStatus.CREATED);
		  }
		  
	  }
	  
	  @GetMapping("/userDashboard/showBeneficiary/{userId}")
	  public ResponseEntity<List<benefs>> showBeneficiary (@PathVariable("userId") String userId)
	  {
		  Account acc = this.accService.getUserById(userId);
		  List<benefs> benefs = this.transService.getByAccNo(acc.getAccNo());
		  return  new ResponseEntity<List<benefs>>(benefs,HttpStatus.CREATED);
	  
	  }
	  
}
