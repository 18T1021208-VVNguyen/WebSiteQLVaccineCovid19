package com.brycen.vn.payload.response;

import java.util.List;

import com.brycen.vn.dto.N.*;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDataCreateCalendar {
	private String nameDistrict;
	private String nameWard;
	private List<DistrictDTO> listDistrict;
	private List<WardDTO> listWard;
	private InjectSiteDTO injectSite;
	private List<FilterVaccineDTO>  listVaccine;
}
