package  com.brycen.vn.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.brycen.vn.entity.Customer;



@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{

	@Query(value = "SELECT * FROM customer WHERE ID = (SELECT MAX(ID) FROM customer)",nativeQuery = true)
	Customer findByCustomer();
	
	Customer findByIdentification(String identification);
	
	@Query(value ="select * from customer C join users A on C.id = A.customer_id where A.id = ?1" , nativeQuery = true)
	Optional<Customer> findByIdUser(Long idUser);
}
