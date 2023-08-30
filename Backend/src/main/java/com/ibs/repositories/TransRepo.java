package com.ibs.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ibs.entities.Transactions;


public interface TransRepo extends JpaRepository<Transactions,Integer>{
	public List<Transactions> findByPayer(Integer payee);
	public List<Transactions> findByReceiver(Integer payee);

}
