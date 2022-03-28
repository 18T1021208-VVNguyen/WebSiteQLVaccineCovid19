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

import com.brycen.vn.convert.Convert;
import com.brycen.vn.dto.M.VaccineDTO;
import com.brycen.vn.entity.CategoryVaccine;
import com.brycen.vn.entity.InjectionCalendar;
import com.brycen.vn.entity.InjectionRegistration;
import com.brycen.vn.entity.Vaccine;
import com.brycen.vn.repositories.InjectionRegistrationRepository;
import com.brycen.vn.repositories.VaccineRepository;
import com.brycen.vn.repositories.M.CategoryVaccineRepository;
import com.brycen.vn.repositories.N.InjectionCalendarRepository;
import com.brycen.vn.service.IVaccineService;
import com.brycen.vn.dto.N.*;

@Service
public class VaccineServiceImpl implements IVaccineService{
	
	@Autowired
	private VaccineRepository vaccineRepository;
	
	
	@Autowired
	private CategoryVaccineRepository categoryVaccineRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private InjectionCalendarRepository injectionCalendarRepository;
	
	@Autowired
	private InjectionRegistrationRepository injectionRegistrationRepository;
	@Override // OK
	public ResponseEntity<Map<String, Object>> gellAll(int page ,int size) {
		try {
			
			
			List<Vaccine> listVaccine = new ArrayList<Vaccine>();
			
			Pageable pageable = PageRequest.of(page , size);
			
			Page<Vaccine> pageTuts = vaccineRepository.findAll(pageable);
			
			listVaccine = pageTuts.getContent();
			
			
			
			List<VaccineDTO> listDtos = listVaccine.stream().map(vaccine -> modelMapper.map(vaccine, VaccineDTO.class))
					.collect(Collectors.toList());

			Map<String, Object> response = new HashMap<>();
			response.put("_limit", size);
			response.put("_page", page);
			response.put("listVaccine", listDtos);
			response.put("currentPage", pageTuts.getNumber());
			response.put("totalItems", pageTuts.getTotalElements());
			response.put("totalPages", pageTuts.getTotalPages());

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	@Override // OK 
	public 	VaccineDTO createVaccine(VaccineDTO vaccineDTO) { 
		
		Optional<Vaccine>  Ovaccine = vaccineRepository.findByCode(vaccineDTO.getCode());
		if(Ovaccine.isPresent()) return null;
		Optional<CategoryVaccine> categoryVaccinex = categoryVaccineRepository.findById(vaccineDTO.getCategoryVaccineID());
		if(categoryVaccinex.isPresent()) {
			CategoryVaccine categoryVaccine ;
			categoryVaccine = categoryVaccinex.get();
			
			//if(categoryVaccine.getDeleted()== true ) return null;
			Vaccine  vaccine = Convert.vaccineDTOToEntity(vaccineDTO, categoryVaccine);
			vaccineRepository.save(vaccine);
			return vaccineDTO;
		}
		
		return null;
	}

	@Override // chua test
	public VaccineDTO updateVaccine(VaccineDTO vaccineDTO) {
		Optional<Vaccine> extsingvaccine = vaccineRepository.findById(vaccineDTO.getId());
		Vaccine vaccine = new Vaccine();	
		if(extsingvaccine.isPresent()) {
			vaccine.setId(vaccineDTO.getId());
			vaccine.setCode(vaccineDTO.getCode());
			vaccine.setName(vaccineDTO.getName());
			vaccine.setDescription(vaccineDTO.getDescription());
			vaccine.setExprirationDate(vaccineDTO.getExprirationDate());
			vaccine.setManufacturingDate(vaccineDTO.getManufacturingDate());
			vaccine.setProducer(vaccineDTO.getProducer());
			Optional<CategoryVaccine> listcategoryVaccine = categoryVaccineRepository.findById(vaccineDTO.getCategoryVaccineID()); //chứa giá trị null or null
			CategoryVaccine categoryVaccine = listcategoryVaccine.get();
			vaccine.setCategoryVaccine(categoryVaccine);
			vaccineRepository.save(vaccine);
			return vaccineDTO;
		}
		
		return null;
	}

	
	@Override
	public VaccineDTO getVaccineById(Long id) {
		Vaccine vaccine = vaccineRepository.findById(id).get();
		VaccineDTO vaccineDto = modelMapper.map(vaccine, VaccineDTO.class);
		return vaccineDto;
	}


	@Override // OK
	public boolean deleteVaccine(Long id) {
		if (id != null) {
			Optional<Vaccine> Ovaccine = vaccineRepository.findById(id);
			if(Ovaccine.isPresent())
			{
				Vaccine vaccine = Ovaccine.get();
				List<InjectionCalendar> listCalenda = vaccine.getInjectionCalendars();
				
				for (InjectionCalendar item : listCalenda) {
					
					List<InjectionRegistration> listRegistor = item.getInjectionRegistrations();
					for (InjectionRegistration injectionRe : listRegistor) {
						injectionRegistrationRepository.delete(injectionRe);	
					}
					injectionCalendarRepository.delete(item);				
				}
				vaccineRepository.delete(vaccine);
			return true;
			}
		}
		return false;
	}



	@Override
	public List<FilterVaccineDTO> getFilterALL() {
		List<Vaccine>  listEntity = vaccineRepository.findAll();
		List<FilterVaccineDTO> listDTO = listEntity.stream().map(item->Convert.vaccineEntityToDTO_Filter(item))
										.collect(Collectors.toList());
		if(listDTO ==null || listDTO.isEmpty())
			return null;
		return listDTO;
	}
	
	@Override
	public boolean findByCode(String code) {
		Vaccine vaccine = vaccineRepository.getBycode(code);
		if(vaccine!=null) {
			return true;
		}
		return false;
	}
	
	@Override
	public boolean findByName(String name) {
		Vaccine vaccine = vaccineRepository.getByname(name);
		if(vaccine!=null) {
			return true;
		}
		return false;
	}



}
