package  com.brycen.vn.repositories.N;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.brycen.vn.entity.*;
public interface InjectionCalendarRepository  extends JpaRepository <InjectionCalendar ,Long> {

	@Query(nativeQuery = true, value="select * from injection_calendar  IC"
			+ " where DATEDIFF( IC.injection_date ,?1 ) > 0")
	Page<InjectionCalendar> getAllAllow(Date today,Pageable pageable);
	
	@Query(nativeQuery = true, value = "select * FROM injection_calendar  IC"
			+ " join address  A on IC.address_id = A.id"
			+ " where  DATEDIFF( IC.injection_date ,?1 ) > 0 and A.district = ?2")
	Page<InjectionCalendar> getAllowByDistrict(Date today,String _district , Pageable pageable);
	
	@Query(nativeQuery = true, value = "select * from injection_calendar as IC "
			+ " join address as A on IC.address_id = A.id"
			+ " where  DATEDIFF( IC.injection_date ,?1 ) > 0 and A.district = ?2 and A.ward = ?3")
	Page<InjectionCalendar> getAllowByDistrictAndWard(Date today,String district , String Ward,Pageable pageable  );
	
}
	
