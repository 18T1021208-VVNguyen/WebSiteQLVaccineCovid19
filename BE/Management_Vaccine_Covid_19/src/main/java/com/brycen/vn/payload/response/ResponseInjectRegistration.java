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
public class ResponseInjectRegistration {

		private List<InjectionRegistrationDTO> listRegistrationUnexpired;
		private List<InjectionRegistrationDTO> listRegistrationExpired;
}
