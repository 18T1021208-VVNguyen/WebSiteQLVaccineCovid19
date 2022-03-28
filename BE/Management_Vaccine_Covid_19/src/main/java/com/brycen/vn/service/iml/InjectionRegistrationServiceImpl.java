package com.brycen.vn.service.iml;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.brycen.vn.dto.M.*;
import com.brycen.vn.dto.N.*;
import com.brycen.vn.entity.*;
import com.brycen.vn.payload.response.ResponseInjectRegistration;
import com.brycen.vn.repositories.CustomerRepository;
import com.brycen.vn.repositories.InjectionRegistrationRepository;
import com.brycen.vn.repositories.N.*;
import com.brycen.vn.service.IInjectionRegistrationService;
import com.brycen.vn.constant.CoreConstant;
import com.brycen.vn.constant.Utils;
import com.brycen.vn.convert.*;


@Service
public class InjectionRegistrationServiceImpl implements IInjectionRegistrationService {
	
	@Autowired
	private InjectionRegistrationRepository injectionRegistrationRepository;
	
	@Autowired
	private InjectionCalendarRepository injectionCalendarRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private InjectionHistoryRepository injectionHistoryRepository;
	
	@Override
	public boolean checkRegistrationUnexpiredGreater(Long idCurtomer) {
		Optional<Customer>	OCustomer= customerRepository.findById(idCurtomer);
		if(OCustomer.isPresent())
		{
			 Date today = Utils.getToday();
			List<InjectionRegistration> list =	injectionRegistrationRepository.getRegistrationUnexpiredGreater(idCurtomer,today );
			if(list.isEmpty() || list==null)
				return false;
		}
		return true;
	}

