package com.ibs.services;import java.util.List;

import com.ibs.entities.benefs;
import com.ibs.payloads.TransactionsDto;
public interface TransactionsService {
	TransactionsDto createTrans(TransactionsDto trans);
	List<TransactionsDto> getTransByPayer(Integer payee);
	List<TransactionsDto> getTransByReceiver(Integer payee);
	benefs addbenef(benefs ben);
	List<benefs> getByAccNo(Integer acc);
	List<benefs> getAll();
}
