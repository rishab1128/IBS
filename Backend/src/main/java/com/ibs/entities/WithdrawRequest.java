package com.ibs.entities;

import jakarta.persistence.Entity;
import lombok.*;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WithdrawRequest {
	private int accNo;
  private int value;
// private String password;
}
