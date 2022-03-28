package com.brycen.vn.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
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
@Table(name = "customer")
public class Customer extends Base{
	


	@Column(name = "code", columnDefinition = "VARCHAR(255) NOT NULL", unique = true)
	private String code;

	@Column(name = "name", columnDefinition = "VARCHAR(255) NOT NULL")
	private String name;

	@Column(name = "birthday", columnDefinition = "DATETIME NOT NULL")
	private String birthday;

	@Column(name = "gender", columnDefinition = "BIT NOT NULL")
	private Long gender;

	@Column(name = "phone_number", columnDefinition = "VARCHAR(255) NOT NULL")
	private String phoneNumber;

	@Column(name = "email", columnDefinition = "VARCHAR(255) NOT NULL")
	private String email;

	@Column(name = "identification", columnDefinition = "VARCHAR(255) NOT NULL")
	private String identification;

	@Column(name = "health_insurance_number", columnDefinition = "VARCHAR(255) NOT NULL")
	private String healthInsuranceNumber;

	@Column(name = "occupation", columnDefinition = "VARCHAR(255) NOT NULL")
	private String occupation;

	@Column(name = "ethnic", columnDefinition = "VARCHAR(255) NOT NULL")
	private String ethnic;

	@Column(name = "address", columnDefinition = "VARCHAR(255) NOT NULL")
	private String address;
	
	@OneToOne(mappedBy = "customer")
	private User user;

	@OneToMany(mappedBy = "customer")
	private List<InjectionHistory> injectionHistory;

	@OneToMany(mappedBy = "customer")
	private List<InjectionRegistration> injectionRegistrations;
	
	

}