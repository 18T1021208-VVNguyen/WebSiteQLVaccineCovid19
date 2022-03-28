package com.brycen.vn.convert;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.brycen.vn.dto.M.CategoryVaccineDTO;
import com.brycen.vn.dto.M.VaccineDTO;
import com.brycen.vn.entity.*;

import com.brycen.vn.dto.N.*;

public class Convert {

		public static CategoryVaccine categoryVaccineDTOToEntity(CategoryVaccineDTO dto) {
			CategoryVaccine entity = new CategoryVaccine();
			entity.setCode(dto.getCode());
			entity.setName(dto.getName());
			 return entity;
			
		}
		public static Vaccine vaccineDTOToEntity(VaccineDTO dto , CategoryVaccine ca ) {
			Vaccine vaccine = new Vaccine();
			vaccine.setCode(dto.getCode());
			vaccine.setName(dto.getName());
			vaccine.setDescription(dto.getDescription());
			vaccine.setExprirationDate(dto.getExprirationDate());
			vaccine.setManufacturingDate(dto.getManufacturingDate());
			vaccine.setProducer(dto.getProducer());
			vaccine.setCategoryVaccine(ca);
			return vaccine;
		}
		
		public static InjectionCalendarDTO calendaEntityToDto(InjectionCalendar entity ) {
			InjectionCalendarDTO dto = new 	InjectionCalendarDTO();
			dto.setId(entity.getId());
			dto.setDistrict(entity.getAddress().getDistrict());
			dto.setWard(entity.getAddress().getWard());
			dto.setInjectionSite(entity.getAddress().getInjectionSite());
			dto.setInjectionDate(Convert.dateToString_HH_MM_DD_MM_YYYY(entity.getInjectionDate()));
			dto.setVaccineName(entity.getVaccine().getName());
			return dto;
		}
		
		
		
		public static Date stringToDate_DD_MM_YYYY (String dateText)  {
			SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
			try {
				return formatter.parse(dateText);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			}
		}
		public static String dateToString_DD_MM_YYYY(Date date)
		{
			DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");  
            String strDate = dateFormat.format(date);
            return strDate;
		}
		public static String dateToString_HH_MM_DD_MM_YYYY (Date date ) {
			  DateFormat dateFormat = new SimpleDateFormat("HH:mm dd-MM-yyyy");  
              String strDate = dateFormat.format(date);
              return strDate;
		}
		public static Date stringtoDate_HH_MM_DD_MM_YYYY(String dateText)  {
			DateFormat dateFormat = new SimpleDateFormat("HH:mm dd-MM-yyyy"); 
			try {
				return dateFormat.parse(dateText);
			} catch (ParseException e) {
				e.printStackTrace();
				// TODO Auto-generated catch block
				return null;
			}	
		}
		public static InjectSiteDTO siteEntityToDTO(Address entity) {
			InjectSiteDTO dto = new InjectSiteDTO();
			dto.setId(entity.getId());
			dto.setName(entity.getInjectionSite());
			return dto;
		}
		public static DistrictDTO addressToDistrictDTO( Address entity) {
			DistrictDTO dto = new DistrictDTO();
			dto.setId(entity.getId());
			dto.setDistrictName(entity.getDistrict());
			return dto;
		}
		public static WardDTO addressToWardtDTO( Address entity) {
			WardDTO dto = new WardDTO();
			dto.setId(entity.getId());
			dto.setWardName(entity.getWard());
			return dto;
		}
		
		public static FilterVaccineDTO vaccineEntityToDTO_Filter(Vaccine entity) {
			FilterVaccineDTO dto = new FilterVaccineDTO();
			dto.setId(entity.getId());
			dto.setNameVaccine(entity.getName());
			return dto;
		}
		
		public static InjectionHistoryDTO HistoryEntityToDTO(InjectionHistory entity) {
			InjectionHistoryDTO dto = new InjectionHistoryDTO();
			dto.setId(entity.getId());
			dto.setAddress(entity.getAddress());
			dto.setInjectionDate(Convert.dateToString_HH_MM_DD_MM_YYYY(entity.getInjectionDate()));
			dto.setNumberInjection(entity.getNumberInjection());
			dto.setVaccineName(entity.getVaccineName());
			return dto;
			
		}

		public static InjectionHistory HistoryDTOToEntity(InjectionHistoryDTO dto , Customer customer) throws ParseException {
			InjectionHistory entity = new InjectionHistory();
			entity.setAddress(dto.getAddress());
			entity.setCustomer(customer);
//			System.out.println("addres "+dto.getAddress());
//			System.out.println("Ngày : " + dto.getInjectionDate());
//			System.out.println("Mui tiem : "+dto.getNumberInjection());
			entity.setInjectionDate(Convert.stringtoDate_HH_MM_DD_MM_YYYY(dto.getInjectionDate()) );
			entity.setVaccineName(dto.getVaccineName());
			entity.setNumberInjection(dto.getNumberInjection());
	
			return entity;
			
		}
		
		public static InjectionRegistrationDTO registrationEntityToDTO(InjectionRegistration entity) {
			InjectionRegistrationDTO dto = new InjectionRegistrationDTO();
			dto.setId(entity.getId());
			
			dto.setNumberInjection(entity.getNumberInjection());
			
			Date dateJnject = entity.getInjectionCalendar().getInjectionDate();
			dto.setInjectionDate(Convert.dateToString_HH_MM_DD_MM_YYYY(dateJnject));
			
			dto.setInjectionSite(entity.getInjectionCalendar().getAddress().getInjectionSite());
			
			dto.setStatus(entity.getStatus());
			
			dto.setVaccineName(entity.getInjectionCalendar().getVaccine().getName());
			
			return dto;
		}
}
