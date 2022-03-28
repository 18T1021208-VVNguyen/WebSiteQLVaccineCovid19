package com.brycen.vn.controller.N;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.brycen.vn.constant.CoreConstant;
import com.brycen.vn.payload.response.ResponseInjectRegistration;
import com.brycen.vn.service.iml.InjectionRegistrationServiceImpl;



@RestController
@RequestMapping("/congthongtin")
@CrossOrigin("*")
public class InjectionRegistrationController {
	@Autowired
	private InjectionRegistrationServiceImpl  injectionRegistrationServiceImpl;
	
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	@GetMapping("/registerinjection/{id}")
	public ResponseEntity<ResponseInjectRegistration> getRegisterInjection(
			@PathVariable("id") Long idCustomer){
			
		ResponseInjectRegistration response = injectionRegistrationServiceImpl.getResponseInjectRegis(idCustomer);
		return new ResponseEntity<>(response,HttpStatus.OK);
		
	}
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	@PostMapping("/registerinjection")
	public ResponseEntity<String> createRegisterInjection(
			@RequestParam(name = "customerid" ) Long customerId ,
			@RequestParam(name = "calendarid" ) Long  calendarId ,
			@RequestParam(name = "numinjec" ) Integer numInjec
			) throws ParseException{
		
			if(injectionRegistrationServiceImpl.checkRegistrationUnexpiredGreater( customerId)  || 
					 injectionRegistrationServiceImpl.checkRegistrationUnexpiredEqual( customerId) )
				 	return new ResponseEntity<>(CoreConstant.UNEXPIRED,HttpStatus.NOT_FOUND);
			
			long numDay = injectionRegistrationServiceImpl.createInjectionRegistration(customerId, calendarId, numInjec);
			if(  numDay>= CoreConstant.DISTANCE_DATE)
				return new ResponseEntity<>(numDay +" "+ CoreConstant.SUCCESS,HttpStatus.OK);
			
			return new ResponseEntity<>(numDay +" "+CoreConstant.FAIL,HttpStatus.NOT_FOUND);
	}
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	@DeleteMapping("/registerinjection/{id}")
	public ResponseEntity<String> deleteRegisterInjection(
			@PathVariable("id") Long registerId   ){
		
		boolean result = injectionRegistrationServiceImpl.checkRemoveRegistration(registerId);
		
		if(result)
		{
			return new ResponseEntity<>(CoreConstant.SUCCESS,HttpStatus.OK);	
		}
		
		return new ResponseEntity<>(CoreConstant.FAIL,HttpStatus.NOT_FOUND);
	}
	
}
//customerid=2&today=20/12/2000
//if(district == null && ward== null)
//{
//	 //lấy lịch sử tiêm gần nhất (done) 
//	  // list all lịch có thể đăng kí (where today ) (done)
//	 // list mui tiem 8 mui (done) 
//	 // list all district (done) 
//	 // list ward = null (done) 
//	 //  .
//	 //
//}
//else if(district!=null && ward !=null )
//{
//	
//	// list all lịch có thể đăng kí (where today , district ,ward  ) (done)
//	 // list  ward (where district) (done)
//	 
//}
//else if(district!=null &&ward ==null){
//	// list all lịch có thể đăng kí (where today , district ) (done) 
//	 // list  ward ( where district ) (done)
//}
//
