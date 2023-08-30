package com.ibs.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ibs.entities.Account;
import com.ibs.entities.User1;
import com.ibs.payloads.User1Dto;

public interface UserRepo extends JpaRepository<User1, Integer>{
	public Optional<User1> findByaccNo(Integer id);
	public Optional<User1> findByaadharNo(String s);
	public Optional<User1> findBymobile(String s);
	public Optional<User1> findBypanNo(String s);
	public Optional<User1> findByemail(String s);
//	public  existsById(Integer id);
//	public List<User1>findByIsApproved(Integer var);
//	public Optional<List<User1>> findByIsApproved(Boolean var);
//	public User1 findByaccNo(Integer id);
//}
}