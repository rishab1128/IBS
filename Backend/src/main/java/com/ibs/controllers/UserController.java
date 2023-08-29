package com.ibs.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ibs.entities.Notapproved;
import com.ibs.entities.User1;
import com.ibs.exceptions.ResourceNotFoundException;
import com.ibs.payloads.ApiResponse;
import com.ibs.payloads.User1Dto;
import com.ibs.repositories.NotapprovedRepo;
import com.ibs.repositories.UserRepo;
import com.ibs.services.impl.*;

import jakarta.validation.Valid;

//import jakarta.validation.Valid;
@CrossOrigin(origins = "*",allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UserServiceImpl userService;
	
	@Autowired 
	private AccountServiceImpl accservice; 

	
	@Autowired
	private NotapprovedRepo notapprovedRepo;
	
	@Autowired
	private UserRepo userrepo;
	
	
	
	@PostMapping("/openaccount")
	public ResponseEntity<Notapproved> createDemo(@Valid @RequestBody Notapproved notapproved)
	{	
		Optional<Notapproved> na1 = this.notapprovedRepo.findByaadharNo(notapproved.getAadharNo());
		Optional<User1> na11 = this.userrepo.findByaadharNo(notapproved.getAadharNo());
		Optional<Notapproved> na2 = this.notapprovedRepo.findBymobile(notapproved.getMobile());
		Optional<User1> na22 = this.userrepo.findBymobile(notapproved.getMobile());
		Optional<Notapproved> na3 = this.notapprovedRepo.findByemail(notapproved.getEmail());
		Optional<User1> na33 = this.userrepo.findByemail(notapproved.getEmail());
		Optional<Notapproved> na4 = this.notapprovedRepo.findBypanNo(notapproved.getPanNo());
		Optional<User1> na44 = this.userrepo.findBypanNo(notapproved.getPanNo());
		if(na1.isEmpty()==false || na11.isEmpty()==false )
		{
			throw new ResourceNotFoundException("Aadhar Number", " Already Exists", notapproved.getAccNo());
		}
		else if(na2.isEmpty()==false || na22.isEmpty()==false)
		{
			throw new ResourceNotFoundException("Mobile Number", " Already Exists", notapproved.getAccNo());
		}
		else if(na3.isEmpty()==false || na33.isEmpty()==false)
		{
			throw new ResourceNotFoundException("Email Number", " Already Exists", notapproved.getAccNo());
		}
		else if(na4.isEmpty()==false || na44.isEmpty()==false)
		{
			throw new ResourceNotFoundException("Pan Number", " Already Exists", notapproved.getAccNo());
		}
		Notapproved createna = this.userService.createdemo(notapproved);
		return new ResponseEntity<>(createna, HttpStatus.CREATED);
	}
	
	
	
		
	@PutMapping("/{userId}")
	public ResponseEntity<User1Dto> updateUser(@Valid @RequestBody User1Dto userDto , @PathVariable("userId") Integer uid)
	{
		User1Dto updatedUser = this.userService.updateUser(userDto, uid);
		return ResponseEntity.ok(updatedUser);
	}
	
	
	

	@GetMapping("/{userId}")
	public ResponseEntity<User1> getSingleUser(@PathVariable("userId") Integer uid)
	{
		return ResponseEntity.ok(this.userService.getUserById(uid));
	}
	
}
