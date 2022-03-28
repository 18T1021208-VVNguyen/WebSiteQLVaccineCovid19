package com.brycen.vn.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.brycen.vn.dto.M.VaccineDTO;
import com.brycen.vn.dto.N.FilterVaccineDTO;

public interface IVaccineService {
	ResponseEntity<Map<String, Object>> gellAll(int page ,int size);
	
VaccineDTO getVaccineById(Long id);
	
	
	VaccineDTO createVaccine(VaccineDTO vaccineDTO);
	
	VaccineDTO updateVaccine(VaccineDTO vaccineDTO);

	
	boolean deleteVaccine(Long id);
	boolean findByCode(String code);
	boolean findByName(String name);
	
	List<FilterVaccineDTO> getFilterALL();
}
