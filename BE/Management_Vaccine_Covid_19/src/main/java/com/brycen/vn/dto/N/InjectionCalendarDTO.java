package com.brycen.vn.dto.N;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InjectionCalendarDTO {
	private Long id;
	private String district ;
	private String ward;
	private String injectionSite;
	private String injectionDate;
	private String vaccineName;
}
