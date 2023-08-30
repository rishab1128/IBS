package com.ibs.controllers;

import java.util.List;
import java.util.Map;

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
import com.ibs.payloads.ApiResponse;
import com.ibs.payloads.User1Dto;
import com.ibs.services.impl.*;

import jakarta.validation.Valid;

//import jakarta.validation.Valid;
@CrossOrigin(origins = "*",allowedHeaders = "*")
@RestController
@RequestMapping("/api/admin")
public class AdminControllers {

	@Autowired
	private UserServiceImpl userService;
	
	@GetMapping("/userlist_requested")
	public ResponseEntity<List<Notapproved>> getAllUsersthatareReq()
	{
		return ResponseEntity.ok(this.userService.getAllUsersRequested());
	}
	
	@GetMapping("/userlist_approved")
	public ResponseEntity<List<User1>> getAllUsersthatareApp()
	{
		return ResponseEntity.ok(this.userService.getAllUsersApproved());
	}
	
	@PostMapping("/userlist_requested")
	public ResponseEntity<User1> approveRequest(@Valid@RequestBody Notapproved request)
	{
		User1 user = this.userService.createUser(request);
		return new ResponseEntity<>(user,HttpStatus.CREATED);
		
	}
	@DeleteMapping("/userlist_requested/{userId}")
	public ResponseEntity<ApiResponse> deleteUser(@PathVariable("userId") Integer uid)
	{
		this.userService.deleteUser(uid);
		return new ResponseEntity<ApiResponse>(new ApiResponse("User deleted Successfully" , true),HttpStatus.OK);
	}



}
