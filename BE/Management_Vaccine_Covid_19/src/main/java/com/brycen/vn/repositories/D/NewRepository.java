package com.brycen.vn.repositories.D;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brycen.vn.entity.New;

@Repository
public interface NewRepository extends JpaRepository<New, Long>{
	
	Page<New> findByDeleted(boolean deleted, Pageable pageable);

}