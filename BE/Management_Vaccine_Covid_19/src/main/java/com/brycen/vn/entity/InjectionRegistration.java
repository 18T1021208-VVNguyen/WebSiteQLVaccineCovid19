package com.brycen.vn.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "injection_registration")
public class InjectionRegistration extends Base {

	@Column(name = "status", columnDefinition = "INT NOT NULL")
	private int status;

	@Column(name = "number_injection", columnDefinition = "INT NOT NULL")
	private int numberInjection;

	@ManyToOne
	@JoinColumn(name = "customer_id")
	private Customer customer;

	@ManyToOne
	@JoinColumn(name = "injection_calendar_id")
	private InjectionCalendar injectionCalendar;
	
	

}
