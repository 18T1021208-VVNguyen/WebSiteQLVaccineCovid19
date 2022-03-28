package  com.brycen.vn.repositories.N;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.brycen.vn.entity.*;

public interface AddressRepository  extends  JpaRepository<Address, Long>{
	
	@Query(nativeQuery = true, value="select  * from address")
	List<Address> getAllDistric();
	
	@Query(nativeQuery = true, value="select * from address where district = ?1")
	List<Address> getWardWhereDistric(String district);
	
	@Query(nativeQuery = true, value = "select * from address where  district =  ?1 and ward =  ?2 ")
	Optional<Address> findInjectionSite(String distric, String ward);
}
