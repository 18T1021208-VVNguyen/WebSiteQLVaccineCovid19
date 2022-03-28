package com.brycen.vn.service.N;

import java.util.List;

import com.brycen.vn.dto.N.*;
public interface IAddressService {
	
	List<DistrictDTO> getAllDistrict();
	
	List<WardDTO> getWardWhereDistric(String district);
	
	InjectSiteDTO getInjectSiteDTOByWard(String district,String ward);
}
