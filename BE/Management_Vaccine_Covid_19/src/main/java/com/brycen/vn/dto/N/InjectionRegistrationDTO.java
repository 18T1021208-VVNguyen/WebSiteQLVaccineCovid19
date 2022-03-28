package com.brycen.vn.dto.N;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InjectionRegistrationDTO {

	private Long id;
	private Integer numberInjection;
	private String injectionSite;
	private String injectionDate;
	private String vaccineName;
	private Integer status;
}
