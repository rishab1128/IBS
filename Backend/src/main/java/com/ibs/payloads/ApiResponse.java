package com.ibs.payloads;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter

public class ApiResponse {
	private String messageString;
	private boolean success;
	public ApiResponse(String messageString, boolean success) {
		super();
		this.messageString = messageString;
		this.success = success;
	}
}
