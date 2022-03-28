package com.brycen.vn.dto.D;

import com.brycen.vn.dto.M.BaseDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse  extends 	BaseDTO {

	private String username;
	private String password;
	private CustomerDTO customerDTO;
}
