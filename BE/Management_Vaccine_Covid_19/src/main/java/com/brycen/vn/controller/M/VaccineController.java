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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.brycen.vn.dto.M.VaccineDTO;
import com.brycen.vn.service.iml.M.VaccineServiceImpl;

@RestController
@RequestMapping("/congthongtin")
@CrossOrigin("*")
public class VaccineController {
	@Autowired
	private VaccineServiceImpl vaccineServiceImpl;
	
	// admin quan li loai vaccine (ok)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/admin/vaccine")
	public ResponseEntity<Map<String, Object>> getAllVaccineAdmin(
			@RequestParam(value = "_page", defaultValue = "0") int page ,
			@RequestParam(value = "_limit", defaultValue = "5") int size 
			) {
		return vaccineServiceImpl.gellAll(page,size);
	}
	
	// xem chi tiết nội dung
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(value = "/admin/vaccine/{id}", method = RequestMethod.GET)
	public ResponseEntity<Object> getById(@PathVariable Long id) {
		VaccineDTO DTO = vaccineServiceImpl.getVaccineById(id);
		if (DTO != null) {
			return new ResponseEntity<Object>(DTO, HttpStatus.OK);
		}
		return new ResponseEntity<Object>("Not Found New", HttpStatus.NO_CONTENT);
	}
	//admin thêm vaccnie (ok)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping(value = "/admin/vaccine") 
	public ResponseEntity<String> createVaccine(@RequestBody VaccineDTO vaccineDTO) {
		if (vaccineServiceImpl.findByCode(vaccineDTO.getCode())) {
			return new ResponseEntity<String>("Code Existed! ", HttpStatus.BAD_REQUEST);
		}
		else if (vaccineServiceImpl.findByName(vaccineDTO.getName())) {
			return new ResponseEntity<String>("Name Existed! ", HttpStatus.BAD_REQUEST);
		}else{
			if(vaccineServiceImpl.createVaccine(vaccineDTO)!=null) {
				return new ResponseEntity<String>("Created!", HttpStatus.CREATED);
			} else {
				return new ResponseEntity<String>("Code Existed!", HttpStatus.OK);
			}	
		}
	}
	//admin sửa vaccine ( chu test ki )
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping(value = "/admin/vaccine")
	public ResponseEntity<String> updateVaccine(@RequestBody VaccineDTO vaccineDTO) {	
			if(vaccineServiceImpl.updateVaccine(vaccineDTO) !=null) {
				return new ResponseEntity<String>("Update!",HttpStatus.CREATED);
			} else {
			return new ResponseEntity<String>("ERROR!",HttpStatus.OK);
			}
		
	}
	
	// admin xóa  vacine
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/admin/vaccine/{id}")
	public ResponseEntity<String> deleteVaccine(@PathVariable Long id) {
		if (vaccineServiceImpl.deleteVaccine(id)) {
			return new ResponseEntity<String>("Deleted!", HttpStatus.OK);
		}
		return new ResponseEntity<String>("ERROR!", HttpStatus.BAD_REQUEST);
	}
}
