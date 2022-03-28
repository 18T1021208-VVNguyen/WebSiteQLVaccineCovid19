package com.brycen.vn.service.iml.D;




import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.brycen.vn.dto.D.CustomerDTO;
import com.brycen.vn.dto.D.UserDTO;
import com.brycen.vn.dto.D.UserResponse;
import com.brycen.vn.entity.User;
import com.brycen.vn.repositories.D.UserRepository;
import com.brycen.vn.service.D.IUserService;



@Service
public class UserService implements IUserService {

	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public boolean checkLogin(String username, String password) {
		User userMySql = userRepository.getByUsername(username);
		System.out.println("pass"+ userMySql.getPassword());
		if(bcryptEncoder.matches(password,userMySql.getPassword())) {
			return true;
		}
		return false;
	}

	@Override
	public User loadUserByUsername(String username) {
		return userRepository.getByUsername(username);
	}

	@Override
	public List<UserDTO> getAll() {

		List<User> listUser = userRepository.findAll();
		List<UserDTO> listDto = listUser.stream().map(user -> modelMapper.map(user, UserDTO.class))
				.collect(Collectors.toList());
		return listDto;
	}

	@Override
	public UserDTO findByid(Long id) {
		// TODO Auto-generated method stub

		User user = userRepository.findById(id).get();

		UserDTO userDto = modelMapper.map(user, UserDTO.class);

		return userDto;
	}
	


	@Override
	public boolean register(User user) {
		User user1 = userRepository.getByUsername(user.getUsername());
		if(user1==null) {
			userRepository.save(user);
			return true;
		}
		return false;
	}



@Override
	public boolean findByName(String name) {
		User user = userRepository.getByUsername(name);
		if(user!=null) {
			return true;
		}
		return false;
	}

	@Override
	public UserResponse findUser(String name) {
		User user = userRepository.getByUsername(name);
		UserResponse userResporn = modelMapper.map(user, UserResponse.class);
		CustomerDTO customerDTO = modelMapper.map(user.getCustomer(), CustomerDTO.class);
		userResporn.setCustomerDTO(customerDTO);
		
		return userResporn;
	}
	
	


}