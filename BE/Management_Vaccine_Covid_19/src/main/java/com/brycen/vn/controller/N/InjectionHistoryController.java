package com.brycen.vn.controller.N;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.brycen.vn.constant.CoreConstant;
import com.brycen.vn.dto.N.InjectionHistoryDTO;
import com.brycen.vn.service.iml.N.InjectionHistoryServiceImpl;



@RestController
@RequestMapping("/congthongtin")
@CrossOrigin("*")
public class InjectionHistoryController {
	@Autowired
	private InjectionHistoryServiceImpl injectionHistoryServiceImpl;
	
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	@GetMapping("/history")
	public ResponseEntity<List<InjectionHistoryDTO>> getInjectionHistory(){
		List<InjectionHistoryDTO> listDTO= injectionHistoryServiceImpl.getAllSortDate();
	
		if(listDTO==null ) return new ResponseEntity<>( new ArrayList<>(),HttpStatus.OK);
		return new ResponseEntity<>(listDTO,HttpStatus.OK);
	}
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")	
	@PostMapping("/history")
	public ResponseEntity<InjectionHistoryDTO> createInjectionHistory(
			@RequestParam (name = "customerid" ) Long customerID,
			@RequestBody InjectionHistoryDTO historyDTO){
			
		InjectionHistoryDTO dto = injectionHistoryServiceImpl
					.createInjectHistory(historyDTO, customerID);
		if(dto!=null)
			return new ResponseEntity<>(dto,HttpStatus.OK);
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		
	}
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	@DeleteMapping("/history/{id}")
	public ResponseEntity<String> delete(
			@PathVariable("id") Long idHistory){
				boolean result = injectionHistoryServiceImpl.deleteInjectHistory(idHistory);
				if(result) return new ResponseEntity<>(CoreConstant.SUCCESS,HttpStatus.OK);
				return new ResponseEntity<>(CoreConstant.FAIL,HttpStatus.NOT_FOUND);
		
	}
}
