package com.brycen.vn.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brycen.vn.entity.Vaccine;
@Repository
public interface VaccineRepository extends JpaRepository<Vaccine, Long>{
	Page<Vaccine> findByDeleted(boolean deleted, Pageable pageable);
	Optional<Vaccine> findByCode(String code);
	Vaccine getBycode(String code);
	Vaccine getByname(String name);
}
