package com.brycen.vn.service.N;

import java.util.Date;
import java.util.Map;

import org.springframework.data.domain.Pageable;

import com.brycen.vn.payload.response.ResponseDataCreateCalendar;
import com.brycen.vn.payload.response.ResponseInjectCalendar;


public interface IInjectionCalendarService {
	Map<String, Object>  getAllInjectionCalendarUser(Date today , Pageable pageable);
	Map<String, Object>  getAllowByDistrict(Date today , String district ,Pageable pageable);
	Map<String, Object>  getAllowByDistrictAndWard(Date today , String district , String ward ,Pageable pageable);
	
	// Tỏng hợp 3 cái trên
	ResponseInjectCalendar getResponseInjectCalendar(Long customerid , String district, 
			String ward, Integer page);
	
	Map<String, Object> getAllAdmin( Integer page ,String sortBy);
	
	ResponseDataCreateCalendar getDataCreateCalendar(String District , String Ward);
	
	boolean createCalendarAdmin(String date, Long idAddress, Long idVaccine);
	
	
	boolean delateCalendarAdmin(Long id);
	

}
