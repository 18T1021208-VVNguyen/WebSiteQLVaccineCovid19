package com.brycen.vn.repositories.M;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brycen.vn.entity.CategoryVaccine;

@Repository
public interface CategoryVaccineRepository extends JpaRepository<CategoryVaccine, Long>{
	Page<CategoryVaccine> findByDeleted(boolean deleted, Pageable pageable);
	
	CategoryVaccine findByCode(String Code);
	
	
	CategoryVaccine getByname(String name);
	CategoryVaccine getBycode(String code);

}
