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
public class User_CustomerDTO extends BaseDTO{

	private String code;
	private String name;
	private String birthday;
	private Long gender;
	private String phoneNumber;
	private String email;
	private String identification;
	private String healthInsuranceNumber;
	private String occupation;
	private String ethnic;
	private String address;
	private String username;
	private String password;
}