	@Override
	public boolean checkRegistrationUnexpiredEqual( Long idCurtomer) {
//Nếu có khách hàng ở trong đăng kí > today ko cho hiển thị ra : có đăng kí --> true
		// Nếu ko có khành hàng trong bảng đăng kí -->  hoặc quán hạn -- false hiển thị ra . ; 
		Optional<Customer>	OCustomer= customerRepository.findById(idCurtomer);
		if(OCustomer.isPresent())
		{
			Date today = Utils.getToday();
			List<InjectionRegistration> list =	injectionRegistrationRepository.getRegistrationUnexpiredEqual(idCurtomer,today );
			if(list.isEmpty() || list==null)
				return false;
		}
		return true;
	}

	
	@Override
	public long createInjectionRegistration(Long idCurtomer, Long idCalendar, Integer numInject) {
		Optional<InjectionCalendar> injectionCalendar = injectionCalendarRepository.findById(idCalendar);
		Optional<Customer> customer = customerRepository.findById(idCurtomer);
		InjectionHistory  injectionHistory= injectionHistoryRepository.getTop1SortInjectionDate(idCurtomer);
		if(injectionCalendar.isPresent() && customer.isPresent())
		{
			InjectionRegistration newInjecRegistor = new InjectionRegistration();
			Date injectionDate = injectionCalendar.get().getInjectionDate();
			System.out.println("injectionDate : " +injectionDate);
			
			if(injectionHistory==null) {
				
				newInjecRegistor.setCustomer(customer.get());
				newInjecRegistor.setInjectionCalendar(injectionCalendar.get());
				newInjecRegistor.setStatus(0);
				newInjecRegistor.setNumberInjection(numInject);
				injectionRegistrationRepository.save(newInjecRegistor);
				return 30L;
			}
			Date historyDate = injectionHistory.getInjectionDate();

			System.out.println("injectionDate : " +historyDate);
			try {
				
				injectionDate = Utils.remove_HH_mm_ss(injectionDate);
				
				historyDate = Utils.remove_HH_mm_ss(historyDate);
				
				System.out.println("injectionDate : " +injectionDate);
				System.out.println("injectionDate : " +historyDate);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			long getDiff =  injectionDate.getTime() - historyDate.getTime()  ;
			long getDaysDiff = TimeUnit.MILLISECONDS.toDays(getDiff);
			System.out.println("Distance_date : "+getDaysDiff);
			 if ( getDaysDiff >= CoreConstant.DISTANCE_DATE)
			{

				
				newInjecRegistor.setCustomer(customer.get());
				newInjecRegistor.setInjectionCalendar(injectionCalendar.get());
				newInjecRegistor.setStatus(0);
				newInjecRegistor.setNumberInjection(numInject);
				injectionRegistrationRepository.save(newInjecRegistor);
			}
			return getDaysDiff;
			
				
		}
		return -1L;
	}

	@Override
	public List<InjectionRegistrationDTO> getListRegistrationUnexpired(Long idCurtomer) {
		Date today = Utils.getToday();
		List<InjectionRegistrationDTO> listDTO = injectionRegistrationRepository.getRegistrationUnexpired(idCurtomer, today)
												.stream().map(item -> Convert.registrationEntityToDTO(item))
												.collect(Collectors.toList());
		if(listDTO==null || listDTO.isEmpty()) return null;
		return listDTO;
		
	}

	@Override
	public List<InjectionRegistrationDTO> getListRegistrationExpired(Long idCurtomer) {
		Date today = Utils.getToday();
		List<InjectionRegistrationDTO> listDTO = injectionRegistrationRepository.getRegistrationExpired(idCurtomer, today)
												.stream().map(item -> Convert.registrationEntityToDTO(item))
												.collect(Collectors.toList());
		if(listDTO==null || listDTO.isEmpty()) return null;
		return listDTO;
		
	}

	@Override
	public ResponseInjectRegistration getResponseInjectRegis(Long idCurtomer) {
		List<InjectionRegistrationDTO> listDtoUnexpired = this.getListRegistrationUnexpired(idCurtomer);
		List<InjectionRegistrationDTO> listDtoExpired = this.getListRegistrationExpired(idCurtomer);
		return new ResponseInjectRegistration(listDtoUnexpired,listDtoExpired);
	}

	@Override
	public boolean checkRemoveRegistration(Long idRegistration) {
		Optional<InjectionRegistration> injectionRegistration = injectionRegistrationRepository.findById(idRegistration);
		if(injectionRegistration.isPresent()) {
			InjectionRegistration  registration = injectionRegistration.get();
			Date dateRegis =registration.getInjectionCalendar().getInjectionDate();
			Date today = Utils.getToday();
			try {
				dateRegis = Utils.remove_HH_mm_ss(dateRegis);
				today = Utils.remove_HH_mm_ss(today);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			System.out.println("date Regis "+ dateRegis);
			System.out.println("date Today "+today);
			System.out.println(dateRegis.after(today));
			if(dateRegis.after(today)) {
				injectionRegistrationRepository.deleteById(idRegistration);
				return true;
			}
		}
		return false;
	}
	
	
	//*********************************************

	
	@Autowired
	private ModelMapper modelMapper;
	

	public ResponseEntity<Map<String, Object>> gellAll(int page, int size) {
		try {
			List<InjectionRegistration> listinjectionRegistration = new ArrayList<InjectionRegistration>();
			Pageable pageable = PageRequest.of(page , size);
			Page<InjectionRegistration> pageTuts = injectionRegistrationRepository.findByStatus(0, pageable);
			listinjectionRegistration = pageTuts.getContent();
			List<ListInjectionRegistrationDTO> listDtos = listinjectionRegistration.stream().map(injectionRegistration -> modelMapper.map(injectionRegistration, ListInjectionRegistrationDTO.class))
					.collect(Collectors.toList());

			Map<String, Object> response = new HashMap<>();
			response.put("_limit", size);
			response.put("_page", page);
			response.put("listnews", listDtos);
			response.put("currentPage", pageTuts.getNumber());
			response.put("totalItems", pageTuts.getTotalElements());
			response.put("totalPages", pageTuts.getTotalPages());

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	public ResponseEntity<Map<String, Object>> gellComfirm(int page, int size) {
		try {
			List<InjectionRegistration> listinjectionRegistration = new ArrayList<InjectionRegistration>();
			Pageable pageable = PageRequest.of(page , size);
			Page<InjectionRegistration> pageTuts = injectionRegistrationRepository.findByStatus(1, pageable);
			listinjectionRegistration = pageTuts.getContent();
			List<ListInjectionRegistrationDTO> listDtos = listinjectionRegistration.stream().map(injectionRegistration -> modelMapper.map(injectionRegistration, ListInjectionRegistrationDTO.class))
					.collect(Collectors.toList());

			Map<String, Object> response = new HashMap<>();
			response.put("_limit", size);
			response.put("_page", page);
			response.put("listnews", listDtos);
			response.put("currentPage", pageTuts.getNumber());
			response.put("totalItems", pageTuts.getTotalElements());
			response.put("totalPages", pageTuts.getTotalPages());

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	public ResponseEntity<Map<String, Object>> gellCancel(int page, int size) {
		try {
	
			List<InjectionRegistration> listinjectionRegistration = new ArrayList<InjectionRegistration>();
			Pageable pageable = PageRequest.of(page , size);
			Page<InjectionRegistration> pageTuts = injectionRegistrationRepository.findByStatus(2, pageable);
			listinjectionRegistration = pageTuts.getContent();
			List<ListInjectionRegistrationDTO> listDtos = listinjectionRegistration.stream().map(injectionRegistration -> modelMapper.map(injectionRegistration, ListInjectionRegistrationDTO.class))
					.collect(Collectors.toList());

			Map<String, Object> response = new HashMap<>();
			response.put("_limit", size);
			response.put("_page", page);
			response.put("listnews", listDtos);
			response.put("currentPage", pageTuts.getNumber());
			response.put("totalItems", pageTuts.getTotalElements());
			response.put("totalPages", pageTuts.getTotalPages());

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	@Override
	public boolean confirm(Long id) {
		if (id != null) {
			InjectionRegistration injectionRegistration = injectionRegistrationRepository.findById(id).get();
			injectionRegistration.setStatus(1);
			injectionRegistrationRepository.save(injectionRegistration);
			return true;
		}
		return false;
	}
	@Override
	public boolean cancel(Long id) {
		if (id != null) {
			InjectionRegistration injectionRegistration = injectionRegistrationRepository.findById(id).get();
			injectionRegistration.setStatus(2);
			injectionRegistrationRepository.save(injectionRegistration);
			return true;
		}
		return false;
	}
	
}
