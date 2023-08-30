package com.ibs.entities;
//package com.ibs.entities;

import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "benefs")
@NoArgsConstructor
@Getter
@Setter

public class benefs {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int refNo;
	
	private int accNo;
	private String benefName;
	private int benef;
	 
	 

}
