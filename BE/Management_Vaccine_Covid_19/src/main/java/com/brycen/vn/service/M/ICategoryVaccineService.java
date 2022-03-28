package com.brycen.vn.service.M;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.brycen.vn.dto.M.CategoryVaccineDTO;

public interface ICategoryVaccineService {

	

	ResponseEntity<Map<String, Object>> gellAll(int page, int size);
	
	List<CategoryVaccineDTO> getDataAll();
	
	CategoryVaccineDTO getCategoryVaccineById(Long id);
	
	boolean save(CategoryVaccineDTO categoryVaccineDTO);
	
	CategoryVaccineDTO getById(Long id);
	
	boolean deleteCategoryVaccine(Long id);
	
	boolean findByName(String name);
	boolean findByCode(String code);
	
}
