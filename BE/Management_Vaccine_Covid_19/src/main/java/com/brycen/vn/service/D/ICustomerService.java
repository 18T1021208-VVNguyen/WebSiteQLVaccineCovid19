package com.brycen.vn.service.D;

import com.brycen.vn.dto.D.CustomerDTO;
import com.brycen.vn.dto.D.User_CustomerDTO;

public interface ICustomerService {

CustomerDTO getCustomerById(Long id);
	
	boolean save(User_CustomerDTO user_CustomerDTO);
	
	boolean getCustomerByIdentification(String identification);
}
