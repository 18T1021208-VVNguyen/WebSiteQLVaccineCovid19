package com.brycen.vn.controller.D;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brycen.vn.config.SecurityUtils;
import com.brycen.vn.dto.D.LoginRequest;
import com.brycen.vn.dto.D.LoginResponse;
import com.brycen.vn.dto.D.UserResponse;
import com.brycen.vn.entity.Customer;
import com.brycen.vn.repositories.CustomerRepository;
import com.brycen.vn.security.service.JwtService;
import com.brycen.vn.security.service.UserDetailsImpl;
import com.brycen.vn.service.iml.D.UserService;


@RestController
@RequestMapping("/congthongtin")
@CrossOrigin("*")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private JwtService jwtService;


	@Autowired
	CustomerRepository customerRepository;
	@Autowired
	 AuthenticationManager authenManager;
	// login
	@PostMapping("/login")
	public ResponseEntity<?> LoginUser(@RequestBody LoginRequest login) {
		
			Authentication authentication  = authenManager.authenticate(
					new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword()));
			
			UserDetailsImpl s = (UserDetailsImpl) authentication.getPrincipal();
			LoginResponse response = new LoginResponse();
			
			
			response.setToken(jwtService.generateTokenLogin(authentication.getName()));
			List<String> roles = s.getAuthorities().stream().map(role->
			role.getAuthority()).collect(Collectors.toList());
			System.out.println("User: "+ s.getUsername() );
			System.out.println("User: "+ s.getId() );
			Optional<Customer>	oCustomer = customerRepository.findByIdUser(s.getId());
			if(oCustomer.isPresent()) {
				response.setIdCustomer(oCustomer.get().getId());
				response.setCustomerName(oCustomer.get().getName());
			}
			response.setRoles(roles);
			response.setIdUser(s.getId());
			response.setUserName(s.getUsername());
			return new ResponseEntity<LoginResponse>(response,HttpStatus.OK);
		
	}


	// admin hiển thị danh sách user
//	@PreAuthorize("hasRole('ROLE_ADMIN')")
//	@GetMapping("/admin/users")
//	public ResponseEntity<List<UserDTO>> getAllUser() {
//		return new ResponseEntity<List<UserDTO>>(userService.getAll(), HttpStatus.OK);
//	}

	// hiển thị profile
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	@GetMapping("/profile")
	public ResponseEntity<UserResponse> getProfile() {
		return new ResponseEntity<UserResponse>(userService.findUser(SecurityUtils.getUserName()), HttpStatus.OK);
	}
	

}