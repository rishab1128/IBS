package com.ibs.payloads;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class User1Dto {
	
	private int accNo;
		
	
	@NotNull
	private String firstName;
	
	@NotNull
	private String lastName;

	@NotNull
	@Size(min = 10 , message = "Mobile Number Ivalid")
	private String mobile;
	
	@Email(message = "Email address is invalid")
	private String email;
	
	@NotNull
	@Size(min = 16 , message = "Invalid entry" )
	private String aadharNo;
	
	@NotNull
	private String panNo;
	
	@NotNull
	private String dob;
	
	
	private Integer accBalance;
	
	
}