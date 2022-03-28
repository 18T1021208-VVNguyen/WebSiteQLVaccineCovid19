package com.brycen.vn.service.N;

import java.util.List;

import com.brycen.vn.dto.N.*;

public interface IInjectionHistoryService {
	InjectionHistoryDTO getTop1SortInjectionDate(Long customerID);
	
	List<InjectionHistoryDTO> getAllSortDate();
	
	InjectionHistoryDTO createInjectHistory(InjectionHistoryDTO historyDTO , Long customerId); 
	
	boolean deleteInjectHistory(Long historyID);
		
	
}
