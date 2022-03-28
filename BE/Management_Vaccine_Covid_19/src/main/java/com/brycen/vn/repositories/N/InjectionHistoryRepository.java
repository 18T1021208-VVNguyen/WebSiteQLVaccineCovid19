package  com.brycen.vn.repositories.N;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.brycen.vn.entity.*;

public interface InjectionHistoryRepository  extends  JpaRepository<InjectionHistory, Long>{

	@Query(nativeQuery = true, value = " select * from injection_history "
			+ " where customer_id = ?1 "
			+ " order by injection_date "
			+ " DESC LIMIT 1")
	InjectionHistory getTop1SortInjectionDate(Long id);
}
