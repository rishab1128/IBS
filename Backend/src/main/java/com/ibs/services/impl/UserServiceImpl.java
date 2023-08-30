package com.ibs.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibs.entities.Account;
import com.ibs.entities.User1;
import com.ibs.exceptions.ResourceNotFoundException;
import com.ibs.payloads.User1Dto;
import com.ibs.repositories.AccountRepo;
import com.ibs.repositories.UserRepo;
import com.ibs.repositories.NotapprovedRepo;
import com.ibs.services.UserService;
import com.ibs.entities.Notapproved;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;
	
	
	@Autowired
	private NotapprovedRepo NotapprovedRepo;
	
	@Autowired 
	private AccountRepo accRepo;
	
	@Autowired
	private ModelMapper modelMapper;


	@Override
	public User1 createUser(Notapproved request) {
		// TODO Auto-generated method stub
		User1 user = this.nappToUser(request);
		user.setAccBalance(500);
		int userId = request.getAccNo();	
		User1 savedUser = this.userRepo.save(user);
		Notapproved nap =  this.NotapprovedRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User", "Id", userId));
		this.NotapprovedRepo.delete(nap);
		
		return savedUser;
	}

	@Override
	public Notapproved createdemo(Notapproved na) {
		// TODO Auto-generated method stub

		na.setAccBalance(500);
		Notapproved savedUser = this.NotapprovedRepo.save(na);
		return savedUser;
	}

	
	@Override
	public User1Dto updateUser(User1Dto userDto, Integer userId) {
		// TODO Auto-generated method stub
		User1 user = this.userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User" , "id" , userId));
		user.setFirstName(userDto.getFirstName());
		user.setLastName(userDto.getLastName());
		user.setMobile(userDto.getMobile());
		user.setEmail(userDto.getEmail());
		user.setAadharNo(userDto.getAadharNo());
		user.setPanNo(userDto.getPanNo());
		user.setDob(null);
		
		User1 updatedUser = this.userRepo.save(user);
		User1Dto userDto1 = this.userToDto(updatedUser);
		return userDto1;
	}
	

	@Override
	public User1 getUserById(Integer userId) {
		// TODO Auto-generated method stub
		User1 user = this.userRepo.findByaccNo(userId).orElseThrow(()->new ResourceNotFoundException("User", "Id", userId));
		
		return (user);
	}

	
	@Override
	public List<User1> getAllUsersApproved() {
		// TODO Auto-generated method stub
		List<User1> users = this.userRepo.findAll();
//		List<User1Dto> userDtos=users.stream().map(user->this.userToDto(user)).collect(Collectors.toList());
		return users;
	}
//	
	
	@Override
	public List<Notapproved> getAllUsersRequested() {
		// TODO Auto-generated method stub
		List<Notapproved> users = this.NotapprovedRepo.findAll();
		return users;
	}


	@Override
	public void deleteUser(Integer userId) {
		// TODO Auto-generated method stub
		Notapproved user =  this.NotapprovedRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User", "Id", userId));
		this.NotapprovedRepo.delete(user);
	}
	
	private User1 dtoToUser(User1Dto userDto)
	{
		User1 user = this.modelMapper.map(userDto, User1.class);
		return user;
	}
	private User1 nappToUser(Notapproved nap)
	{
		User1 user = this.modelMapper.map(nap, User1.class);
		return user;
	}
	
	public User1Dto userToDto(User1 user)
	{
		User1Dto userDto = this.modelMapper.map(user, User1Dto.class);
		return userDto;
    }


}
