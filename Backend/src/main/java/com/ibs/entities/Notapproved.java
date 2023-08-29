package com.ibs.entities;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Notapproved")
@NoArgsConstructor
@Getter
@Setter



public class Notapproved {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int accNo;
	
	private String firstName;
	private String lastName;
	private String mobile;
	private String email;
	private String aadharNo;
	private String panNo;
	private String dob;
	
	private int accBalance;

}