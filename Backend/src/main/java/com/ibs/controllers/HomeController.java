package com.ibs.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ibs.entities.Account;
import com.ibs.services.AccountService;
@CrossOrigin(origins = "*",allowedHeaders = "*")
@RestController
@RequestMapping("/home")
public class HomeController {
	@Autowired
	private AccountService accountService;
	@GetMapping("/users")
	public String getUser() {
		return "getting users";
	}
	
	
	@GetMapping("/current-users")
	public String getLoggedInUser(Principal principal)
	{
		return principal.getName();
	}
}
