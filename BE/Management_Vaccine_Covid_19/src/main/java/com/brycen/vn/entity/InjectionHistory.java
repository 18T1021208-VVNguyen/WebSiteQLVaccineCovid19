package com.brycen.vn.entity;

import java.util.Date;

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
@Table(name = "injection_history")
public class InjectionHistory extends Base {

	@Column(name = "injection_date", columnDefinition = "DATETIME NOT NULL")
	private Date injectionDate;

	@Column(name = "address", columnDefinition = "VARCHAR(255) NOT NULL")
	private String address;

	@Column(name = "number_injection", columnDefinition = "INT NOT NULL")
	private int numberInjection;

	@Column(name = "vaccineName", columnDefinition = "VARCHAR(255) NOT NULL")
	private String vaccineName;

	@ManyToOne
	@JoinColumn(name = "customer_id")
	private Customer customer;
	
	

}
