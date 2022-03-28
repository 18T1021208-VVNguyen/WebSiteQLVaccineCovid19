package com.brycen.vn.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "category_vaccine")
public class CategoryVaccine extends Base {

	@Column(name = "code", columnDefinition = "VARCHAR(255) NOT NULL", unique = true)
	private String code;

	@Column(name = "name", columnDefinition = "VARCHAR(255) NOT NULL")
	private String name;

	@OneToMany(mappedBy = "categoryVaccine")
	private List<Vaccine> vaccines;
	
	


}
