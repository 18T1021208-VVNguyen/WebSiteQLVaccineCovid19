package com.brycen.vn.controller.M;

import java.util.List;
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

import com.brycen.vn.dto.M.CategoryVaccineDTO;
import com.brycen.vn.service.iml.M.CategoryVaccineServiceImpl;

@RestController
@RequestMapping("/congthongtin")
@CrossOrigin("*")
public class CategoryVaccineController {

	@Autowired
	private CategoryVaccineServiceImpl categoryVaccineServiceImpl;
	
	// admin quan li loai vaccine // ok
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/admin/categoryvaccine")
	public ResponseEntity<Map<String, Object>> getAllCategoryVaccineAdmin(
			@RequestParam(value = "_page", defaultValue = "0") int page , 
			@RequestParam(value = "_limit", defaultValue = "5") int size
			) {
		return categoryVaccineServiceImpl.gellAll(page,size);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping(value="/admin/data")
	public ResponseEntity<List<CategoryVaccineDTO>> getData(){
		List<CategoryVaccineDTO> data = categoryVaccineServiceImpl.getDataAll();
		if(data == null || data.isEmpty()) {
			return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(data ,HttpStatus.OK);
	}
	
	// xem chi tiết nội dung
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(value = "/admin/categoryvaccine/{id}", method = RequestMethod.GET)
	public ResponseEntity<Object> getById(@PathVariable Long id) {
		CategoryVaccineDTO DTO = categoryVaccineServiceImpl.getById(id);
		if (DTO != null) {
			return new ResponseEntity<Object>(DTO, HttpStatus.OK);
		}
		return new ResponseEntity<Object>("Not Found New", HttpStatus.NO_CONTENT);
	}

	// admin thêm loai vaccine mới //( ok) 
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping(value = "/admin/categoryvaccine")
	public ResponseEntity<String> createCategoryVaccine(@RequestBody CategoryVaccineDTO categoryVaccine) {

		if (categoryVaccineServiceImpl.findByCode(categoryVaccine.getCode())) {
			return new ResponseEntity<String>("Code Existed! ", HttpStatus.BAD_REQUEST);
		} 
		else if (categoryVaccineServiceImpl.findByName(categoryVaccine.getName())) {
			return new ResponseEntity<String>("Name Existed! ", HttpStatus.BAD_REQUEST);
		} else {
			if (categoryVaccineServiceImpl.save(categoryVaccine)) {
				return new ResponseEntity<String>("Created!", HttpStatus.CREATED);
			} else {
				return new ResponseEntity<String>("Existed!", HttpStatus.BAD_REQUEST);
			}
		}
	}
	
	// admin sửa loai vaccine  (ok) 
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping(value = "/admin/categoryvaccine") 
	public ResponseEntity<String> updateCategoryVaccine(@RequestBody CategoryVaccineDTO categoryVaccine) {
		if (categoryVaccineServiceImpl.findByName(categoryVaccine.getName())) {
			return new ResponseEntity<String>("Name Existed! ", HttpStatus.BAD_REQUEST);
		} else {
			if (categoryVaccineServiceImpl.save(categoryVaccine)) {
				return new ResponseEntity<String>("Update!", HttpStatus.CREATED);
			} else {
				return new ResponseEntity<String>("ERROR!", HttpStatus.OK);
			}
		}
	
	}

	// admin xóa loai vacine (ok)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/admin/categoryvaccine/{id}")
	public ResponseEntity<String> deleteCategoryVaccine(@PathVariable Long id) {
		if (categoryVaccineServiceImpl.deleteCategoryVaccine(id)) {
			return new ResponseEntity<String>("Deleted!", HttpStatus.OK);
		}
		return new ResponseEntity<String>("ERROR!", HttpStatus.OK);
	}
}