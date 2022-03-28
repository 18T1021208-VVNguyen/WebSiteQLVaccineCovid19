package com.brycen.vn.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.brycen.vn.entity.*;

public interface InjectionRegistrationRepository extends JpaRepository <InjectionRegistration ,Long>{
	
	@Query(nativeQuery = true, value ="select * from injection_registration  IR "
			+ "join injection_calendar  IC on IR.injection_calendar_id = IC.id"
			+ " where  IR.customer_id = ?1 and  DATEDIFF( IC.injection_date ,?2 ) > 0")
	List<InjectionRegistration> getRegistrationUnexpiredGreater( Long customerId , Date today);
	
	@Query(nativeQuery = true, value ="select * from injection_registration  IR "
			+ "join injection_calendar  IC on IR.injection_calendar_id = IC.id"
			+ " where  IR.customer_id = ?1 and  DATEDIFF( IC.injection_date ,?2 ) = 0")
	List<InjectionRegistration> getRegistrationUnexpiredEqual( Long customerId , Date today);
	
	@Query(nativeQuery = true, value ="select * from injection_registration  IR "
			+ "join injection_calendar  IC on IR.injection_calendar_id = IC.id"
			+ " where  IR.customer_id = ?1 and  DATEDIFF( IC.injection_date ,?2 ) >= 0")
	List<InjectionRegistration> getRegistrationUnexpired(Long customerId , Date today);
	
	@Query(nativeQuery = true, value ="select * from injection_registration  IR "
			+ "join injection_calendar  IC on IR.injection_calendar_id = IC.id"
			+ " where  IR.customer_id = ?1 and  DATEDIFF( IC.injection_date ,?2 ) < 0")
	List<InjectionRegistration> getRegistrationExpired(Long customerId , Date today);
	
	@Query(nativeQuery = true , value = "select * from injection_registration where customer_id = ?1")
	List<InjectionRegistration> findById_Customer(Long customerId);
	
	Page<InjectionRegistration> findByStatus(int status, Pageable pageable);
}
