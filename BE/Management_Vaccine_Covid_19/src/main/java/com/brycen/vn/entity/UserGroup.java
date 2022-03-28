package com.brycen.vn.entity;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
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
@Table(name = "user_group")
public class UserGroup extends Base {

	@Column(name = "administrator", columnDefinition = "bigint NOT NULL")
	private Long administrator;

	@Column(name = "name", columnDefinition = "varchar(50) NOT NULL")
	private String name;

	@ManyToMany(mappedBy = "userGroup")
	private List<User> getUsers = new ArrayList<User>();

	public UserGroup(Long administrator, String name) {
		super();
		this.administrator = administrator;
		this.name = name;
	}
	
	
	

}