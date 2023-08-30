package com.ibs.services;

import java.util.List;

import com.ibs.entities.Notapproved;
import com.ibs.entities.User1;
import com.ibs.payloads.User1Dto;


public interface UserService {
	User1 createUser(Notapproved request);
	User1Dto updateUser(User1Dto userDto , Integer userId);
	User1 getUserById(Integer userId);
//	List<User1Dto> getAllUsers();
	void deleteUser(Integer userId);
	List<User1> getAllUsersApproved();
	List<Notapproved> getAllUsersRequested();
//	User1 changeApproval(User1 user1);
	Notapproved createdemo(Notapproved na);
}
