package com.brycen.vn.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Base {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "deleted", columnDefinition = "BIT" )
	private Boolean deleted= Boolean.FALSE;

	@Column(name = "created_user_id", columnDefinition = "BIGINT")
	private Long createdUserId;

	@Column(name = "created_at", columnDefinition = "DATETIME")
	private Date createdAt;

	@Column(name = "modified_user_id", columnDefinition = "BIGINT")
	private Long modifiedUserId;

	@Column(name = "modified_at", columnDefinition = "DATETIME")
	private Date modifiedAt;
	
	
	




}
