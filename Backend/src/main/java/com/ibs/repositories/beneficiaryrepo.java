package com.ibs.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ibs.entities.benefs;

public interface beneficiaryrepo extends JpaRepository<benefs,Integer> {
	public List<benefs> findByAccNo(Integer acc);
	

}
