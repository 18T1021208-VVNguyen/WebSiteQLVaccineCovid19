package com.brycen.vn.dto.M;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BaseDTO {
	private Long id;
	private Boolean deleted;
	private Long createdUserId;
	private Date createdAt;
	private Long modifiedUserId;
	private Date modifiedAt;

	

 }
