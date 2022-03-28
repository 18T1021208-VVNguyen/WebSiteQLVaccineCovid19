package com.brycen.vn.service.iml.M;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.brycen.vn.dto.M.CategoryVaccineDTO;
import com.brycen.vn.entity.CategoryVaccine;
import com.brycen.vn.entity.Vaccine;
import com.brycen.vn.repositories.VaccineRepository;
import com.brycen.vn.repositories.M.CategoryVaccineRepository;
import com.brycen.vn.service.M.ICategoryVaccineService;

@Service
public class CategoryVaccineServiceImpl implements ICategoryVaccineService{


	@Autowired
	private CategoryVaccineRepository categoryVaccineRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private VaccineRepository vaccineRepository;
	
	@Override
	public ResponseEntity<Map<String, Object>> gellAll(int page,int size) {
		try {
			
			List<CategoryVaccine> listCategoryVaccine = new ArrayList<CategoryVaccine>();
			Pageable pageable = PageRequest.of(page, size);
			Page<CategoryVaccine> pageTuts = categoryVaccineRepository.findAll( pageable);
			listCategoryVaccine = pageTuts.getContent();
			List<CategoryVaccineDTO> listDtos = listCategoryVaccine.stream().map(categoryVaccine -> modelMapper.map(categoryVaccine, CategoryVaccineDTO.class))
					.collect(Collectors.toList());

			Map<String, Object> response = new HashMap<>();
			response.put("_limit", size);
			response.put("_page", page);
			response.put("listCategoryVaccine", listDtos);
			response.put("currentPage", pageTuts.getNumber());
			response.put("totalItems", pageTuts.getTotalElements());
			response.put("totalPages", pageTuts.getTotalPages());
			

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@Override
	public CategoryVaccineDTO getCategoryVaccineById(Long id) {
		CategoryVaccine categoryVaccine = categoryVaccineRepository.findById(id).get();
		CategoryVaccineDTO categoryVaccineDto = modelMapper.map(categoryVaccine, CategoryVaccineDTO.class);
		return categoryVaccineDto;
	}



	@Override
	public boolean deleteCategoryVaccine(Long id) {
		if (id != null) {
			Optional<CategoryVaccine>  categoryVaccine= categoryVaccineRepository.findById(id);
			if(categoryVaccine.isPresent())
			{
				CategoryVaccine categoryVaccine1 = categoryVaccine.get();
				List<Vaccine> listvaccine = categoryVaccine1.getVaccines();
				for (Vaccine vaccine : listvaccine) {
					vaccineRepository.delete(vaccine);
				}
				categoryVaccineRepository.deleteById(id);
				return true;
			}
		}
		return false;
	}

	
	@Override
	public boolean findByCode(String code) {
		CategoryVaccine categoryVaccine = categoryVaccineRepository.getBycode(code);
		if(categoryVaccine!=null) {
			return true;
		}
		return false;
	}

	@Override
	public boolean findByName(String name) {
		CategoryVaccine categoryVaccine = categoryVaccineRepository.getByname(name);
		if(categoryVaccine!=null) {
			return true;
		}
		return false;
	}

	@Override
	public List<CategoryVaccineDTO> getDataAll() {
		List<CategoryVaccine> list =categoryVaccineRepository.findAll();
		
		if(list == null||list.isEmpty()) {
			return null;
		}
		List<CategoryVaccineDTO> listDto = list.stream().map(categoryVaccine -> modelMapper.map(categoryVaccine, CategoryVaccineDTO.class))
				.collect(Collectors.toList());
		
		return listDto;
	}

	@Override
	public CategoryVaccineDTO getById(Long id) {
		CategoryVaccine categoryVaccine = categoryVaccineRepository.findById(id).get();
		CategoryVaccineDTO categoryVaccineDto = modelMapper.map(categoryVaccine, CategoryVaccineDTO.class);
		return categoryVaccineDto; 
	}


	@Override
	public boolean save(CategoryVaccineDTO categoryVaccineDTO) {
		CategoryVaccine categoryVaccine;
		if(categoryVaccineDTO.getId() != null) {
			categoryVaccine = categoryVaccineRepository.findById(categoryVaccineDTO.getId()).get();
			categoryVaccine = modelMapper.map(categoryVaccineDTO, CategoryVaccine.class);
		}else {
			categoryVaccine = modelMapper.map(categoryVaccineDTO, CategoryVaccine.class);
		}
			categoryVaccine = categoryVaccineRepository.save(categoryVaccine);
			return true;
		}


}
