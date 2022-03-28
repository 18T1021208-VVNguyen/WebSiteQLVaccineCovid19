package com.brycen.vn.controller.D;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brycen.vn.config.SecurityUtils;
import com.brycen.vn.dto.D.CustomerDTO;
import com.brycen.vn.dto.D.UserResponse;
import com.brycen.vn.dto.D.User_CustomerDTO;
import com.brycen.vn.service.iml.D.CustomerServiceImpl;
import com.brycen.vn.service.iml.D.UserService;


@RestController
@RequestMapping("/congthongtin")
@CrossOrigin("http://localhost:3000")
public class CustomerController {
	@Autowired
	private CustomerServiceImpl customerServiceImpl;

	@Autowired
	private UserService userService;

	@PreAuthorize("hasRole('ROLE_USER')")
	@GetMapping("/customer")
	public ResponseEntity<Object> getCustomerById(@PathVariable Long id) {
		CustomerDTO customerDTO = customerServiceImpl.getCustomerById(id);
		if (customerDTO != null) {
			return new ResponseEntity<Object>(customerDTO, HttpStatus.OK);
		}
		return new ResponseEntity<Object>("Not Found customer", HttpStatus.NO_CONTENT);
	}

	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody User_CustomerDTO usCustomerDTO) {
		if (customerServiceImpl.getCustomerByIdentification(usCustomerDTO.getIdentification())) {
			return new ResponseEntity<String>("Identification Existed! ", HttpStatus.BAD_REQUEST);
		} else if (userService.findByName(usCustomerDTO.getUsername())) {
			return new ResponseEntity<String>("username Existed! ", HttpStatus.BAD_REQUEST);
		} else {
			if (customerServiceImpl.save(usCustomerDTO)) {
				return new ResponseEntity<String>("Created!", HttpStatus.CREATED);
			} else {
				return new ResponseEntity<String>("User Existed!", HttpStatus.BAD_REQUEST);
			}
		}

	}
	@PreAuthorize("hasRole('ROLE_USER')")
	@PutMapping("/update")
	public ResponseEntity<String> updateProfile(@RequestBody User_CustomerDTO usCustomerDTO) {
		UserResponse userResponse = userService.findUser(SecurityUtils.getUserName());
		System.out.println("id" + userResponse.getCustomerDTO().getId());
		usCustomerDTO.setId(userResponse.getCustomerDTO().getId());

		if (customerServiceImpl.save(usCustomerDTO)) {
			return new ResponseEntity<String>("update!", HttpStatus.CREATED);
		} else {
			return new ResponseEntity<String>("update Existed!", HttpStatus.BAD_REQUEST);
		}

	}

}