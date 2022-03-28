package com.brycen.vn.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "news")
public class New extends Base{

	@Column(name = "title", columnDefinition = "TEXT NOT NULL")
	private String title;

	@Column(name = "content", columnDefinition = "TEXT NOT NULL")
	private String content;

	@Column(name = "description", columnDefinition = "TEXT NOT NULL")
	private String description;

}
