package com.brycen.vn.controller.N;

import java.text.ParseException;
import java.util.Map;

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
import com.brycen.vn.payload.response.ResponseDataCreateCalendar;
import com.brycen.vn.payload.response.ResponseInjectCalendar;
import com.brycen.vn.service.iml.InjectionRegistrationServiceImpl;
import com.brycen.vn.service.iml.N.InjectionCalendarServiceImpl;


@RestController
@RequestMapping("/congthongtin")
@CrossOrigin("*")
public class InjectionCalendarController {

	@Autowired
	private InjectionRegistrationServiceImpl  injectionRegistrationServiceImpl;
	@Autowired 
	private InjectionCalendarServiceImpl  injectionCalendarServiceImpl ;
	

	@GetMapping("/calendar")
	public ResponseEntity<?> getCalendarInjection(
			@RequestParam(name = "customerid" ,required = false ) Long ID ,
			@RequestParam(name = "district", required = false) String district,
			@RequestParam(name = "ward" ,required = false) String ward ,
			@RequestParam(name = "page" ,required = false) Integer page 
			) throws ParseException{
		 
		 System.out.println("district: " +district );
		 System.out.println("ward: " +ward );
		 
		 if(ID==null) {
			 ResponseInjectCalendar reponsy = injectionCalendarServiceImpl
					 .getResponseInjectCalendar(ID,  district, ward, page);
			 
			return new ResponseEntity<>(reponsy,HttpStatus.OK);
		 }
		 else
		 {
				 if(injectionRegistrationServiceImpl.checkRegistrationUnexpiredGreater( ID)  || 
						 injectionRegistrationServiceImpl.checkRegistrationUnexpiredEqual( ID) )
				 {
					 	return new ResponseEntity<>(CoreConstant.FAIL,HttpStatus.NOT_FOUND);
					 	
				 }
				 
				 ResponseInjectCalendar reponsy = injectionCalendarServiceImpl
						 .getResponseInjectCalendar(ID,  district, ward, page);
				 
				return new ResponseEntity<>(reponsy,HttpStatus.OK);
		 }
					
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/admin/calendar/{page}")
	public ResponseEntity<Map<String, Object>> getCalendarInjection(
			@PathVariable("page") Integer page){
		
		  Map<String, Object> listResult= injectionCalendarServiceImpl.getAllAdmin(page, CoreConstant.CALENDAR_SORT_BY_DATE);
		  return new ResponseEntity<>(listResult,HttpStatus.OK);
		
		
	}
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/admin/data/create")
	public ResponseEntity<ResponseDataCreateCalendar> getDateCreate(
			@RequestParam(name = "district", required = false) String district,
			@RequestParam(name = "ward" ,required = false) String ward ){
				
		ResponseDataCreateCalendar  response= injectionCalendarServiceImpl.getDataCreateCalendar(district, ward);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	

	@PostMapping("/admin/calendar")
	@PreAuthorize("hasRole('ROLE_ADMIN')") 
	public ResponseEntity<String> createCalendarInjection(
			@RequestParam(name="dateInject") String  dateInject ,
			@RequestParam(name="idAddress")  Long idAddress,
			@RequestParam(name="idVaccine")  Long idVaccine ){
				boolean result = injectionCalendarServiceImpl.createCalendarAdmin(dateInject, idAddress, idVaccine);
			if(result) return new ResponseEntity<>(CoreConstant.SUCCESS,HttpStatus.OK);
			return new ResponseEntity<>(CoreConstant.FAIL,HttpStatus.NOT_FOUND);
		
	}
	@PreAuthorize("hasRole('ROLE_ADMIN')") 
	@DeleteMapping("/admin/calendar/{id}")
	public ResponseEntity<String> deleteCalendarInjection(
			@PathVariable("id") Long id){
				boolean result  = injectionCalendarServiceImpl.delateCalendarAdmin(id);
				if(result) return new ResponseEntity<>(CoreConstant.SUCCESS,HttpStatus.OK);
				return new ResponseEntity<>(CoreConstant.FAIL,HttpStatus.NOT_FOUND);
		
	}
}
