package com.brycen.vn.service.iml.N;



import java.text.ParseException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.brycen.vn.convert.Convert;
import com.brycen.vn.dto.N.*;
import com.brycen.vn.entity.*;
import com.brycen.vn.repositories.CustomerRepository;
import com.brycen.vn.repositories.N.InjectionHistoryRepository;
import com.brycen.vn.service.N.IInjectionHistoryService;



@Service
public class InjectionHistoryServiceImpl implements IInjectionHistoryService {

	@Autowired
	private InjectionHistoryRepository injectionHistoryRepository;
	
	@Autowired CustomerRepository customerRepository;
	@Override
	public InjectionHistoryDTO getTop1SortInjectionDate(Long customerID) {
		
	InjectionHistory  e = injectionHistoryRepository.getTop1SortInjectionDate(customerID);
		if(e !=null)
			return Convert.HistoryEntityToDTO(e);
	return null;
	
	}
	@Override
	public List<InjectionHistoryDTO> getAllSortDate() {
		List<InjectionHistory> listEntity = injectionHistoryRepository
				.findAll(Sort.by(Sort.Direction.DESC, "injectionDate"));
		List<InjectionHistoryDTO> listDTO = listEntity.stream()
								.map(item -> Convert.HistoryEntityToDTO(item))
										.collect(Collectors.toList());
		if(listDTO == null || listDTO.isEmpty()) 
			return null;
		
		return listDTO;
	}
	@Override
	public InjectionHistoryDTO createInjectHistory(InjectionHistoryDTO historyDTO , Long customerId) {
		Optional<Customer> customer = customerRepository.findById(customerId);
		if(customer.isPresent())
		{
				try {
					InjectionHistory entity = Convert.HistoryDTOToEntity(historyDTO, customer.get());
					InjectionHistory entityHasID =injectionHistoryRepository.save(entity);
					return Convert.HistoryEntityToDTO(entityHasID);
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}				
		}
		return null;
		
			
	}
	@Override
	public boolean deleteInjectHistory(Long historyID) {
		// TODO Auto-generated method stub
		Optional<InjectionHistory> entity = injectionHistoryRepository.findById(historyID);
		if(entity.isPresent()) {
			injectionHistoryRepository.delete(entity.get());
			return true;
		}
		return false;
	}

}
