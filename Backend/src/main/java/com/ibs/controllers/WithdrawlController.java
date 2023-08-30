package com.ibs.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ibs.entities.User1;
import com.ibs.entities.WithdrawRequest;
import com.ibs.repositories.UserRepo;
import com.ibs.services.impl.UserServiceImpl;

import jakarta.validation.Valid;


@CrossOrigin(origins = "*",allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class WithdrawlController {

	@Autowired
	public UserServiceImpl userService;
	
	@Autowired
	public UserRepo userrepo;
	
	
	@PostMapping("/userDashboard/withdrawl/{userId}")
	  public ResponseEntity<User1> withdrawamount(@Valid @RequestBody WithdrawRequest amount)
	  {
	

		 User1 user = this.userService.getUserById(amount.getAccNo());
//		 System.out.println(user.getAccBalance());
//		 Integer newbal = (user.getAccBalance() - amount.getValue());
		 user.setAccBalance((user.getAccBalance() - amount.getValue()));
		 userrepo.save(user);
		 
//		 System.out.println(user.getAccBalance());
		 return new ResponseEntity<>(user,HttpStatus.CREATED);
	  }
}
