package com.brycen.vn.repositories.D;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.brycen.vn.entity.UserGroup;

@Repository
public interface UserGroupRepository extends JpaRepository<UserGroup, Long>{
	
	
	@Query("select g from UserGroup g join g.getUsers u where u.username = ?1 ")
	List<UserGroup> findByNamee(String username);
	
	
	Optional<UserGroup> findByName(String name);

}