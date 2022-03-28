package com.brycen.vn.service.D;

import java.util.List;

import com.brycen.vn.dto.D.*;
import com.brycen.vn.entity.User;

public interface IUserService {
	boolean checkLogin(String username, String password);
	
	User loadUserByUsername(String username);
	
	List<UserDTO> getAll();
	
	UserDTO findByid(Long id);
	
	boolean register(User user);
	
	boolean findByName(String name);
	
	UserResponse findUser(String name);
	

}