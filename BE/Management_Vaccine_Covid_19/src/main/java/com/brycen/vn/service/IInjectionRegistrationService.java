package com.brycen.vn.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.brycen.vn.dto.N.*;
import com.brycen.vn.payload.response.*;

public interface IInjectionRegistrationService {
	
	boolean checkRegistrationUnexpiredGreater( Long idCurtomer);
	
	boolean checkRegistrationUnexpiredEqual(Long idCurtomer);
	
	List<InjectionRegistrationDTO> getListRegistrationUnexpired(Long idCurtomer);
	
	List<InjectionRegistrationDTO> getListRegistrationExpired(Long idCurtomer);
	
	long createInjectionRegistration(Long idCurtomer , Long idCalendar , Integer numInject);
	
	boolean checkRemoveRegistration(Long idRegistration);
	
	ResponseInjectRegistration getResponseInjectRegis(Long idCurtomer );
		
	// ***************************8
	ResponseEntity<Map<String, Object>> gellAll(int page,int size);
	
	ResponseEntity<Map<String, Object>> gellComfirm(int page,int size);
	
	ResponseEntity<Map<String, Object>> gellCancel(int page,int size);
	
	boolean confirm(Long id);
	
	boolean cancel(Long id);
	
	
	
	
}
