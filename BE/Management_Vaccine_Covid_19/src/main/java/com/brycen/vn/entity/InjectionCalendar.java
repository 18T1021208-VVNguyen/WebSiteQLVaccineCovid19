package com.brycen.vn.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "injection_calendar")
public class InjectionCalendar extends Base {

	@Column(name = "injection_date", columnDefinition = "DATETIME NOT NULL")
	private Date injectionDate;

	@OneToMany(mappedBy = "injectionCalendar")
	private List<InjectionRegistration> injectionRegistrations;

	@ManyToOne
	@JoinColumn(name = "address_id")
	private Address address;

	@ManyToOne
	@JoinColumn(name = "vaccine_id")
	private Vaccine vaccine;
	
	
	

	
}
