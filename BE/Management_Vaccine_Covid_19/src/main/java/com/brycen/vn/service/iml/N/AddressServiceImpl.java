package com.brycen.vn.service.iml.N;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brycen.vn.convert.Convert;
import com.brycen.vn.dto.N.DistrictDTO;
import com.brycen.vn.dto.N.InjectSiteDTO;
import com.brycen.vn.dto.N.WardDTO;
import com.brycen.vn.entity.Address;
import com.brycen.vn.repositories.N.AddressRepository;
import com.brycen.vn.service.N.IAddressService;
@Service
public class AddressServiceImpl implements IAddressService{

	@Autowired
	private AddressRepository addressRepository;
	
	@Override
	public List<DistrictDTO> getAllDistrict() {
		List<Address> listEntity = addressRepository.getAllDistric();
		List<DistrictDTO> listDTO = listEntity.stream()
							.map(item -> Convert.addressToDistrictDTO(item)).collect(Collectors.toList());
		Set<String> elements = new LinkedHashSet<>();
		listDTO.removeIf(item -> !elements.add(item.getDistrictName() ) );
		elements.clear();
		if(listDTO ==null || listDTO.isEmpty()) return null;
		return listDTO;
	}
	@Override
	public List<WardDTO> getWardWhereDistric(String district) {
		List<Address> listEntity = addressRepository.getWardWhereDistric(district);
		List<WardDTO> listDTO  = listEntity.stream().map(item -> Convert.addressToWardtDTO(item) ).collect(Collectors.toList());
		if(listDTO ==null || listDTO.isEmpty()) return null;
		return listDTO;
	}
	@Override
	public InjectSiteDTO getInjectSiteDTOByWard(String district , String ward) {
		Optional<Address> entity =  addressRepository.findInjectionSite(district, ward);
		if(entity.isPresent()) {
			return Convert.siteEntityToDTO(entity.get());
		}
		return null;
	}

	
	
	

}
