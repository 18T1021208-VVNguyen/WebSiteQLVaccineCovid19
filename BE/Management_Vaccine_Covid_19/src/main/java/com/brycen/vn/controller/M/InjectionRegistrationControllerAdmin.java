package com.brycen.vn.controller.M;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.brycen.vn.service.iml.InjectionRegistrationServiceImpl;

@RestController
@RequestMapping("/congthongtin")
@CrossOrigin("*")
public class InjectionRegistrationControllerAdmin {
	@Autowired
	private InjectionRegistrationServiceImpl injectionRegistrationServiceImpl;
	
	// admin quan li loai vaccine
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/admin/injectionregistration")
	public ResponseEntity<Map<String, Object>> getAllInjectionRegistration(
			@RequestParam(value = "_page", defaultValue = "0") int page ,
			@RequestParam(value = "_limit", defaultValue = "5") int size 
			) {
		return injectionRegistrationServiceImpl.gellAll(page,size);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/admin/injectionregistration/comfirn")
	public ResponseEntity<Map<String, Object>> getAllInjectionRegistrationComfirm(
			@RequestParam(value = "_page", defaultValue = "0") int page ,
			@RequestParam(value = "_limit", defaultValue = "5") int size 
			) {
		return injectionRegistrationServiceImpl.gellComfirm(page,size);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/admin/injectionregistration/cancel")
	public ResponseEntity<Map<String, Object>> getAllInjectionRegistrationCancel(
			@RequestParam(value = "_page", defaultValue = "0") int page ,
			@RequestParam(value = "_limit", defaultValue = "5") int size 
			) {
		return injectionRegistrationServiceImpl.gellCancel(page,size);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/admin/injectionregistration/{id}")
	public ResponseEntity<String> confirmInjectionRegistration(@PathVariable("id") Long id) {
		if (injectionRegistrationServiceImpl.confirm(id)) {
			return new ResponseEntity<String>("Đã tiêm!", HttpStatus.CREATED);
		} else {
			return new ResponseEntity<String>("ERROR", HttpStatus.OK);
		}
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/admin/injectionregistration/{id}")
	public ResponseEntity<String> cancelInjectionRegistration(@PathVariable("id") Long id) {
		if (injectionRegistrationServiceImpl.cancel(id)) {
			return new ResponseEntity<String>("Huỷ tiêm!", HttpStatus.CREATED);
		} else {
			return new ResponseEntity<String>("ERROR", HttpStatus.BAD_REQUEST);
		}
	}
}
