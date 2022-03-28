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
public class UserDTO extends BaseDTO{

	private String username;
	private String password;

}
