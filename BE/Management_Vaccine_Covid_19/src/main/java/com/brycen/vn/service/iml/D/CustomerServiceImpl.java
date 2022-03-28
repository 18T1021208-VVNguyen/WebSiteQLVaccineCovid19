package com.brycen.vn.service.iml.D;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.brycen.vn.dto.D.CustomerDTO;
import com.brycen.vn.dto.D.UserDTO;
import com.brycen.vn.dto.D.User_CustomerDTO;
import com.brycen.vn.entity.Customer;
import com.brycen.vn.entity.User;
import com.brycen.vn.entity.UserGroup;
import com.brycen.vn.repositories.CustomerRepository;
import com.brycen.vn.repositories.D.UserGroupRepository;
import com.brycen.vn.repositories.D.UserRepository;
import com.brycen.vn.service.D.ICustomerService;


@Service
public class CustomerServiceImpl implements ICustomerService {

	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private ModelMapper modelmapper;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Autowired
	private UserGroupRepository userGroupRepository;

	@Override
	public CustomerDTO getCustomerById(Long id) {
		Customer customer = customerRepository.findById(id).get();
		CustomerDTO customerDTO = modelmapper.map(customer, CustomerDTO.class);
		return customerDTO;
	}

	@Override
	public boolean save(User_CustomerDTO user_CustomerDTO) {
		if(user_CustomerDTO==null) {
			return false;
		}else {
			
			CustomerDTO customerdto = new CustomerDTO();
			CustomerDTO customerdto1 = new CustomerDTO();
			if (user_CustomerDTO.getId() == null) {
				Customer customer1 =  customerRepository.findByCustomer();
				if(customer1==null) {
					customer1 = new Customer();
					customerdto.setCode("KH1");
				}else {
					customerdto1 = modelmapper.map(customer1, CustomerDTO.class); // lấy thằng cuối cùng
					customerdto.setCode("KH" + (customerdto1.getId() + 1));
				}
				customerdto.setName(user_CustomerDTO.getName());
				customerdto.setBirthday(user_CustomerDTO.getBirthday());
				customerdto.setGender(user_CustomerDTO.getGender());
				customerdto.setPhoneNumber(user_CustomerDTO.getPhoneNumber());
				customerdto.setEmail(user_CustomerDTO.getEmail());
				customerdto.setIdentification(user_CustomerDTO.getIdentification());
				customerdto.setHealthInsuranceNumber(user_CustomerDTO.getHealthInsuranceNumber());
				customerdto.setOccupation(user_CustomerDTO.getOccupation());
				customerdto.setEthnic(user_CustomerDTO.getEthnic());
				customerdto.setAddress(user_CustomerDTO.getAddress());

				Customer customer = new Customer(); // set vaof customerdto
				customer.setCode(customerdto.getCode());
				customer.setName(customerdto.getName());
				customer.setBirthday(customerdto.getBirthday());
				customer.setGender(customerdto.getGender());
				customer.setPhoneNumber(customerdto.getPhoneNumber());
				customer.setEmail(customerdto.getEmail());
				customer.setIdentification(customerdto.getIdentification());
				customer.setHealthInsuranceNumber(customerdto.getHealthInsuranceNumber());
				customer.setOccupation(customerdto.getOccupation());
				customer.setEthnic(customerdto.getEthnic());
				customer.setAddress(customerdto.getAddress());

				UserDTO userdto = new UserDTO(); // set vaof userdto
				userdto.setUsername(user_CustomerDTO.getUsername());
				userdto.setPassword(bcryptEncoder.encode(user_CustomerDTO.getPassword()));

				User user = modelmapper.map(userdto, User.class);

				user.setCustomer(customer);

//				UserGroup userGroup1 = new UserGroup(1L, "ROLE_USER");
				
				
				List<UserGroup> listUserGroups = new ArrayList<UserGroup>();
				Optional<UserGroup> userGroup1 = userGroupRepository.findByName("ROLE_USER");
				if(!userGroup1.isPresent())
					listUserGroups.add(new UserGroup(1L, "ROLE_USER"));
				else
					listUserGroups.add(userGroup1.get());
				
				
				user.setUserGroup(listUserGroups); // hợp lí hơn thì để 1-n
				user = userRepository.save(user);

				return true;
			} else { 
				
				Customer customer3 = customerRepository.findById(user_CustomerDTO.getId()).get();
				customerdto = modelmapper.map(customer3, CustomerDTO.class);
				
				// update
			
				customerdto.setName(user_CustomerDTO.getName());
				customerdto.setBirthday(user_CustomerDTO.getBirthday());
				customerdto.setGender(user_CustomerDTO.getGender());
				customerdto.setPhoneNumber(user_CustomerDTO.getPhoneNumber());
				customerdto.setEmail(user_CustomerDTO.getEmail());
				customerdto.setIdentification(user_CustomerDTO.getIdentification());
				customerdto.setHealthInsuranceNumber(user_CustomerDTO.getHealthInsuranceNumber());
				customerdto.setOccupation(user_CustomerDTO.getOccupation());
				customerdto.setEthnic(user_CustomerDTO.getEthnic());
				customerdto.setAddress(user_CustomerDTO.getAddress());

			
				
				customer3.setName(customerdto.getName());
				customer3.setBirthday(customerdto.getBirthday());
				customer3.setGender(customerdto.getGender());
				customer3.setPhoneNumber(customerdto.getPhoneNumber());
				customer3.setEmail(customerdto.getEmail());
				customer3.setIdentification(customerdto.getIdentification());
				customer3.setHealthInsuranceNumber(customerdto.getHealthInsuranceNumber());
				customer3.setOccupation(customerdto.getOccupation());
				customer3.setEthnic(customerdto.getEthnic());
				customer3.setAddress(customerdto.getAddress());

				customerRepository.save(customer3);
				return true;
			}
		}
		
	}

	@Override
	public boolean getCustomerByIdentification(String identification) {
		Customer customer = customerRepository.findByIdentification(identification);
		if (customer != null) {
			return true;
		}
		return false;
	}

}