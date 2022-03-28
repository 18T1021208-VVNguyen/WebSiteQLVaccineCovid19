package com.brycen.vn.service.D;


import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.brycen.vn.dto.D.*;


public interface INewService {
	

	ResponseEntity<Map<String, Object>> gellAll(int page , int size);
	
	NewDTO getNewsById(Long id);
	
	boolean save(NewDTO newDto);
	
	boolean deleteNew(Long id);

}