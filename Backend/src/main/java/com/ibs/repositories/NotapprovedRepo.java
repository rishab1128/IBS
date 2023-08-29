package com.ibs.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ibs.entities.Notapproved;
import com.ibs.entities.User1;

public interface NotapprovedRepo extends JpaRepository<Notapproved, Integer>{
//	public Optional<User1> findByaccNo(Integer id);
	Optional<Notapproved> findByaadharNo(String str);
	Optional<Notapproved> findBymobile(String str);
	Optional<Notapproved> findBypanNo(String str);
	Optional<Notapproved> findByemail(String str);

}
