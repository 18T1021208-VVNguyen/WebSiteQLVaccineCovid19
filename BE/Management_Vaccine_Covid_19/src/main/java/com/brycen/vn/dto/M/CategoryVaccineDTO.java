package com.brycen.vn.dto.M;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

public class CategoryVaccineDTO extends BaseDTO{
	private String code;
	private String name;
		
}
